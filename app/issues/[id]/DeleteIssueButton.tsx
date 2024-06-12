'use client'

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ id }: { id: string }) => {
    const router = useRouter()
    const [Err, setErr] = useState(false)
  return (
    <>
    <AlertDialog.Root>
    <AlertDialog.Trigger>
      <Button color="red">Delete Issue</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content maxWidth="450px">
      <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
      <AlertDialog.Description size="2">
        Are you sure? This issue will no longer be available.
      </AlertDialog.Description>
  
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button variant="solid" color="red" onClick={async () =>{
            try {
                await axios.delete(`/api/issues/${id}`)
                router.push('/issues')
                router.refresh()
            } catch (error) {
                setErr(true)
            }
          }}>
            delete issue
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  </AlertDialog.Root>
  <AlertDialog.Root open={Err}>
    <AlertDialog.Content maxWidth="450px">
      <AlertDialog.Title>Error</AlertDialog.Title>
      <AlertDialog.Description size="2">
        This error could not be deleted.
      </AlertDialog.Description>
  
      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray" onClick={() => setErr(false)}>
            Okay
          </Button>
        </AlertDialog.Cancel>
      </Flex>
    </AlertDialog.Content>
  </AlertDialog.Root>

    </>
  );
};

export default DeleteIssueButton;
