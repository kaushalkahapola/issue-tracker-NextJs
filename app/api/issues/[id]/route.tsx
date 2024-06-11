import { NextRequest, NextResponse } from 'next/server';
import prisma  from '@/prisma/client'; // Adjust the import based on your project structure

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const issue = await prisma.issue.findUnique({
    where: { id: String(id) }, // Convert id to a string
    });

    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    return NextResponse.json(issue);
  } catch (error) {
    console.error('Error fetching issue:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
