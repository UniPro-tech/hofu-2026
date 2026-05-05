import { NextResponse } from "next/server";
import { Post as PostModel } from "@/libs/post";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const content =
      typeof body?.content === "string" ? body.content.trim() : "";
    let title = typeof body?.title === "string" ? body.title.trim() : "";

    const MAX_TITLE = 100;
    const MAX_CONTENT = 5000;

    if (!content) {
      return NextResponse.json(
        { error: "content is required" },
        { status: 400 },
      );
    }

    if (content.length > MAX_CONTENT) {
      return NextResponse.json(
        { error: `content must be <= ${MAX_CONTENT} chars` },
        { status: 400 },
      );
    }

    if (!title) {
      // デフォルトタイトルは本文の先頭行（改行まで）を最大50文字で切り取る
      const firstLine = content.split("\n")[0]?.trim() ?? "";
      title = firstLine.slice(0, 50) || "無題";
    }

    if (title.length > MAX_TITLE) {
      title = title.slice(0, MAX_TITLE);
    }

    const post = await PostModel.create(content, title);
    const saved = await post.save();

    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    const message = (err as Error).message || String(err) || "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
