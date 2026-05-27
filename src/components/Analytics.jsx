import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "../lib/analytics.js";

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(
      `${location.pathname}${location.search}${location.hash}`,
      document.title
    );
  }, [location]);

  return null;
}
