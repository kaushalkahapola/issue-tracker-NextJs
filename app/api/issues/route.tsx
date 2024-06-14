import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchema";
import { auth } from "@/auth";
import { Status, Issue } from "@prisma/client";

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

export async function GET(req : NextRequest){
  const { searchParams } = new URL(req.url);
  // we have to check if the status is valid with types of S
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.get('status') as Status) ? searchParams.get('status') as Status : undefined;
  const columns = ['title', 'status', 'createdAt']
  const orderBy = columns.includes(searchParams.get('orderBy') as string) ? searchParams.get('orderBy') as keyof Issue : 'createdAt';
  console.log(status);
  
  const issues = await prisma.issue.findMany(
    {
      where: {
        status: status
      },
      orderBy: {
        [orderBy]: 'asc'
      }
    }
  );
  return NextResponse.json(issues);
}
