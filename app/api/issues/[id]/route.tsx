import { PatchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client"; // Adjust the import based on your project structure
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

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
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = params;
  const body = await request.json();

  try {
    const checkIssue = await prisma.issue.findUnique({
      where: { id: String(id) },
    });

    if (!checkIssue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const validation = PatchIssueSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { title, description, assignedUserId } = validation.data;

    if (assignedUserId) {
      const checkUser = await prisma.user.findUnique({
        where: { id: assignedUserId },
      });

      if (!checkUser) {
        return NextResponse.json(
          { error: "Assigned user not found" },
          { status: 404 }
        );
      }
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: String(id) },
      data: {
        title,
        description,
        assignedUserId,
      },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = params;

  try {
    const checkIssue = await prisma.issue.findUnique({
      where: { id: String(id) },
    });

    if (!checkIssue) {
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    await prisma.issue.delete({
      where: { id: String(id) },
    });

    return NextResponse.json({ message: "Issue deleted" });
  } catch (error) {
    console.error("Error deleting issue:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
