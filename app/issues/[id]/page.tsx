import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text, Grid, Box, Button } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import IssueStatusBadge from "../IssueStatusBadge";
import { Pencil2Icon } from "@radix-ui/react-icons"

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
          <Grid columns={{initial:"1", md:"2"}} gap="5">
            <Box>
              <Flex justify='between' mb="3" className="flex-col md:flex-row">
                <Heading size="7" className="text-zinc-700">
                  {issue.title}
                </Heading>
                <Flex gap="3" align="center">
                  <IssueStatusBadge status={issue.status} />
                  <Text color="gray">{issue.createdAt.toDateString()}</Text>
                </Flex>
              </Flex>
              <Card className="prose max-w-none prose-h1:text-xl" variant="surface">
                <Markdown>{issue.description}</Markdown>
              </Card>
            </Box>
            <Box>
              <Link href={`/issues/${id}/edit`}>
                <Button>
                  <Pencil2Icon />
                  Edit Issue</Button>
              </Link>
            </Box>
          </Grid>
        ) : (
          <p>Issue not found.</p>
        )}
      </div>
    </div>
  );
};

export default IssueDetailPage;
