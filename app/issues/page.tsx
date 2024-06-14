import { Status } from "@prisma/client";
import { Button, Flex, Table } from "@radix-ui/themes";
import axios from "axios";
import Link from "../components/Link";
import IssueStatusBadge from "./components/IssueStatusBadge";
import IssueStatusFilter from "./components/IssueStatusFilter";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";

// Define the Issue interface
interface Issue {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
}

const columns: {Header: string, accessor: keyof Issue, className? : string}[] = [
  { Header: 'Issue', accessor: 'title' },
  { Header: 'Status', accessor: 'status', className:"hidden md:table-cell" },
  { Header: 'Created at', accessor: 'createdAt', className:"hidden md:table-cell" },
]


// Server component to fetch and display issues
const IssuePage = async ({searchParams}:{searchParams: {status: Status, orderBy: keyof Issue, page: string }}) => {
  
  const status = searchParams.status;
  const orderBy = searchParams.orderBy;
  const page = searchParams.page || '1';

  let issues: Issue[] = [];
  let issueCount;
  let pageSize;
  try {
    const response = await axios.get('http://localhost:3000/api/issues', { params: { status, orderBy, page } });
    issues = response.data.issues.map((issue: any) => ({
      ...issue,
      createdAt: new Date(issue.createdAt),
    }));
    issueCount = response.data.count;
    pageSize = response.data.pageSize;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      <Flex justify='between'>
      <IssueStatusFilter/>
        <Link href="/issues/new">
          <Button>Create New Issue</Button>
        </Link>
      </Flex>
      <div className="space-y-3">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell key={column.Header} className={column.className}>
                  <NextLink href={
                    {
                      query:{
                        ...searchParams, orderBy: column.accessor
                      }
                    }
                  }>{column.Header}</NextLink>
                  {column.accessor === searchParams.orderBy && <ArrowUpIcon className="inline"/>}
                </Table.ColumnHeaderCell>
              ))  
              }
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
        <Pagination
          itemCount={issueCount}
          PageSize={pageSize}
          CurrentPage = {parseInt(page)}
        />
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic'

export default IssuePage;
