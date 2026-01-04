import { NextResponse } from "next/server";
import { Post as PostModel } from "@/libs/post";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const content =
      typeof body?.content === "string" ? body.content.trim() : "";
    let title = typeof body?.title === "string" ? body.title.trim() : "";

    if (!content) {
      return NextResponse.json(
        { error: "content is required" },
        { status: 400 },
      );
    }

    if (!title) {
      // デフォルトタイトルは先頭のテキスト（最大50文字）
      title = content.slice(0, 50) || "無題";
    }

    const post = await PostModel.create(content, title);
    const saved = await post.save();

    return NextResponse.json(saved, { status: 201 });
  } catch (err: any) {
    const message = err?.message || String(err) || "unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
