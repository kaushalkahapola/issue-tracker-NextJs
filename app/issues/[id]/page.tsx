import { Status } from "@prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import axios from "axios";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

// Define the Issue interface
interface Issue {
  id: string;
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
              <IssueDetails issue={issue} />
            </Box>
            <Box>
              <EditIssueButton id={issue.id} />
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
