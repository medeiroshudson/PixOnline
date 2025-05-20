"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { Pix } from "@/types/pix";

interface PixContextType {
  pix: Pix | null;
  setPix: (pix: Pix) => void;
}

const PixContext = createContext<PixContextType | undefined>(undefined);

export function PixProvider({ children }: { children: ReactNode }) {
  const [pix, setPix] = useState<Pix | null>(null);
  return (
    <PixContext.Provider value={{ pix, setPix }}>
      {children}
    </PixContext.Provider>
  );
}

export function usePix() {
  const context = useContext(PixContext);
  if (!context) throw new Error("usePix must be used within a PixProvider");
  return context;
}
