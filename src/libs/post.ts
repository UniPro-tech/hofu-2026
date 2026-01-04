import { Session } from "next-auth";
import { prisma } from "./prisma";
import { auth } from "@/auth";

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
    updatedAt?: Date
  ) {
    this.content = content;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.author_name = author_name;
    this.author_email = author_email;
  }

  public async save(): Promise<any> {
    return prisma.post.create({
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
  }

  public static async create(
    content: string,
    title: string,
    session?: Session
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
      sessionTmp.user.email
    );
  }

  public static async findAll(): Promise<any> {
    return prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  public static async findByAuthor(author_email: string): Promise<any> {
    return prisma.post.findMany({
      where: {
        author_email: author_email,
      },
    });
  }

  public static async findById(id: number): Promise<any> {
    return prisma.post.findUnique({
      where: {
        id: id,
      },
    });
  }

  public static async deleteById(id: number): Promise<any> {
    return prisma.post.delete({
      where: {
        id: id,
      },
    });
  }
}
