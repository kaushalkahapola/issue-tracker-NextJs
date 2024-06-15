import React from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

const IssueStatusBadge = ({ status }: { status: Status | undefined }) => {
  return(
      <div>
        {status == "OPEN" && <Badge variant="surface" color="red">Open</Badge>}
        {status == "DONE" && <Badge variant="surface"  color="green">Done</Badge>}
        {status == "IN_PROGRESS" && <Badge variant="surface"  color="orange">In progress</Badge>}
      </div>
  )
};

export default IssueStatusBadge;
