"use client";

import { useRef } from "react";
// import { usePathname, useRouter } from "next/navigation";
import { JobsSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
import { Dropdown, FormInput, TagInput, TextEditor } from "../inputs";
import {
  EMPLOYMENTTYPE_OPTIONS,
  SALARY_CURRENCY_OPTIONS,
  SALARY_PER_OPTIONS,
  WORKMODE_OPTIONS,
} from "@/constants";

interface Props {
  type?: string;
  mongoUserId: string;
  jobDetails?: string;
}

const JobForm = ({ type, mongoUserId, jobDetails }: Props) => {
  const editorRef = useRef(null);
  // const router = useRouter();
  // const pathname = usePathname();

  const parsedJobDetails = jobDetails && JSON.parse(jobDetails || "");

  const groupedTags = parsedJobDetails?.tags.map((tag: any) => tag.name);

  const form = useForm<z.infer<typeof JobsSchema>>({
    resolver: zodResolver(JobsSchema),
    defaultValues: {
      title: parsedJobDetails?.title || "",
      description: parsedJobDetails?.content || "",
      workMode: parsedJobDetails?.workMode || "",
      employmentType: parsedJobDetails?.employmentType || "",
      location: parsedJobDetails?.location || "",
      furtherDetailLink: parsedJobDetails?.furtherDetailLink || "",
      salary: parsedJobDetails?.salary || "",
      salaryPer: parsedJobDetails?.salaryPer || "",
      salaryCurrency: parsedJobDetails?.salaryCurrency || "",
      deadline: parsedJobDetails?.deadline || "",
      tags: groupedTags || [],
    },
  });

  async function onSubmit(values: z.infer<typeof JobsSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormInput
          form={form}
          inputName={"title"}
          formLabel={"Job Title"}
          formDescription={
            "Introduce the problem and expand on what you put in the title"
          }
        />

        <div className="flex-center gap-6">
          <Dropdown
            form={form}
            inputName={"workMode"}
            formLabel={"Work Mode"}
            options={WORKMODE_OPTIONS}
            formDescription={
              "Introduce the problem and expand on what you put in the title"
            }
          />

          <Dropdown
            form={form}
            inputName={"employmentType"}
            formLabel={"Employment Type"}
            options={EMPLOYMENTTYPE_OPTIONS}
            formDescription={
              "Introduce the problem and expand on what you put in the title"
            }
          />
        </div>

        <FormInput
          form={form}
          inputName={"location"}
          formLabel={"Location"}
          formDescription={
            "Introduce the problem and expand on what you put in the title"
          }
        />

        <FormInput
          form={form}
          inputName={"furtherDetailLink"}
          formLabel={"Further Detail Link"}
          formDescription={"Add a link to further details about the job."}
        />

        <TextEditor
          form={form}
          editorRef={editorRef}
          parsedDetails={parsedJobDetails}
          inputName={"description"}
          formLabel={"Job Description"}
          formDescription={
            "Introduce the problem and expand on what you put in the title"
          }
        />

        <div className="flex items-start gap-6">
          <FormInput
            form={form}
            inputName={"salary"}
            formLabel={"Salary Amount"}
            formDescription={
              "Introduce the problem and expand on what you put in the title"
            }
          />
          <Dropdown
            form={form}
            inputName={"salaryCurrency"}
            formLabel={"Currency"}
            options={SALARY_CURRENCY_OPTIONS}
            formDescription={
              "Introduce the problem and expand on what you put in the title"
            }
          />
          <Dropdown
            form={form}
            inputName={"salaryPer"}
            formLabel={"Salary Per"}
            options={SALARY_PER_OPTIONS}
            formDescription={
              "Introduce the problem and expand on what you put in the title"
            }
          />
        </div>

        <TagInput
          form={form}
          type={type}
          formDescription={
            "Add up to 5 tags to describe what your job is about. Start typing to see suggestions."
          }
        />
        <Button
          type="submit"
          className="bg-primary-100_primary-500 text-sm font-medium text-light-900"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>{type ? "Updating..." : "Posting..."}</>
          ) : (
            <>{type ? "Edit Job" : "Create Job"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;
