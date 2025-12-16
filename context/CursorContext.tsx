"use client";
import React, { createContext, useContext, useState } from "react";

type CursorContextType = {
  cursorText: string;
  cursorVariant: "default" | "text" | "button";
  setCursor: (text: string, variant?: "text" | "button") => void;
  resetCursor: () => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "text" | "button">("default");

  const setCursor = (text: string, variant: "text" | "button" = "text") => {
    setCursorText(text);
    setCursorVariant(variant);
  };

  const resetCursor = () => {
    setCursorText("");
    setCursorVariant("default");
  };

  return (
    <CursorContext.Provider value={{ cursorText, cursorVariant, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) throw new Error("useCursor must be used within a CursorProvider");
  return context;
}