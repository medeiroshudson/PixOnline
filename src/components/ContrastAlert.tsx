"use client";

import { useState, useEffect } from "react";

export default function ContrastAlert() {
  const [dismissed, setDismissed] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
    const isDismissed = localStorage.getItem("contrast-alert-dismissed") === "true";
    setDismissed(isDismissed);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("contrast-alert-dismissed", "true");
    setDismissed(true);
  };

  // Não renderiza nada durante SSR
  if (!hasMounted || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:max-w-md bg-yellow-50 dark:bg-yellow-900/80 text-yellow-800 dark:text-yellow-200 p-3 rounded-lg shadow-lg flex items-start gap-2 z-50 border border-yellow-200 dark:border-yellow-800">
      <div className="flex-shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="flex-1 text-sm">
        Encontrou problemas de legibilidade? Você pode alternar entre o tema claro e escuro clicando no botão no canto superior direito da página.
      </div>
      <button 
        onClick={handleDismiss}
        className="flex-shrink-0 ml-2 text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-100"
        aria-label="Fechar alerta"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}
