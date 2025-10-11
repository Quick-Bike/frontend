import useDarkmode from "../hooks/useDarkmode";
import { CiDark, CiLight } from "react-icons/ci";

export default function ThemeToggle() {
  const { isDark, setIsDark } = useDarkmode();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-full border border-gray-400 ml-1"
    >
      {isDark ? <CiDark size={20} /> : <CiLight size={20} />}
    </button>
  );
}
