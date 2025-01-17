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
  furtherDetailLink: z.string().optional(),
  salary: z.number().optional(),
  salaryPer: z.string().optional(),
  salaryCurrency: z.string().optional(),
  deadline: z.date().min(new Date()),
  tags: z.array(z.string().min(1).max(20)).min(1).max(5),
});

export const CommunitySchema = z.object({
  name: z.string().min(5).max(40),
  bio: z.string().min(5).max(120),
  profilePhoto: z.custom<File[]>().optional(),
  coverPhoto: z.custom<File[]>().optional(),
});

export const HomePostSchema = z.object({
  description: z.string().min(5).max(160),
  postImage: z.custom<File[]>().optional(),
});

export const MediaFileSchema = z.object({
  data: z.custom<File[]>(),
  preview: z.string().url(),
  fileType: z.string(),
  fileName: z.string(),
  mediaType: z.string(),
});

export const PostSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(5).max(1000),
  mediaFiles: z.array(MediaFileSchema),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
});

export const ApplicationSchema = z.object({
  name: z.string().min(5).max(40),
  email: z.string().email(),
  resumeFile: z.custom<File[]>().optional(),
  // .refine(
  //   (files) => Array.isArray(files) && files.length > 0,
  //   "Resume file is required"
  // ),
});

export const ResourceSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(5).max(1000),
  mediaFile: z.array(MediaFileSchema).optional(),
  websiteLink: z.string().url().optional(),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
});
