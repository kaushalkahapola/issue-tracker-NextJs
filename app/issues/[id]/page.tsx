import Link from "next/link";
import React from "react";
import axios from "axios";
import { Status } from "@prisma/client";
import IssueStatusBadge from "../IssueStatusBadge";
import delay from "delay";
import { notFound } from "next/navigation";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";

// Define the Issue interface
interface Issue {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}
// Server component to fetch and display issues
const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  let issue: Issue | null = null;
  try {
    const response = await axios.get(`http://localhost:3000/api/issues/${id}`);
    const data = response.data;
    issue = {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  } catch (error) {
    console.error(error);
    notFound();
  }
  await delay(2000);

  return (
    <div>
      {/* <div>
        <Link href="/issues/new">
          <Button>Create New Issue</Button>
        </Link>
      </div> */}
      <div>
        {issue ? (
          <div className="space-y-3 max-w-xl mx-auto">
            <Flex justify='between' px='1'>
              <Heading>{issue.title}</Heading>
              <Flex gap='3'>
                <IssueStatusBadge status={issue.status} />
                <Text color="gray">{issue.createdAt.toDateString()}</Text>
              </Flex>
            </Flex>
            <Card variant="surface">{issue.description}</Card>
          </div>
        ) : (
          <p>Issue not found.</p>
        )}
      </div>
    </div>
  );
};

export default IssueDetailPage;
