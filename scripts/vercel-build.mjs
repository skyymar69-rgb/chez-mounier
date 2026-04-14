import { execSync } from "node:child_process";
import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Step 1: Run the Vite build (without Cloudflare)
console.log("Building with Vite...");
execSync("npx vite build", { stdio: "inherit" });

// Step 2: Create Vercel Build Output API v3 structure
const outDir = ".vercel/output";
mkdirSync(join(outDir, "static"), { recursive: true });
mkdirSync(join(outDir, "functions/ssr.func"), { recursive: true });

// Step 3: Copy static assets
cpSync("dist/client", join(outDir, "static"), { recursive: true });

// Step 4: Bundle the server into a single file using esbuild
console.log("Bundling server with esbuild...");
writeFileSync("dist/server/_entry.mjs", `
import server from "./server.js";
import { Readable } from "node:stream";

export default async function handler(req, res) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers["host"] || "localhost";
    const url = new URL(req.url || "/", protocol + "://" + host);

    const headers = new Headers();
    for (const [key, val] of Object.entries(req.headers)) {
      if (val != null) {
        if (Array.isArray(val)) {
          for (const v of val) headers.append(key, v);
        } else {
          headers.set(key, val);
        }
      }
    }

    let body = undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      body = Readable.toWeb(req);
    }

    const fetchRequest = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
      duplex: "half",
    });

    const response = await server.fetch(fetchRequest);

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (response.body) {
      const nodeStream = Readable.fromWeb(response.body);
      nodeStream.pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    console.error("SSR Error:", error.message, error.stack);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
`);

execSync(
  `npx esbuild dist/server/_entry.mjs --bundle --platform=node --format=cjs --outfile=.vercel/output/functions/ssr.func/index.js --external:"node:*" --conditions=node --target=node20 --log-level=warning`,
  { stdio: "inherit" }
);

// Step 5: Copy client manifest for SSR references
cpSync("dist/client", join(outDir, "functions/ssr.func/dist/client"), { recursive: true });

// Step 6: Write .vc-config.json for Node.js
writeFileSync(
  join(outDir, "functions/ssr.func/.vc-config.json"),
  JSON.stringify({
    runtime: "nodejs20.x",
    handler: "index.js",
    launcherType: "Nodejs",
    maxDuration: 15,
  })
);

// Step 7: Write routing config
writeFileSync(
  join(outDir, "config.json"),
  JSON.stringify({
    version: 3,
    routes: [
      {
        src: "/assets/(.*)",
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
        continue: true,
      },
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/ssr" },
    ],
  })
);

console.log("Vercel Build Output ready!");
