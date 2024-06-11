"use client";

import { TextField, Button } from "@radix-ui/themes";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface Issue {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<Issue>();
  const router = useRouter();

  const onSubmit = async (data : any) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };

  return (
    <form
      className="max-w-xl space-y-3 m-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField.Root placeholder="Title" {...register("title")}>
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <Button>Submit new issue</Button>
    </form>
  );
};

export default NewIssuePage;
