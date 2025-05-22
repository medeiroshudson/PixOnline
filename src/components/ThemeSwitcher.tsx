"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Evita renderização do componente durante a hidratação para prevenir diferenças de renderização
  useEffect(() => setMounted(true), []);

  // Verifica o tema atual e alterna para o oposto
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/80 hover:bg-white/90 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors shadow-md border border-gray-200 dark:border-gray-700"
      aria-label={resolvedTheme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}      title={resolvedTheme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
    >
      {resolvedTheme === "dark" ? (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2}
          stroke="currentColor" 
          className="w-6 h-6 text-yellow-400"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" 
          />
        </svg>
      ) : (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2}
          stroke="currentColor" 
          className="w-6 h-6 text-blue-700"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" 
          />
        </svg>
      )}
    </button>
  );
}
