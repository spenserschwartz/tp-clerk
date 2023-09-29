import React from "react";

interface ButtonProps {
  buttonText: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Button = ({ buttonText, size }: ButtonProps) => {
  return (
    <button
      type="button"
      className="rounded bg-indigo-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      Button text
    </button>
  );
};

export default Button;
