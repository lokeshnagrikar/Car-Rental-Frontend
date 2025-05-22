"use client"
import { useTheme } from "../contexts/ThemeContext"
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline"

const ThemeToggle = ({ className = "" }) => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md transition-colors ${
        isDarkMode ? "bg-gray-700 text-yellow-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      } ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  )
}

export default ThemeToggle
