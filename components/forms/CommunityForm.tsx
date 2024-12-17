"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { CommunitySchema } from "@/lib/validations";
import { CoverPhoto, FormInput, ProfilePhoto, TextArea } from "../inputs";
import { Button } from "../ui/button";
import { getSignedURL } from "@/lib/actions/utils.action";
import { createCommunity } from "@/lib/actions/community.action";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  type?: string;
  mongoUserId: string;
  communityDetails?: string;
};

const CommunityForm = ({ type, mongoUserId, communityDetails }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const parsedCommunityDetails =
    communityDetails && JSON.parse(communityDetails || "");

  const form = useForm<z.infer<typeof CommunitySchema>>({
    resolver: zodResolver(CommunitySchema),
    defaultValues: {
      name: parsedCommunityDetails?.name || "",
      bio: parsedCommunityDetails?.bio || "",
      profilePhoto: parsedCommunityDetails?.profilePhoto || [],
      coverPhoto: parsedCommunityDetails?.coverPhoto || [],
    },
  });

  async function onSubmit(values: z.infer<typeof CommunitySchema>) {
    let profilePicURL = "";

    try {
      if (values.profilePhoto) {
        const signedURLResult = await getSignedURL({
          fileType: "image/jpeg",
        });
        console.log(signedURLResult);

        if (signedURLResult.failure !== undefined) {
          console.log(signedURLResult.failure);
          return;
        }

        const url = signedURLResult.success;

        const res = await fetch(url, {
          method: "PUT",
          body: values.profilePhoto[0],
          headers: {
            "Content-Type": "image/jpeg",
          },
        });

        if (res.ok) {
          profilePicURL = url.split("?")[0];
        }
      }

      await createCommunity({
        name: values.name,
        bio: values.bio,
        profilePhoto: profilePicURL,
        coverPhoto: "",
        createdBy: JSON.parse(mongoUserId),
        path: pathname,
      });

      router.push("/communities");
    } catch (error) {
      console.log(error);
    }
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
          render={({ field }) => (
            <ProfilePhoto
              fieldChange={field.onChange}
              defaultPic="/images/default-community-profile-pic.png"
            />
          )}
        />

        <FormInput
          form={form}
          inputName={"name"}
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
