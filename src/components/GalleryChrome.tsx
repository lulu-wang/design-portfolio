"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type GalleryChromeValue = {
  galleryPaper: boolean;
  setGalleryPaper: (paper: boolean) => void;
};

const GalleryChromeContext = createContext<GalleryChromeValue | null>(null);

export function GalleryChromeProvider({ children }: { children: React.ReactNode }) {
  const [galleryPaper, setGalleryPaperState] = useState(false);
  const setGalleryPaper = useCallback((paper: boolean) => {
    setGalleryPaperState(paper);
  }, []);
  const value = useMemo(
    () => ({ galleryPaper, setGalleryPaper }),
    [galleryPaper, setGalleryPaper],
  );

  return <GalleryChromeContext.Provider value={value}>{children}</GalleryChromeContext.Provider>;
}

export function useGalleryChrome() {
  const value = useContext(GalleryChromeContext);
  if (!value) {
    throw new Error("useGalleryChrome must be used within GalleryChromeProvider");
  }
  return value;
}
