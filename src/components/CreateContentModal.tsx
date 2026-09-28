import { useState, useRef } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { InstagramIcon } from "../icons/Instagram";
import { FacebookIcon } from "../icons/FacebookIcon";

interface CreateContentModalProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (content: {
		title: string;
		link: string;
		type: "twitter" | "youtube" | "instagram" | "facebook";
		tags?: string[];
		thumbnail?: string;
	}) => void;
}

export const CreateContentModal = ({
	open,
	onClose,
	onSubmit,
}: CreateContentModalProps) => {
	const [type, setType] = useState<"twitter"|"youtube"|"instagram"|"facebook">("youtube");
	const titleRef = useRef<HTMLInputElement>(null);
	const linkRef = useRef<HTMLInputElement>(null);
	const thumbnailRef = useRef<HTMLInputElement>(null);
	const tagsRef = useRef<HTMLInputElement>(null);

	if (!open) return null;

	const handleSubmit = () => {
		const title = titleRef.current?.value.trim() || "";
		const link = linkRef.current?.value.trim() || "";
		const thumbnail = thumbnailRef.current?.value.trim() || undefined;
		const tagsRaw = tagsRef.current?.value || "";
		const tags = tagsRaw
			.split(",")
			.map((t) => t.trim())
			.filter((t) => t.length > 0);

		if (!title || !link) {
			alert("Please provide both a title and a link");
			return;
		}

		onSubmit({
			title,
			link,
			type,
			tags,
			thumbnail,
		});

		onClose();
	};

	return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 transition-all">
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-150">
        {/* Close Button */}
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

        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Add New Content
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Title
            </label>
            <Input
              placeholder="e.g. First video or tweet"
              ref={titleRef}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Link (URL)
            </label>
            <Input
              placeholder="https://youtube.com/watch?v=... or https://x.com/..."
              ref={linkRef}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              Type
            </label>
            <div className="flex-col gap-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType("youtube")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-sm font-medium transition cursor-pointer ${
                    type === "youtube"
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <YoutubeIcon size="sm" />
                  Youtube
                </button>
                <button
                  type="button"
                  onClick={() => setType("facebook")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-sm font-medium transition cursor-pointer ${
                    type === "facebook"
                      ? "border-blue-500 bg-blue-100 text-blue-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <FacebookIcon size="sm" />
                  Facebook
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType("instagram")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-sm font-medium transition cursor-pointer ${
                    type === "instagram"
                      ? "border-pink-800 bg-pink-50 text-pink-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <InstagramIcon size="sm" />
                  Instagram
                </button>
                <button
                  type="button"
                  onClick={() => setType("twitter")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-sm font-medium transition cursor-pointer ${
                    type === "twitter"
                      ? "border-black bg-gray-100 text-black"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <TwitterIcon size="sm" />
                  Twitter
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Cover / Thumbnail Image URL (optional)
            </label>
            <Input
              placeholder="https://example.com/cover.jpg (optional)"
              ref={thumbnailRef}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Tags (optional, comma separated)
            </label>
            <Input
              placeholder="productivity, coding, dsa, etc..."
              ref={tagsRef}
              className="w-full"
            />
          </div>

          <div className="pt-2">
            <Button
              varient="primary"
              text="Add Content"
              fullWidth={true}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
