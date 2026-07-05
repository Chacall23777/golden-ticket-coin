import { useEffect, useState } from "react";

export type Lang = "pt" | "en";
const KEY = "site-lang";

function read(): Lang {
  if (typeof window === "undefined") return "pt";
  const v = window.localStorage.getItem(KEY);
  return v === "en" || v === "pt" ? v : "pt";
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    setLangState(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && (e.newValue === "en" || e.newValue === "pt")) {
        setLangState(e.newValue);
      }
    };
    const onCustom = () => setLangState(read());
    window.addEventListener("storage", onStorage);
    window.addEventListener("site-lang-change", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("site-lang-change", onCustom);
    };
  }, []);

  const setLang = (l: Lang) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, l);
      window.dispatchEvent(new Event("site-lang-change"));
    }
    setLangState(l);
  };

  return [lang, setLang];
}
