import type { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  active?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({
  text,
  icon,
  active,
  onClick,
}: SidebarItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center text-gray-700 py-2.5 px-4 cursor-pointer hover:bg-gray-100 rounded-md transition-all duration-150 gap-4 text-sm select-none ${
        active
          ? "bg-purple-50 text-[#5046e4] font-medium"
          : "hover:text-gray-900"
      }`}
    >
      <div className={active ? "text-[#5046e4]" : "text-gray-500"}>
        {icon}
      </div>
      <div>{text}</div>
    </div>
  );
};
