"use server";

import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import Job from "@/database/job.model";
import { revalidatePath } from "next/cache";
import { TCreateJobParams } from "./shared.types";
import User from "@/database/user.model";
import Application from "@/database/application.model";

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

export async function getAllJobsAction(params: any) {
  try {
    connectToDatabase();

    const jobs = await Job.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "applications",
        model: Application,
      });

    return { jobs };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getJobByIdAction(params: { jobId: string }) {
  try {
    connectToDatabase();

    const { jobId } = params;

    const job = await Job.findById(jobId)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name username avatar",
      })
      .populate({
        path: "applications",
        model: Application,
      });

    return job;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteJobAction(params: any) {
  try {
    connectToDatabase();

    const { jobId, path } = params;

    await Job.deleteOne({ _id: jobId });
    await Tag.updateMany({ jobs: jobId }, { $pull: { jobs: jobId } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function applyApplicationAction(params: any) {
  try {
    connectToDatabase();

    const { jobId, userId, name, email, resume, coverLetter, path } = params;

    const application = await Application.create({
      jobId,
      applicant: userId,
      applicantName: name,
      applicantEmail: email,
      resume,
      coverLetter,
    });

    // update user's latest cvResume
    await User.findByIdAndUpdate(userId, {
      $set: {
        cvResume: {
          url: resume.url,
          name: resume.name,
        },
      },
    });

    // add applicaiton to the job's applications array
    await Job.findByIdAndUpdate(jobId, {
      $push: { applications: application._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
