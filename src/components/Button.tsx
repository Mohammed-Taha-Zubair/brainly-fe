import type { ReactElement } from "react";

export interface ButtonProps {
  varient?: "primary" | "secondary";
  variant?: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg";
}

const varientClasses = {
  primary: "bg-[#5046e4] text-white hover:bg-[#4338ca] shadow-sm",
  secondary: "bg-[#e0e7ff] text-[#5046e4] hover:bg-[#d5ddfd]",
};

const defaultStyles =
  "px-4 py-2 rounded-md font-medium flex items-center justify-center cursor-pointer transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";

export const Button = ({
  varient = "primary",
  variant,
  text,
  startIcon,
  endIcon,
  onClick,
  fullWidth,
  loading,
}: ButtonProps) => {
  const activeVariant = variant || varient;

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${varientClasses[activeVariant]} ${defaultStyles} ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        <>
          {startIcon && <span className="mr-2 flex items-center">{startIcon}</span>}
          <span>{text}</span>
          {endIcon && <span className="ml-2 flex items-center">{endIcon}</span>}
        </>
      )}
    </button>
  );
};