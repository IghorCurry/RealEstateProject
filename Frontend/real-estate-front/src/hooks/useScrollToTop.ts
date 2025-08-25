import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook that scrolls to top of page when route changes
 * Automatically scrolls to top when navigating between pages
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
};
