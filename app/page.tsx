import prisma from "@/prisma/client";
import IssueSummary from "./components/IssueSummary";
import LatestIssues from "./components/LatestIssues";

export default async function Home() {

  const openCount = await prisma.issue.count({where: {status: 'OPEN'}})
  const inProgressCount = await prisma.issue.count({where: {status: 'IN_PROGRESS'}})
  const doneCount = await prisma.issue.count({where: {status: 'DONE'}})

  return (
    <>
      {/* <LatestIssues /> */}
      <IssueSummary open={openCount} done={doneCount} inProgress={inProgressCount} />
    </>
  );
}
