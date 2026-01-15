import { useEffect } from "react";

export function useMobileBack(onBack) {
  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault?.();
      onBack();
    };

    // Add one fake history entry
    window.history.pushState({ page: "app" }, "", window.location.href);

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onBack]);
}