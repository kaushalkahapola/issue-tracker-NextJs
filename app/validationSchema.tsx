import { z } from "zod";


export const issueSchema = z.object({
    title: z.string().min(3, 'Title must contain at least 3 letters').max(255),
    description: z.string().min(3, 'Description must contain at least 3 letters'),
  });

export const PatchIssueSchema = z.object({
    title: z.string().min(3, 'Title must contain at least 3 letters').max(255).optional(),
    description: z.string().min(3, 'Description must contain at least 3 letters').max(65500).optional(),
    assignedUserId: z.string().min(1, 'Assigned User Id is Required').max(255).optional().nullable(),
  });