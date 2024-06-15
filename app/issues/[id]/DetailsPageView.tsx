"use client";

import { Issue } from "@prisma/client";
import { Grid, Box, Flex } from "@radix-ui/themes";
import axios from "axios";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import AssigneeSelect from "../components/AssigneeSelect";
import IssueDetails from "../components/IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";

const DetailsPageView = ({ id , session }: { id: string , session : Session | null}) => {
  const [issue, setIssue] = useState<Issue | null>(null);

  

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        // Fetch issue details
        const response = await axios.get(`/api/issues/${id}`);
        const data = response.data;
        const fetchedIssue: Issue = {
          ...data,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        };
        setIssue(fetchedIssue);
      } catch (error) {
        console.error("Error fetching issue details:", error);
      }
    };

    fetchIssueDetails();
  }, []);

  return (
    <div>
      {issue && <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box gridColumn={{ sm: "span 4" }}>
          <IssueDetails issue={issue} />
        </Box>
        {session && (
          <Box>
            <Flex direction="column" gap="3">
              <AssigneeSelect issue={issue!} />
              <EditIssueButton id={issue!.id} />
              <DeleteIssueButton id={issue!.id} />
            </Flex>
          </Box>
        )}
      </Grid>}
    </div>
  );
};

export default DetailsPageView;
