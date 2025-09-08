  import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  const [themeUrl, setThemeUrl] = useState("light");

  const returnUrl = useCallback(() => {
    switch (theme) {
      case "light":
        setThemeUrl("light");
        break;
      case "dark":
        setThemeUrl("dark");
        return;
      default:
        setThemeUrl("light");
    }
  }, [theme]);

  const handleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  useEffect(() => {
    returnUrl();
    // Remove the currencyRate dependency if not needed.
  }, [theme]);

  return (
    <div className="z-50">
      <button
        className="flex items-center justify-center bg-gray-500 dark:bg-red-800 lg:w-14 md:w-8 w-5"
        onClick={handleTheme}
      >
        {themeUrl === "light" ?
          <Icon
            icon="solar:moon-broken"
            className="w-6 h-6 text-gray-800"
          /> : <Icon
            icon="solar:sun-2-broken"
            className="w-6 h-6  text-red-700"
          />}

        {/* <Image alt="" width={20} height={20} color="white" src={themeUrl} /> */}
      </button>
    </div>
  );
};

export default ThemeChanger;

