import React from "react";

interface ButtonProps {
  buttonClickHandler: () => void;
  buttonText: string;

  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const paddingMap = {
  xs: "px-2 py-1",
  sm: "px-2 py-1",
  md: "px-2.5 py-1.5",
  lg: "px-3 py-2",
  xl: "px-3.5 py-2.5",
};

const Button = ({ buttonClickHandler, buttonText, size }: ButtonProps) => (
  <button
    type="button"
    onClick={buttonClickHandler}
    className={`rounded bg-indigo-500 
    ${paddingMap[size ?? "md"]} 
    text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500`}
  >
    {buttonText}
  </button>
);

export default Button;
