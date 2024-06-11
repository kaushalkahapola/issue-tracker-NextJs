import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { Status } from "@prisma/client";
import IssueStatusBadge from "./IssueStatusBadge";

// Define the Issue interface
interface Issue {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
}

// Server component to fetch and display issues
const IssuePage = async () => {
  let issues: Issue[] = [];
  try {
    const response = await axios.get("http://localhost:3000/api/issues");
    issues = response.data.map((issue: any) => ({
      ...issue,
      createdAt: new Date(issue.createdAt),
    }));
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-5">
        <Link href="/issues/new">
          <Button>Create New Issue</Button>
        </Link>
      </div>
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
                  {issue.title}
                  <div className="block md:hidden">
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

export default IssuePage;
