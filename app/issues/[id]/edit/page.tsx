"use client";

import { issueSchema } from "@/app/validationSchema";
import { Heading } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { notFound, useRouter } from "next/navigation";
import { z } from "zod";
import IssueForm from "../../components/IssueForm";


type Issue = z.infer<typeof issueSchema>;

const IssueEditPage = async ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;

  let issue: Issue | null = null;
  try {
    const response = await axios.get(`http://localhost:3000/api/issues/${id}`);
    issue = response.data;
  } catch (error) {
    console.error(error);
    notFound();
  }

  const onSubmit = async (
    data: Issue,
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
    ) => {
    try {
      setIsSubmitting(true);
      await axios.patch(`/api/issues/${id}`, data);
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      setError("An error occurred while updating the issue. Please try again.");
    }
  };

  console.log(issue);

  return (
    <div className="max-w-xl mx-auto">
      <Heading as="h1" size="7" className="text-zinc-700 mb-5">Update Issue</Heading>
      <IssueForm onSubmit={onSubmit} issue={issue}/>
    </div>
  );
};

export default IssueEditPage;
