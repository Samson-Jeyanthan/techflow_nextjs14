"use client";

import { useForm } from "react-hook-form";
import { FormInput } from "../inputs";
import { Form } from "../ui/form";
import { z } from "zod";
import { ApplicationSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

interface Props {
  applicationDetails?: string;
}

const ApplyJobForm = ({ applicationDetails }: Props) => {
  const [urlSelected, setUrlSelected] = useState<boolean>(false);

  const parsedJobDetails =
    applicationDetails && JSON.parse(applicationDetails || "");

  const form = useForm<z.infer<typeof ApplicationSchema>>({
    resolver: zodResolver(ApplicationSchema),
    defaultValues: {
      email: parsedJobDetails?.email || "",
      resumeUrl: parsedJobDetails?.content || "",
      coverLetter: parsedJobDetails?.coverLetter || "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex w-full flex-col gap-10">
        <FormInput
          form={form}
          inputName="email"
          formLabel="Email Address"
          formDescription="entered email will be used to contact you about the job"
        />
      </form>
    </Form>
  );
};

export default ApplyJobForm;
