import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import IssueStatusBadge from "../IssueStatusBadge";

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
            <Flex justify="between" px="1">
              <Heading>{issue.title}</Heading>
              <Flex gap="3">
                <IssueStatusBadge status={issue.status} />
                <Text color="gray">{issue.createdAt.toDateString()}</Text>
              </Flex>
            </Flex>
            <Card className="prose" variant="surface">
              <Markdown>{issue.description}</Markdown>
            </Card>
          </div>
        ) : (
          <p>Issue not found.</p>
        )}
      </div>
    </div>
  );
};

export default IssueDetailPage;
