"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { getFileUpload } from "@/lib/functions/getFileUpload";
import { usePathname, useRouter } from "next/navigation";
import { ResourceSchema } from "@/lib/validations";
import { createResourceAction } from "@/lib/actions/resource.action";
import { FormInput, TagInput, TextArea } from "../inputs";
import { Button } from "../ui/button";

interface Props {
  type?: "edit";
  currentUserId: string;
  resourceDetails?: string;
  communityId?: string;
}

const ResourceForm = ({
  type,
  currentUserId,
  resourceDetails,
  communityId,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const parsedResourceDetails =
    resourceDetails && JSON.parse(resourceDetails || "");
  const groupedTags = parsedResourceDetails?.tags.map((tag: any) => tag.name);

  const form = useForm<z.infer<typeof ResourceSchema>>({
    resolver: zodResolver(ResourceSchema),
    defaultValues: {
      title: parsedResourceDetails?.title || "",
      description: parsedResourceDetails?.description || "",
      websiteLink: parsedResourceDetails?.websiteLink || "",
      mediaFile: [],
      tags: groupedTags || [],
    },
  });

  async function onSubmit(values: z.infer<typeof ResourceSchema>) {
    console.log(values);

    let uploadedResourceURL = "";

    try {
      // uploading resource file
      if (values.mediaFile?.length !== 0) {
        const resourceUpload = await getFileUpload({
          file: values.mediaFile && values.mediaFile[0],
          fileType: "resource/pdf",
        });

        if (resourceUpload && resourceUpload.status === 200) {
          uploadedResourceURL = resourceUpload.res;
        }
      }

      if (type === "edit") {
        // await editResourceAction({
        //   postId: parsedResourceDetails._id,
        //   title: values.title,
        //   description: values.description,
        //   media: uploadedResourceURL || parsedResourceDetails.media,
        //   path: pathname,
        // });
      } else {
        await createResourceAction({
          title: values.title,
          description: values.description,
          media: uploadedResourceURL,
          tags: values.tags,
          websiteLink: values.websiteLink,
          author: JSON.parse(currentUserId),
          communityId: communityId || null,
          path: pathname,
        });
      }

      if (communityId) {
        router.push(`/community/${communityId}`);
      } else {
        router.push("/resources");
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
        <FormInput
          form={form}
          inputName="title"
          formLabel="Resource Title"
          formDescription="Title of the resource you want to share"
        />
        <TextArea
          maxLength={1000}
          form={form}
          inputName="description"
          formLabel="Resource Description"
          formDescription="Description of the resource you want to share"
        />
        <FormInput
          form={form}
          inputName="websiteLink"
          formLabel="Website Link"
          formDescription="Link to the resource website you want to share"
        />
        <TagInput
          form={form}
          type={type}
          formDescription="Add up to 5 tags to your resource by pressing enter"
        />
        <footer className="flex w-full flex-col items-center justify-center gap-4 pb-6">
          <Button
            type="submit"
            className="bg-primary-100_primary-500 w-full text-sm font-medium text-light-900"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>{type ? "Updating..." : "Sharing..."}</>
            ) : (
              <>{type ? "Edit Resource" : "Share Resource"}</>
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

export default ResourceForm;
