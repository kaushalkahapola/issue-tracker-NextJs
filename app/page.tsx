import prisma from "@/prisma/client";
import IssueSummary from "./components/IssueSummary";
import LatestIssues from "./components/LatestIssues";
import IssueChart from "./components/IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const openCount = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const doneCount = await prisma.issue.count({ where: { status: "DONE" } });

  return <Grid gap='5' columns={{initial:"1", md:"2"}} >
    <Flex direction='column' gap='5'>
       <IssueSummary open={openCount} done={doneCount} inProgress={inProgressCount} />
       <IssueChart open={openCount} done={doneCount} inProgress={inProgressCount} />
    </Flex>
    <LatestIssues/>
  </Grid>;
}
