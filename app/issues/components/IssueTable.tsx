'use client'

import Pagination from "@/app/components/Pagination";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Flex, Button, Table } from "@radix-ui/themes";
import axios from "axios";
import Link from "../../components/Link";
import {useEffect, useState } from "react";
import IssueStatusBadge from "./IssueStatusBadge";
import IssueStatusFilter from "./IssueStatusFilter";
import NextLink from "next/link";



const columns: { Header: string; accessor: keyof Issue; className?: string }[] =
  [
    { Header: "Issue", accessor: "title" },
    { Header: "Status", accessor: "status", className: "hidden md:table-cell" },
    { Header: "Created at", accessor: "createdAt", className: "hidden md:table-cell" },
  ];



const IssueTable = ({
    searchParams,
  }: {
    searchParams: { status: Status; orderBy: keyof Issue; page: string };
  }) => {

    const { status, orderBy, page = '1' } = searchParams;

    const [issues, setIssues] = useState<Issue[]>([]);
    const [issueCount, setIssueCount] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get("/api/issues", {
                    params: { status, orderBy, page },
                });
                const fetchedIssues = response.data.issues.map((issue: any) => ({
                    ...issue,
                    createdAt: new Date(issue.createdAt),
                }));
                setIssues(fetchedIssues);
                setIssueCount(response.data.count);
                setPageSize(response.data.pageSize);
            } catch (error) {
                console.error(error);
            }
        };
        fetchIssues();
    }, [status, orderBy, page]);


  return (
    <div className="max-w-3xl mx-auto space-y-3">
    <Flex justify="between">
      <Link href="/issues/new">
        <Button>Create New Issue</Button>
      </Link>
      <IssueStatusFilter />
    </Flex>
    <div className="space-y-3">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.Header}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.accessor,
                    },
                  }}
                >
                  {column.Header}
                </NextLink>
                {column.accessor === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
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
        CurrentPage={parseInt(page)}
      />
    </div>
  </div>
  )
}

export default IssueTable