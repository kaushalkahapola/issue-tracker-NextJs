import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

const issueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const issue = await prisma.issue.create({
    data: {
        title: validation.data.title,
        description: validation.data.description,
    },
  });

  return NextResponse.json(issue, { status: 201 });
}
