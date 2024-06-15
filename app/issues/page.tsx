import { Issue, Status } from "@prisma/client";
import { Metadata } from "next";
import IssueTable from "./components/IssueTable";


// Server component to fetch and display issues
const IssuePage = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}) => {
  return (
    <IssueTable searchParams={searchParams}  />
  )
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issues List",
  description: "View all issues",
};

export default IssuePage;
