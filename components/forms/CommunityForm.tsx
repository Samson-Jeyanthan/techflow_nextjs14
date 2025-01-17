"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { CommunitySchema } from "@/lib/validations";
import { CoverPhoto, FormInput, ProfilePhoto, TextArea } from "../inputs";
import { Button } from "../ui/button";
import { getSignedURL } from "@/lib/actions/utils.action";
import {
  createCommunity,
  editCommunityAction,
} from "@/lib/actions/community.action";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  type?: "edit";
  mongoUserId: string;
  communityDetails?: string;
};

const CommunityForm = ({ type, mongoUserId, communityDetails }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const parsedCommunityDetails =
    communityDetails && JSON.parse(communityDetails || "");

  console.log(parsedCommunityDetails);

  const form = useForm<z.infer<typeof CommunitySchema>>({
    resolver: zodResolver(CommunitySchema),
    defaultValues: {
      name: parsedCommunityDetails?.name || "",
      bio: parsedCommunityDetails?.bio || "",
      profilePhoto: [],
      coverPhoto: [],
    },
  });

  async function onSubmit(values: z.infer<typeof CommunitySchema>) {
    let profilePicURL = "";
    let coverPicURL = "";

    console.log(values.coverPhoto, values.profilePhoto);

    try {
      if (values.profilePhoto?.length !== 0) {
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
          body: values.profilePhoto && values.profilePhoto[0],
          headers: {
            "Content-Type": "image/jpeg",
          },
        });

        if (res.ok) {
          profilePicURL = url.split("?")[0];
        }
      }

      if (values.coverPhoto?.length !== 0) {
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
          body: values.coverPhoto && values.coverPhoto[0],
          headers: {
            "Content-Type": "image/jpeg",
          },
        });

        if (res.ok) {
          coverPicURL = url.split("?")[0];
        }
      }

      if (type === "edit") {
        await editCommunityAction({
          communityId: parsedCommunityDetails?._id,
          name: values.name,
          bio: values.bio,
          profilePhoto: profilePicURL || parsedCommunityDetails?.profilePhoto,
          coverPhoto: coverPicURL || parsedCommunityDetails?.coverPhoto,
          path: pathname,
        });
      } else {
        await createCommunity({
          name: values.name,
          bio: values.bio,
          profilePhoto: profilePicURL || "",
          coverPhoto: coverPicURL || "",
          createdBy: JSON.parse(mongoUserId),
          path: pathname,
        });
      }

      if (type === "edit") {
        router.push(`/community/${parsedCommunityDetails?._id}`);
      } else {
        router.push("/communities");
      }
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
          render={({ field }) => (
            <CoverPhoto
              fieldChange={field.onChange}
              mediaUrl={parsedCommunityDetails?.coverPhoto}
            />
          )}
        />

        <FormField
          control={form.control}
          name="profilePhoto"
          render={({ field }) => (
            <ProfilePhoto
              fieldChange={field.onChange}
              mediaUrl={parsedCommunityDetails?.profilePhoto}
              defaultPic="/images/default-community-profile-pic.png"
            />
          )}
        />

        <FormInput
          form={form}
          inputName="name"
          formLabel="Community Name"
          formDescription={
            "Enter a name for your community. This will be visible to your members."
          }
        />

        <TextArea
          form={form}
          inputName="bio"
          formLabel="Bio"
          formDescription={
            "Write a short description for your community. This will be visible to your members."
          }
          maxLength={120}
        />

        <footer className="flex w-full flex-col items-center justify-center gap-4 pt-6">
          <Button
            type="submit"
            className="bg-primary-100_primary-500 w-full text-sm font-medium text-light-900"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>{type ? "Updating..." : "Creating..."}</>
            ) : (
              <>{type ? "Edit Community Details" : "Create Community"}</>
            )}
          </Button>

          <Button
            onClick={() => router.back()}
            className="text-dark-100_light-850 w-max border-0 bg-transparent hover:text-primary-100"
          >
            Cancel
          </Button>
        </footer>
      </form>
    </Form>
  );
};

export default CommunityForm;
