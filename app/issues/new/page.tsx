"use client";

import { issueSchema } from "@/app/validationSchema";
import { Heading } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { z } from "zod";
// import IssueForm from "../components/IssueForm";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import('../components/IssueForm'), {

  ssr: false

});

type Issue = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const router = useRouter();


  const onSubmit = async (
    data: Issue,
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
    ) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An error occurred while creating the issue. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Heading as="h1" size="7" className="text-zinc-700 mb-5">Create a New Issue</Heading>
      <IssueForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewIssuePage;
