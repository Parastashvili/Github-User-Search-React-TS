import { useState } from "react";
import Moon from "../assets/moon";
import Sun from "../assets/sun";
import "./heading.css";

export default function Heading() {
  const [theme, setTheme] = useState(true);
  const themeChange = () => {
    setTheme(!theme);
  };
  const reload = () => {
    window.location.reload();
  };
  return (
    <div className="headerCont">
      <h1 className="devFinder" onClick={reload}>
        devfinder
      </h1>
      <div className="themeCont" onClick={themeChange}>
        <h2 className="themeTxt">{theme === true ? "DARK" : "LIGHT"}</h2>
        {theme === true ? <Moon /> : <Sun />}
      </div>
    </div>
  );
}
