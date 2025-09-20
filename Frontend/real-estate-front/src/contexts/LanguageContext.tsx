import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { translations } from "./translations";

export type Language = "en" | "uk";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const t = (key: string, params?: Record<string, string | number>): string => {
    let template =
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key;

    if (params && typeof template === "string") {
      for (const [paramKey, paramValue] of Object.entries(params)) {
        const pattern = new RegExp(`\\{${paramKey}\\}`, "g");
        template = template.replace(pattern, String(paramValue));
      }
    }

    return template;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
