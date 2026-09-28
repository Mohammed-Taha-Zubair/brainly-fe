import { useState } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { InstagramIcon } from "../icons/Instagram";
import { FacebookIcon } from "../icons/FacebookIcon";

export interface CardProps {
  id?: string;
  title: string;
  type: "twitter" | "youtube" | "instagram" | "facebook";
  link: string;
  thumbnail?: string;
  image?: string;
  tags?: string[];
  date?: string;
  onDelete?: () => void;
  onShare?: () => void;
  tweetData?: Record<string, unknown>;
}

export const Card = ({
  title,
  type,
  link,
  thumbnail,
  image,
  tags,
  onDelete,
  onShare,
}: CardProps) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to extract YouTube video ID
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const match = url
      .trim()
      .match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/
      );
    return match && match[1] ? match[1] : null;
  };

  // Helper to extract YouTube embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const id = getYouTubeId(url);
    if (id) {
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    return url;
  };

  // Helper to extract YouTube thumbnail
  const getYouTubeThumbnail = (url: string): string | null => {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  };

  // Helper to extract Twitter / X username
  const getTwitterInfo = (url: string) => {
    if (!url) return { username: "x", handle: "@x" };
    const clean = url.trim();
    const match = clean.match(
      /(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)(?:\/status\/(\d+))?/i
    );
    const username = match && match[1] ? match[1] : "user";
    return {
      username,
      handle: `@${username}`,
    };
  };

  // Helper to extract domain for generic links
  const getDomain = (url: string) => {
    try {
      const u = new URL(url.startsWith("http") ? url : `https://${url}`);
      return u.hostname.replace("www.", "");
    } catch {
      return "";
    }
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
    if (onShare) onShare();
  };

  const coverImage = thumbnail || image;
  const youtubeThumbnail = getYouTubeThumbnail(link);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 w-80 max-w-sm flex flex-col justify-between transition-all duration-200 hover:shadow-md">
      {/* Card Header */}
      <div>
        <div className="flex justify-between items-center text-gray-600 pb-3 border-b border-gray-100 mb-3">
          <div className="flex items-center gap-2 font-medium text-gray-800 text-sm">
            <span className="text-gray-400">
              {type === "twitter" ? (
                <TwitterIcon size="sm" />
              ) : type === "youtube" ? (
                <YoutubeIcon size="sm" />
              ) : type === "instagram" ? (
                <InstagramIcon size="sm" />
              ) : type === "facebook" ? (
                <FacebookIcon size="sm" />
              ) : (
                <DocumentIcon size="sm" />
              )}
            </span>
            <span className="truncate max-w-40">{title}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <button
              onClick={handleCopyLink}
              title={copied ? "Copied link!" : "Share link"}
              className="p-1 hover:text-gray-700 hover:bg-gray-100 rounded transition cursor-pointer"
            >
              {copied ? (
                <span className="text-xs text-green-600 font-semibold">✓</span>
              ) : (
                <ShareIcon size="sm" />
              )}
            </button>
            {onDelete && (
              <button
                onClick={onDelete}
                title="Delete item"
                className="p-1 hover:text-red-600 hover:bg-red-50 rounded transition cursor-pointer"
              >
                <DeleteIcon size="sm" />
              </button>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="pt-1">
          {/* YouTube Section: Thumbnail cover with play button, switches to iframe on click */}
          {type === "youtube" && (
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-black shadow-inner relative group">
              {isPlaying ? (
                <iframe
                  className="w-full h-full"
                  src={`${getYouTubeEmbedUrl(link)}?autoplay=1`}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <div
                  onClick={() => setIsPlaying(true)}
                  className="w-full h-full relative cursor-pointer"
                  title="Click to play video"
                >
                  <img
                    src={
                      coverImage ||
                      youtubeThumbnail ||
                      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60"
                    }
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60";
                    }}
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                    {/* YouTube Red Play Button */}
                    <div className="w-12 h-9 bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-red-700 group-hover:scale-110 transition-all">
                      <svg
                        className="w-5 h-5 text-white ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* YouTube Brand Badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-semibold rounded tracking-wide">
                    YouTube
                  </div>
                </div>
              )}
            </div>
          )}

          {/* X / Twitter Section: Sleek visual card with avatar, handle, cover & view button */}
          {type === "twitter" && (
            <div className="w-full rounded-xl overflow-hidden border border-gray-800 bg-[#000000] text-white shadow-sm flex flex-col justify-between">
              {/* Optional Cover Image */}
              {coverImage && (
                <div className="w-full h-32 overflow-hidden bg-gray-900 border-b border-gray-800">
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="p-3.5">
                {/* Author row with avatar and X icon */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center border border-gray-700 text-xs font-bold text-gray-300 shrink-0">
                      <img
                        src={`https://unavatar.io/x/${getTwitterInfo(link).username}`}
                        alt={getTwitterInfo(link).username}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <span>
                        {getTwitterInfo(link).username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-semibold text-xs text-white truncate">
                        {getTwitterInfo(link).handle}
                      </div>
                      <div className="text-[10px] text-gray-400">Post on X</div>
                    </div>
                  </div>
                  <div className="p-1.5 rounded-full bg-gray-900 text-white">
                    <TwitterIcon size="sm" />
                  </div>
                </div>

                {/* Tweet text / title */}
                <p className="text-xs text-gray-200 line-clamp-3 leading-relaxed mb-3">
                  {title}
                </p>

                {/* Action button */}
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-200 text-xs font-medium border border-gray-800 transition"
                >
                  <span>View on X</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>
          )}

          {/* Instagram Section: Gradient card or cover image */}
          {type === "instagram" && (
            <div className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              {coverImage ? (
                <div className="w-full h-36 overflow-hidden bg-gray-100 relative">
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white backdrop-blur-xs">
                    <InstagramIcon size="sm" />
                  </div>
                </div>
              ) : (
                <div className="w-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-4 text-white relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded backdrop-blur-xs">
                      Instagram
                    </span>
                    <InstagramIcon size="sm" />
                  </div>
                  <p className="text-xs font-medium line-clamp-2 mt-1 leading-snug drop-shadow-xs">
                    {title}
                  </p>
                </div>
              )}

              <div className="p-3 bg-white flex items-center justify-between border-t border-gray-100">
                <span className="text-xs text-gray-600 truncate max-w-[170px]">
                  {title}
                </span>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-pink-600 hover:text-pink-700 shrink-0 ml-2"
                >
                  View post ↗
                </a>
              </div>
            </div>
          )}

          {/* Facebook Section: Blue gradient card or cover image */}
          {type === "facebook" && (
            <div className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              {coverImage ? (
                <div className="w-full h-36 overflow-hidden bg-gray-100 relative">
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white backdrop-blur-xs">
                    <FacebookIcon size="sm" />
                  </div>
                </div>
              ) : (
                <div className="w-full bg-gradient-to-br from-[#1877F2] to-[#0c4a9e] p-4 text-white relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded backdrop-blur-xs">
                      Facebook
                    </span>
                    <FacebookIcon size="sm" />
                  </div>
                  <p className="text-xs font-medium line-clamp-2 mt-1 leading-snug drop-shadow-xs">
                    {title}
                  </p>
                </div>
              )}

              <div className="p-3 bg-white flex items-center justify-between border-t border-gray-100">
                <span className="text-xs text-gray-600 truncate max-w-[170px]">
                  {title}
                </span>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 shrink-0 ml-2"
                >
                  View post ↗
                </a>
              </div>
            </div>
          )}

          {/* Generic Web Link / Document Section */}
          {type !== "youtube" &&
            type !== "twitter" &&
            type !== "instagram" &&
            type !== "facebook" && (
              <div className="w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex flex-col">
                {coverImage ? (
                  <div className="w-full h-32 overflow-hidden bg-gray-100">
                    <img
                      src={coverImage}
                      alt={title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center gap-2">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${getDomain(
                        link
                      )}&sz=64`}
                      alt="Favicon"
                      className="w-4 h-4 rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span className="text-xs font-medium text-gray-700 truncate">
                      {getDomain(link) || "Web Link"}
                    </span>
                  </div>
                )}
                <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-700 truncate max-w-[170px]">
                    {title}
                  </span>
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#5046e4] font-medium hover:underline shrink-0 ml-2"
                  >
                    Open ↗
                  </a>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Card Footer / Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-gray-50">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-purple-50 text-[#5046e4] px-2 py-0.5 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
