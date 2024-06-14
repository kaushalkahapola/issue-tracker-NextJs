import { Status } from "@prisma/client";
import { Button, Flex, Table } from "@radix-ui/themes";
import axios from "axios";
import Link from "../components/Link";
import IssueStatusBadge from "./components/IssueStatusBadge";
import IssueStatusFilter from "./components/IssueStatusFilter";

// Define the Issue interface
interface Issue {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
}

// Server component to fetch and display issues
const IssuePage = async ({searchParams}:{searchParams: {status: Status}}) => {
  
  const status = searchParams.status;

  let issues: Issue[] = [];
  try {
    const response = await axios.get('http://localhost:3000/api/issues', status ? {params: {status}} : {});
    issues = response.data.map((issue: any) => ({
      ...issue,
      createdAt: new Date(issue.createdAt),
    }));
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Flex mb='5' justify='between'>
      <IssueStatusFilter/>
        <Link href="/issues/new">
          <Button>Create New Issue</Button>
        </Link>
      </Flex>
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created at
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.RowHeaderCell>
                  <Link href={`issues/${issue.id}`}>{issue.title}</Link>
                  <div className="block md:hidden mt-2">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.RowHeaderCell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic'

export default IssuePage;
