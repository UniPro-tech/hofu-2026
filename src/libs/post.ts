import type { Session } from "next-auth";
import { auth } from "@/auth";
import { prisma } from "./prisma";

export class Post {
  public id?: number;
  public content: string;
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public author_name: string;
  public author_email: string;

  constructor(
    content: string,
    title: string,
    author_name: string,
    author_email: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.content = content;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.author_name = author_name;
    this.author_email = author_email;
  }

  public async save(): Promise<void> {
    await prisma.post.create({
      data: {
        id: this.id,
        content: this.content,
        title: this.title,
        author_name: this.author_name,
        author_email: this.author_email,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      },
    });
    return;
  }

  public static async create(
    content: string,
    title: string,
    session?: Session,
  ): Promise<Post> {
    let sessionTmp: Session | null | undefined = session;
    if (!session) {
      sessionTmp = await auth();
    }
    if (
      !sessionTmp ||
      !sessionTmp.user ||
      !sessionTmp.user.email ||
      !sessionTmp.user.name
    ) {
      throw new Error("User not authenticated");
    }
    return new Post(
      content,
      title,
      sessionTmp.user.name,
      sessionTmp.user.email,
    );
  }

  public static async findAll(): Promise<Post[]> {
    const list = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return Promise.resolve(
      list.map(
        (item) =>
          new Post(
            item.content,
            item.title,
            item.author_name,
            item.author_email,
            item.createdAt,
            item.updatedAt,
          ),
      ),
    );
  }

  public static async findByAuthor(author_email: string): Promise<Post[]> {
    const list = await prisma.post.findMany({
      where: {
        author_email: author_email,
      },
    });
    return Promise.resolve(
      list.map(
        (item) =>
          new Post(
            item.content,
            item.title,
            item.author_name,
            item.author_email,
            item.createdAt,
            item.updatedAt,
          ),
      ),
    );
  }

  public static async findById(id: number): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) {
      return null;
    }
    return Promise.resolve(
      new Post(
        post.content,
        post.title,
        post.author_name,
        post.author_email,
        post.createdAt,
        post.updatedAt,
      ),
    );
  }

  public static async deleteById(id: number): Promise<void> {
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return;
  }
}
