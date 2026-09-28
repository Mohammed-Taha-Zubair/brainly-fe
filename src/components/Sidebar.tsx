import { BrainIcon } from "../icons/BrainIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import { FacebookIcon } from "../icons/FacebookIcon";
import { InstagramIcon } from "../icons/Instagram";

interface SidebarProps {
  activeFilter?: string;
  onSelectFilter?: (filter: string) => void;
}

export const Sidebar = ({
  activeFilter = "all",
  onSelectFilter,
}: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <aside className="h-screen bg-white border-r border-gray-200 w-72 fixed left-0 top-0 pl-6 pr-4 py-6 flex flex-col justify-between z-20">
      <div>
        {/* Logo / Brand Header */}
        <div
          onClick={() => onSelectFilter && onSelectFilter("all")}
          className="flex text-2xl font-bold items-center gap-3 cursor-pointer select-none text-gray-800 tracking-tight mb-8"
        >
          <div className="p-1 rounded-lg bg-purple-50 text-[#5046e4]">
            <BrainIcon size="lg" />
          </div>
          <span>Brainly</span>
        </div>

        {/* Sidebar Nav Items */}
        <div className="space-y-1">
          <SidebarItem
            text="All Content"
            icon={<DocumentIcon size="md" />}
            active={activeFilter === "all"}
            onClick={() => onSelectFilter && onSelectFilter("all")}
          />
          <SidebarItem
            text="Facebook"
            icon={<FacebookIcon size="md" />}
            active={activeFilter === "facebook"}
            onClick={() => onSelectFilter && onSelectFilter("facebook")}
          />
          <SidebarItem
            text="instagram"
            icon={<InstagramIcon size="md" />}
            active={activeFilter === "instagram"}
            onClick={() => onSelectFilter && onSelectFilter("instagram")}
          />
          {/* add more 2 items */}
          <SidebarItem
            text="Twitter"
            icon={<TwitterIcon size="md" />}
            active={activeFilter === "twitter"}
            onClick={() => onSelectFilter && onSelectFilter("twitter")}
          />
          <SidebarItem
            text="Youtube"
            icon={<YoutubeIcon size="md" />}
            active={activeFilter === "youtube"}
            onClick={() => onSelectFilter && onSelectFilter("youtube")}
          />
        </div>
      </div>

      {/* Bottom Auth navigation shortcut */}
      <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
        <button
          onClick={() => navigate("/signin")}
          className="text-xs text-left text-gray-500 hover:text-[#5046e4] py-1.5 px-3 rounded hover:bg-gray-50 transition cursor-pointer"
        >
          Switch Account / Sign in →
        </button>
      </div>
    </aside>
  );
};
