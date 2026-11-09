import { useLocation } from "react-router-dom";

// Keying on the pathname remounts the wrapper on navigation, which replays
// the CSS fade-in without any state or effects.
export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
}
