import { z } from "zod";


export const issueSchema = z.object({
    title: z.string().min(3, 'Title must contain at least 3 letters').max(255),
    description: z.string().min(3, 'Description must contain at least 3 letters'),
  });