import { useState } from "react";
import { Button } from "./Button";
import { ShareIcon } from "../icons/ShareIcon";

interface ShareBrainModalProps {
  open: boolean;
  onClose: () => void;
}

export const ShareBrainModal = ({ open, onClose }: ShareBrainModalProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/share/kirat-brain-100x`;

  if (!open) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-full transition cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-50 text-[#5046e4] rounded-lg">
            <ShareIcon size="md" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Share Your Brain</h2>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Share your curated collection of tweets, videos, and links with anyone using this public link.
        </p>

        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2 mb-4">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="bg-transparent text-xs text-gray-600 w-full outline-none select-all"
          />
          <button
            onClick={handleCopy}
            className="text-xs bg-white hover:bg-gray-100 text-gray-700 font-medium px-3 py-1.5 rounded border border-gray-200 shadow-2xs transition cursor-pointer whitespace-nowrap"
          >
            {copied ? "Copied! ✓" : "Copy"}
          </button>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            varient="secondary"
            text="Done"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};
