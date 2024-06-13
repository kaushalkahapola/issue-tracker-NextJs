import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchema";
import { auth } from "@/auth";

export const POST = auth(async function POST(request) {
  if(!request.auth){
    return NextResponse.json({message: "Unauthorized"}, {status: 401});
  }
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
)

export async function GET(request: NextRequest){
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}
