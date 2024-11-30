import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useData } from "../context/DataContext";

export function usePageTransition() {
  const location = useLocation();
  const { setIsPageLoading } = useData();

  useEffect(() => {
    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [location.pathname, setIsPageLoading]);
}
