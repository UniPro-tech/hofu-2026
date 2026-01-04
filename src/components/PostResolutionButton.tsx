"use client";

import { signIn } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  sessionExists: boolean;
};

export default function PostResolutionButton({ sessionExists }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isOpen) textareaRef.current?.focus();
  }, [isOpen]);

  const handleClick = async () => {
    if (sessionExists) {
      setIsOpen(true);
    } else {
      await signIn("unique");
    }
  };

  const close = () => {
    setIsOpen(false);
    setContent("");
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    // For now, navigate to the new resolution page. You can pass content via query or
    // handle submission here. We'll navigate to the page expected.
    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content }),
    });
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="px-10 py-3 rounded-full bg-red-700 hover:bg-red-800 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 tracking-wider cursor-pointer"
        onClick={handleClick}
      >
        {sessionExists ? "抱負を投稿する" : "ログインして抱負を投稿する"}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70"
            onClick={close}
            aria-hidden="true"
          />

          <form
            onSubmit={handleSubmit}
            className="relative z-10 w-full max-w-xl mx-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg dark:shadow-black/50 ring-1 ring-black/5 dark:ring-white/5 p-6 text-slate-900 dark:text-slate-100"
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
            }}
          >
            <h2 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
              抱負を投稿
            </h2>
            <label className="block">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-30 p-3 border rounded-md resize-none bg-white text-slate-900 placeholder-slate-500 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 dark:border-slate-700"
                placeholder="あなたの抱負を入力してください"
              />
            </label>

            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-100"
                onClick={close}
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-red-700 hover:bg-red-800 text-white dark:bg-red-600 dark:hover:bg-red-700"
              >
                投稿へ進む
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
