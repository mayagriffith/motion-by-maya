import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

export default function PageTransition({ children }) {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  return (
    <div
      className={clsx(
        "page-transition",
        visible && "page-transition--visible"
      )}
    >
      {children}
    </div>
  );
}
