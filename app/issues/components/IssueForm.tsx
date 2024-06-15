'use client'

import ErrorMessage from "@/app/components/ErrorMessage"
import { issueSchema } from "@/app/validationSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Button, Callout, Spinner, TextField } from "@radix-ui/themes"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css";
import { z } from "zod"


type Issue = z.infer<typeof issueSchema>;

interface Props {
    onSubmit: (
        data: Issue,
        setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
        setError: React.Dispatch<React.SetStateAction<string>>
      ) => Promise<void>;
    issue? : Issue | null;
}

const IssueForm = ( {onSubmit, issue} : Props ) => {

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<Issue>({
        resolver: zodResolver(issueSchema),
      });

      const [error, setError] = useState("");
      const [isSubmitting, setIsSubmitting] = useState(false);

      const submitFunc = async (data : Issue) => {
        await onSubmit(data, setIsSubmitting, setError);
      };

  return (
    <>
    {error && (
        <Callout.Root color="red" role="alert" className="mb-3">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    <form className="space-y-3" onSubmit={handleSubmit(submitFunc)}>
        <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register("title")}>
          <TextField.Slot ></TextField.Slot>
        </TextField.Root>
        <ErrorMessage>
            {errors.title?.message}
        </ErrorMessage>
        <Controller
          name="description"
          control={control}
          // defaultValue={issue?.description ?? ''}
          render={({ field }) => (
            <SimpleMDE placeholder="Description"  value={issue?.description} onChange={(value) => field.onChange(value)} />
          )}
        />
        <ErrorMessage>
            {errors.description?.message}
        </ErrorMessage>
        <Button disabled={isSubmitting}>{issue ? 'Update issue' : 'Submit new issue' }{isSubmitting && <Spinner/>}</Button>
      </form>
      </>
  )
}

export default IssueForm