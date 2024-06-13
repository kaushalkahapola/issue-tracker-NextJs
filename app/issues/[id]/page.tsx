import { Status, User } from "@prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import axios from "axios";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import {auth} from "@/auth"
import AssigneeSelect from "../components/AssigneeSelect";


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

  const session = await auth()
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
      {issue ? (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
          <Box gridColumn={{sm:'span 4'}}>
            <IssueDetails issue={issue} />
          </Box>
          {session && session.user && <Box>
            <Flex direction="column" gap="3">
            <AssigneeSelect />
              <EditIssueButton id={issue.id} />
              <DeleteIssueButton id={issue.id} />
            </Flex>
          </Box>}
        </Grid>
      ) : (
        <p>Issue not found.</p>
      )}
    </div>
  );
};

export default IssueDetailPage;
