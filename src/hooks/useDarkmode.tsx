import { useEffect, useState } from "react";

const useDarkmode = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  return { isDark, setIsDark };
};
export default useDarkmode;
