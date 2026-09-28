import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { Card, type CardProps } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import { CreateContentModal } from "../components/CreateContentModal";
import { ShareBrainModal } from "../components/ShareBrainModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";

const INITIAL_CONTENTS: CardProps[] = [
  // {
  //   id: "1",
  //   title: "First tweet",
  //   type: "twitter",
  //   link: "https://twitter.com/kirat_tw/status/1633682974246100992",
  //   tweetData: {
  //     authorName: "Harkirat Singh",
  //     authorHandle: "@kirat_tw",
  //     avatarUrl: "https://avatars.githubusercontent.com/u/8079861?v=4",
  //     text: "Off to a million. Thankyou everyone ❤️",
  //     imageUrl: "https://pbs.twimg.com/media/FquU-NiaYAElmFj?format=jpg&name=medium",
  //     timestamp: "9:55 AM · Mar 9, 2023",
  //     likes: "4.9K",
  //     replies: "200",
  //   },
  //   tags: ["tweet", "milestone"],
  // },
  // {
  //   id: "2",
  //   title: "First video",
  //   type: "youtube",
  //   link: "https://www.youtube.com/watch?v=kY3BOUkU49M",
  //   tags: ["dsa", "coding"],
  // },
];

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [contents, setContents] = useState<CardProps[]>(() => {
    const saved = false;
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_CONTENTS;
      }
    }
    return INITIAL_CONTENTS;
  });

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/content`, {headers:{"token":localStorage.getItem("brainly_user")}}).then((response => {
      setContents(response.data.content);
      // console.log(response.data.content)
    }));
  },[])


  // useEffect(() => {
  //   localStorage.setItem("brainly_contents", JSON.stringify(contents));
  // }, [contents]);


  const postContent = async ({id, title, link, tags, thumbnail}: CardProps) => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {id, title, link, tags, thumbnail},
      {headers:{"token":localStorage.getItem("brainly_user")}}
    )
    return response;
  }

  const handleAddContent =async (newContent: {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "instagram" | "facebook";
    tags?: string[];
    thumbnail?: string;
  }) => {
    const item: CardProps = {
      id: Date.now().toString(),
      title: newContent.title,
      link: newContent.link,
      type: newContent.type,
      tags: newContent.tags,
      thumbnail: newContent.thumbnail,
    };
    // const wahtIPosted = postContent(item);
    setContents((prev) => [item, ...prev]);
    try {
      await postContent(item);
    } catch (err) {
      console.error("Failed to post content to backend:", err);
    }
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    setContents((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredContents = contents.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-900 font-sans flex">
      {/* Fixed Left Sidebar */}
      <Sidebar activeFilter={filter} onSelectFilter={(f) => setFilter(f)} />

      {/* Main Content Area */}
      <div className="ml-72 flex-1 min-h-screen flex flex-col">
        {/* Top Action Header */}
        <header className="px-8 py-5 flex justify-end items-center gap-3 bg-white/60 backdrop-blur-xs border-b border-gray-100 sticky top-0 z-10">
          <Button
            onClick={() => setModalOpen(true)}
            varient="primary"
            text="Add content"
            startIcon={<PlusIcon size="md" />}
          />
          <Button
            onClick={() => setShareModalOpen(true)}
            varient="secondary"
            text="Share brain"
            startIcon={<ShareIcon size="md" />}
          />
        </header>

        {/* Content Section */}
        <main className="p-8 flex-1">
          {filteredContents.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center">
              <p className="text-gray-500 mb-3">No content found for this category</p>
              <Button
                onClick={() => setModalOpen(true)}
                varient="primary"
                text="Add your first item"
                startIcon={<PlusIcon size="sm" />}
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 items-start">
              {filteredContents.map((content) => (
                <Card
                  key={content.id}
                  id={content.id}
                  title={content.title}
                  type={content.type}
                  link={content.link}
                  tags={content.tags}
                  thumbnail={content.thumbnail || content.image}
                  onDelete={() => handleDelete(content.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddContent}
      />

      <ShareBrainModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
};