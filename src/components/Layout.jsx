import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Analytics from "./Analytics.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import PageTransition from "./PageTransition.jsx";

export default function Layout() {
  return (
    <div className="min-h-dvh bg-[rgb(var(--mbm-bg))]">
      <ScrollToTop />
      <Analytics />
      <Navbar />
      <main className="min-h-[calc(100dvh-240px)]">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
