import { useEffect } from "react";
import { getEnv } from "../../utils/env";

export function EnvDebug() {
  useEffect(() => {
    console.log("=== ENV VARIABLES DEBUG ===");
    console.log("VITE_API_URL:", getEnv("VITE_API_URL"));
    console.log("VITE_API_TOKEN:", getEnv("VITE_API_TOKEN") ? "Exists (not showing for security)" : "Not defined");
    console.log("VITE_TELEGRAM_BOT_TOKEN:", getEnv("VITE_TELEGRAM_BOT_TOKEN") ? "Exists (not showing for security)" : "Not defined");
    console.log("VITE_TELEGRAM_CHAT_ID:", getEnv("VITE_TELEGRAM_CHAT_ID"));
    console.log("import.meta.env:", import.meta.env);
    console.log("window.env:", window.env);
    console.log("========================");
  }, []);

  return null;
} 