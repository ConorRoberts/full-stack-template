import clsx from "clsx";
import { useState, useEffect } from "react";
import { Moon, Sun } from "./Icons";

interface Props {
  size?: number;
  class?: string;
}

const DarkModeButton = ({ size = 20, class: className }: Props) => {
  const [darkMode, setDarkMode] = useState(false);

  const onDarkModeChange = (newValue: boolean) => {
    setDarkMode(newValue);

    if (newValue) {
      document.body.classList.add("dark");
      document.body.classList.add("b-dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.remove("b-dark");
    }

    localStorage.setItem("darkMode", newValue ? "true" : "false");
  };

  useEffect(() => {
    const localDarkModeValue = localStorage.getItem("darkMode");
    onDarkModeChange(localDarkModeValue === "true");
  }, []);

  return (
    <div
      className={clsx(
        className ??
          "rounded-full sm:p-2 hover:bg-gray-100 transition dark:hover:bg-gray-800 cursor-default flex justify-center items-center"
      )}
      onClick={() => onDarkModeChange(!darkMode)}
    >
      {darkMode ? <Sun size={size} /> : <Moon size={size} />}
    </div>
  );
};

export default DarkModeButton;
