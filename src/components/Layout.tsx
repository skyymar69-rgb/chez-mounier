import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import Chatbot from "./Chatbot";
import AccessibilityToggle from "./AccessibilityToggle";
import ScrollToTop from "./ScrollToTop";
import ScrollProgressBar from "./ScrollProgressBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <CookieBanner />
      <AccessibilityToggle />
      <ScrollToTop />
      <Chatbot />
    </>
  );
}
