import { z } from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});

export const JobsSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(100),
  workMode: z.string().min(1),
  employmentType: z.string().min(1),
  location: z.string().min(1),
  furtherDetailLink: z.string(),
  salary: z.string(),
  salaryPer: z.string(),
  salaryCurrency: z.string(),
  deadline: z.string().min(1),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
