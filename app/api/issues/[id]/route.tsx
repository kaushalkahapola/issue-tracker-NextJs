import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"; // Adjust the import based on your project structure
import { issueSchema } from "@/app/validationSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const issue = await prisma.issue.findUnique({
      where: { id: String(id) }, // Convert id to a string
    });

    if (!issue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    return NextResponse.json(issue);
  } catch (error) {
    console.error("Error fetching issue:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();

  try {
    const checkIssue = await prisma.issue.findUnique({
      where: { id: String(id) },
    });

    if (!checkIssue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: String(id) },
      data: body,
    });

    return NextResponse.json(updatedIssue);
  } catch (error) {
    console.error("Error updating issue:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
