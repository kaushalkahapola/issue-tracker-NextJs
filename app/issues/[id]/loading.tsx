import { Flex, Card, Box } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailLoadingPage = () => {
  return (
    <Box className="space-y-3 max-w-2xl">
      <Flex justify="between" px="1">
        <Skeleton width='10rem'/>
        <Flex gap="3">
          <Skeleton width='5rem' />
          <Skeleton width='8rem' />
        </Flex>
      </Flex>
      <Card className="prose max-w-none" variant="surface">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default IssueDetailLoadingPage;
