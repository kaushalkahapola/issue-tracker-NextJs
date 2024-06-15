import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";
import IssueStatusBadge from "./IssueStatusBadge";

const IssueDetails = ({issue}:{issue : Issue | null}) => {
  return (
    <>
      <Flex justify="between" mb="3" className="flex-col md:flex-row">
        <Heading size="7" className="text-zinc-700">
          {issue?.title}
        </Heading>
        <Flex gap="3" align="center">
          <IssueStatusBadge status={issue?.status} />
          <Text color="gray">{issue?.createdAt.toDateString()}</Text>
        </Flex>
      </Flex>
      <Card className="prose max-w-none prose-h1:text-xl" variant="surface">
        <Markdown>{issue?.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
