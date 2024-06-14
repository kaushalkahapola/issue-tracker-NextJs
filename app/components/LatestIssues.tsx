import prisma from "@/prisma/client";
import { Avatar, Card , Flex, Heading, Table} from "@radix-ui/themes";
import IssueStatusBadge from "../issues/components/IssueStatusBadge";
import Link from "next/link";

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        take: 5,
        orderBy: {
        createdAt: 'desc'
        },
        include: {
            assignedUser : true
        }
    })
    return (
        <Flex direction='column' gap='2'>
        <Heading className="text-gray-700" ml='5'>Latest Issues</Heading>
        <Card>
            <Table.Root>
                <Table.Body>
                    {issues.map(issue =>(
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify='between'>
                            <Flex direction='column' gap='2'>
                            <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                            <IssueStatusBadge status={issue.status} />
                            
                            </Flex>
                            {issue.assignedUser && (
                            <Avatar
                                src={issue.assignedUser.image!}
                                fallback='?'
                                size='2'
                                radius="full"
                            />)}
                            </Flex>
                            </Table.Cell>

                            
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
        </Flex>
        )
}

export default LatestIssues;
