import React, { useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import type { AppProps } from "next/app";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentTheme, setTheme] = useState("dark");

  useEffect(() => {
    // Load theme from localStorage on component mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  // Set the theme to dark if it doesn't exist in localStorage
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      handleThemeChange("dark");
    }
  }, []);

  return (
    <div
      className={
        currentTheme === "dark"
          ? "bg-zinc-800 text-white transition-all"
          : "transition-all"
      }
    >
      <ConfigProvider
        theme={{
          algorithm:
            currentTheme === "dark"
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
        }}
      >
        <Component
          {...pageProps}
          currentTheme={currentTheme}
          setTheme={handleThemeChange}
        />
      </ConfigProvider>
    </div>
  );
}

export default MyApp;
