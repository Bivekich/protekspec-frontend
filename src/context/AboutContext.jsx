import { createContext, useContext, useState } from "react";

const AboutContext = createContext();

export function AboutProvider({ children }) {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <AboutContext.Provider
      value={{ aboutData, setAboutData, loading, setLoading, error, setError }}
    >
      {children}
    </AboutContext.Provider>
  );
}

export function useAbout() {
  return useContext(AboutContext);
}
