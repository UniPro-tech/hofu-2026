"use client";

import { signIn } from "next-auth/react";

type Props = {
  sessionExists: boolean;
};

export default function PostResolutionButton({ sessionExists }: Props) {
  const handleClick = async () => {
    if (sessionExists) {
      // TODO: モーダル実装
      window.location.href = "/resolutions/new";
    } else {
      await signIn("unique");
    }
  };

  return (
    <button
      type="button"
      className="px-10 py-3 rounded-full bg-red-700 hover:bg-red-800 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 tracking-wider cursor-pointer"
      onClick={handleClick}
    >
      {sessionExists ? "抱負を投稿する" : "ログインして抱負を投稿する"}
    </button>
  );
}
