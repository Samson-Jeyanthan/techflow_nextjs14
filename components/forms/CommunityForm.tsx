"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { CommunitySchema } from "@/lib/validations";
import { CoverPhoto, FormInput, ProfilePhoto, TextArea } from "../inputs";
import { Button } from "../ui/button";
import { getSignedURL } from "@/lib/actions/utils.action";

type Props = {
  type?: string;
  mongoUserId: string;
  communityDetails?: string;
};

const CommunityForm = ({ type, mongoUserId, communityDetails }: Props) => {
  const parsedCommunityDetails =
    communityDetails && JSON.parse(communityDetails || "");

  const form = useForm<z.infer<typeof CommunitySchema>>({
    resolver: zodResolver(CommunitySchema),
    defaultValues: {
      communityName: parsedCommunityDetails?.communityName || "",
      bio: parsedCommunityDetails?.bio || "",
      profilePhoto: parsedCommunityDetails?.profilePhoto || "",
      coverPhoto: parsedCommunityDetails?.coverPhoto || "",
    },
  });

  async function onSubmit(values: z.infer<typeof CommunitySchema>) {
    console.log(values);

    const signedURLResult = await getSignedURL();
    console.log(signedURLResult);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="coverPhoto"
          render={({ field }) => <CoverPhoto fieldChange={field.onChange} />}
        />

        <FormField
          control={form.control}
          name="profilePhoto"
          render={({ field }) => <ProfilePhoto fieldChange={field.onChange} />}
        />

        <FormInput
          form={form}
          inputName={"communityName"}
          formLabel={"Community Name"}
          formDescription={
            "Introduce the problem and expand on what you put in the title"
          }
        />

        <TextArea
          form={form}
          inputName={"bio"}
          formLabel={"Bio"}
          formDescription={
            "Introduce the problem and expand on what you put in the title"
          }
          maxLength={120}
        />

        <Button
          type="submit"
          className="bg-primary-100_primary-500 text-sm font-medium text-light-900"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>{type ? "Updating..." : "Creating..."}</>
          ) : (
            <>{type ? "Edit Community Detail" : "Create Community"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CommunityForm;
