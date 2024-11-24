"use server";

import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import Job from "@/database/job.model";
import { revalidatePath } from "next/cache";
import { TCreateJobParams } from "./shared.types";

export async function createJobAction(params: TCreateJobParams) {
  try {
    connectToDatabase();

    const {
      title,
      description,
      workMode,
      employmentType,
      furtherDetailLink,
      salaryPer,
      salaryCurrency,
      salary,
      location,
      deadline,
      author,
      tags,
      path,
    } = params;

    const job = await Job.create({
      title,
      description,
      workMode,
      employmentType,
      furtherDetailLink,
      salaryPer,
      salaryCurrency,
      salary,
      location,
      deadline,
      author,
    });

    const tagDocuments = [];

    // create the tags in db or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, // try to find an existing tag
        {
          $setOnInsert: { name: tag }, // if no tag is found, it creates a new one
          $push: { jobs: job._id },
        },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Job.findByIdAndUpdate(job._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // TODO: create an interaction record for the user's create-job action

    // TODO: increment author's reputation

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
