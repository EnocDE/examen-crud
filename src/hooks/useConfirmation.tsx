import { useEffect, useState } from "react";

export default function useConfirmation() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const showConfirmationElement = () => setShowConfirmation(true);
  const hideConfirmationElement = () => setShowConfirmation(false);

  useEffect(() => {
    if (showConfirmation) {
      document.querySelector("html")?.setAttribute("style", "overflow: hidden");
    } else {
      document.querySelector("html")?.removeAttribute("style");
    }
  }, [showConfirmation]);

  return {
    showConfirmation,
    showConfirmationElement,
    hideConfirmationElement,
  };
}
