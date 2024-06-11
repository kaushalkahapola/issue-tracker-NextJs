"use client";

import { TextField, Button, Callout, Text, Heading } from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { z } from "zod";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import delay from 'delay'


type Issue = z.infer<typeof issueSchema>;

const NewIssuePage = async () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Issue>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setIsSubmitting(false);
      setError("An error occurred while creating the issue. Please try again.");
    }
  };

  await delay(5000)
  return (
    <div className="max-w-xl mx-auto">
      <Heading as="h1" size="8" className="text-zinc-600 mb-5">Create a New Issue</Heading>
      {error && (
        <Callout.Root color="red" role="alert" className="mb-3">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" {...register("title")}>
          <TextField.Slot ></TextField.Slot>
        </TextField.Root>
        <ErrorMessage>
            {errors.title?.message}
        </ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>
            {errors.description?.message}
        </ErrorMessage>
        <Button disabled={isSubmitting}>Submit new issue {isSubmitting && <Spinner/>}</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
