"use client";

import { useForm } from "react-hook-form";
import { FormInput, ResumeInput } from "../inputs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { ApplicationSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "../ui/button";

const ApplyJobForm = ({ userDetails }: any) => {
  const [urlSelected, setUrlSelected] = useState<boolean>(false);

  const parsedUserDetails = userDetails && JSON.parse(userDetails || "");

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
  };

  return (
    <Form {...form}>
      <form
        className="flex size-full flex-col gap-10 overflow-auto"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="">
          <FormField
            control={form.control}
            name="resumeFile"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormControl>
                  <ResumeInput fieldChange={field.onChange} />
                </FormControl>
                <FormMessage className="text-xs text-custom-red" />
              </FormItem>
            )}
          />
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
