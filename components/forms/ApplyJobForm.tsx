"use client";

import { useForm } from "react-hook-form";
import { FormInput, ResumeInput } from "../inputs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { ApplicationSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { getFileUpload } from "@/lib/functions/getFileUpload";
import { applyApplicationAction } from "@/lib/actions/job.action";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  userDetails: any;
  jobId: string;
  setModalOpen: (e: boolean) => void;
};

const ApplyJobForm = ({ userDetails, jobId, setModalOpen }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const parsedUserDetails = userDetails && JSON.parse(userDetails || "");

  const [urlSelected, setUrlSelected] = useState<boolean>(
    parsedUserDetails?.cvResume?.url || false
  );

  const form = useForm<z.infer<typeof ApplicationSchema>>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      name: parsedUserDetails?.name || "",
      email: parsedUserDetails?.email || "",
      resumeFile: [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof ApplicationSchema>) => {
    console.log(values);

    let uploadedCVResumeURL = "";

    try {
      // uploading resume file
      if (values.resumeFile.length !== 0 && urlSelected === false) {
        const resumeUpload = await getFileUpload({
          file: values.resumeFile[0],
          fileType: "application/pdf",
        });

        if (resumeUpload && resumeUpload.status === 200) {
          uploadedCVResumeURL = resumeUpload.res;
        }
      }

      // finalizing the cv resume - previously uploaded or not
      const selectedCVResume = {
        url: urlSelected
          ? parsedUserDetails?.cvResume?.url
          : uploadedCVResumeURL,
        name: urlSelected
          ? parsedUserDetails?.cvResume?.name
          : values.resumeFile[0].name,
      };

      // application form submission
      await applyApplicationAction({
        jobId,
        userId: parsedUserDetails?._id,
        name: values.name,
        email: values.email,
        path: pathname,
        resume: selectedCVResume,
        coverLetter: "",
      });

      setModalOpen(false);
      router.push(`/job/${jobId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex size-full flex-col gap-10 overflow-auto"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex w-full items-end gap-8">
          <FormField
            control={form.control}
            name="resumeFile"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="text-dark-100_light-850 mb-1.5">
                  Select CV Resume
                </FormLabel>
                <FormControl>
                  <ResumeInput
                    fieldChange={field.onChange}
                    urlSelected={urlSelected}
                    setUrlSelected={setUrlSelected}
                  />
                </FormControl>
                <FormMessage className="text-xs text-custom-red" />
              </FormItem>
            )}
          />

          {parsedUserDetails?.cvResume?.url && (
            <div
              className={`${urlSelected ? "border-primary-500" : "border-light-750 dark:border-dark-350"} flex-center h-44 w-full cursor-pointer gap-2 rounded-xl border`}
              onClick={() => setUrlSelected(true)}
            >
              <Image
                src="/images/pdf-blue.png"
                alt="resume"
                width={1024}
                height={1024}
                className="size-16 min-w-16 rounded-lg object-cover"
              />
              <p className="text-dark-200_light-700 line-clamp-1 flex flex-col items-start gap-0 text-left text-sm first-letter:capitalize">
                {parsedUserDetails?.cvResume?.name}
                <span className="text-xs">Last used cv resume</span>
              </p>
            </div>
          )}
        </div>

        <FormInput
          form={form}
          inputName="name"
          formLabel="Full Name"
          formDescription="Enter your full name as it appears on your resume"
        />

        <FormInput
          form={form}
          inputName="email"
          formLabel="Email Address"
          formDescription="Entered email will be used to contact you about the job"
        />

        <Button
          className="bg-primary-100_primary-500 w-fit self-end text-sm font-medium text-light-900"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Applying..." : "Apply"}
        </Button>
      </form>
    </Form>
  );
};

export default ApplyJobForm;
