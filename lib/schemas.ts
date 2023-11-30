// schemas.ts

import { z, ZodError } from 'zod';

export const formSchema = z.object({
  image: z.string().url({ message: "Invalid url" }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  roles: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one role.",
  }),
  roleType: z.enum(["Full-time", "Part-time"], {
    required_error: "You need to select a notification type.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  createdBy: z.string().min(2, {
    message: "createdBy must be at least 2 characters.",
  }),
  createdAt: z.date(),
  usersApplied: z.string().array()
});
