import type { ChangeEvent, RefObject } from "react";

interface InputProps {
  placeholder?: string;
  ref?: RefObject<HTMLInputElement | null>;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  defaultValue?: string;
}

export const Input = ({
  placeholder,
  ref,
  type = "text",
  value,
  onChange,
  className = "",
  name,
  defaultValue,
}: InputProps) => {
  return (
    <input
      ref={ref}
      type={type}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-[#5046e4] focus:ring-1 focus:ring-[#5046e4] text-sm text-gray-800 placeholder-gray-400 transition-all bg-white ${className}`}
    />
  );
};