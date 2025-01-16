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

export async function editJobAction(params: any) {
  try {
    connectToDatabase();

    const {
      jobId,
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
      path,
    } = params;

    console.log(params);

    const job = await Job.findById(jobId).populate("tags");

    if (!job) {
      throw new Error("Job not found");
    }

    job.title = title;
    job.description = description;
    job.workMode = workMode;
    job.employmentType = employmentType;
    job.furtherDetailLink = furtherDetailLink;
    job.salaryPer = salaryPer;
    job.salaryCurrency = salaryCurrency;
    job.salary = salary;
    job.location = location;
    job.deadline = deadline;

    await job.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
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

export async function getAllApplicationsAction(params: any) {
  try {
    connectToDatabase();

    const { jobId, sortBy } = params;

    let sortOptions = {};
    let filterOptions: any = { jobId }; // Default filter is by jobId

    switch (sortBy) {
      case "newest":
        sortOptions = { appliedOn: -1 };
        break;
      case "old":
        sortOptions = { appliedOn: 1 };
        break;
      case "pending":
        filterOptions.status = "pending";
        break;
      case "reviewed":
        filterOptions.status = "reviewed";
        break;
      case "accepted":
        filterOptions.status = "accepted";
        break;
      case "rejected":
        filterOptions.status = "rejected";
        break;
      default:
        break;
    }

    const applications = await Application.find(filterOptions)
      .populate("applicant", "_id clerkId name username avatar")
      .sort(sortOptions);

    return { applications };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function setApplicationStatusAction(params: any) {
  try {
    connectToDatabase();

    const { applicationId, status, path } = params;

    console.log(params);

    await Application.findByIdAndUpdate(applicationId, {
      $set: { status },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
