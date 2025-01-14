"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { HomePostSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { HomePostPhoto } from "../inputs";
import { createPostAction } from "@/lib/actions/post.action";
import { getSignedURL } from "@/lib/actions/utils.action";
import { useRouter } from "next/navigation";
import { useMedia } from "@/lib/hooks/useMedia";

const HomePostForm = ({ avatar, mongoUserId }: any) => {
  const router = useRouter();
  const { handleImageInput, media, resetMedia } = useMedia();
  const form = useForm<z.infer<typeof HomePostSchema>>({
    resolver: zodResolver(HomePostSchema),
    defaultValues: {
      description: "",
      postImage: [],
    },
  });

  async function onSubmit(values: z.infer<typeof HomePostSchema>) {
    let postImageURL = "";

    try {
      if (values.postImage && values.postImage.length > 0) {
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
          body: values.postImage[0],
          headers: {
            "Content-Type": "image/jpeg",
          },
        });

        if (res.ok) {
          postImageURL = url.split("?")[0];
        }
      }

      await createPostAction({
        description: values.description,
        media: [
          {
            mediaType: "image",
            mediaURL: postImageURL,
            thumbnailURL: "",
          },
        ],
        author: JSON.parse(mongoUserId),
        path: "/",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      resetMedia();
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-4/6 items-start justify-between gap-6 rounded-2xl bg-light-900 p-4 shadow-md dark:bg-dark-250"
      >
        <Image
          src={avatar}
          alt="profile picture"
          width={120}
          height={120}
          className="mt-1 size-10 rounded-full border object-cover"
        />

        <div className="flex w-full flex-col justify-start gap-3">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col pt-[3px]">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="What's on your mind?"
                    className="no-focus text-dark-100_light-850 bg-light-800_dark-300 rounded-lg border-none text-sm placeholder:text-light-500 dark:border-dark-350 placeholder:dark:text-dark-500"
                  />
                </FormControl>
                <FormMessage className="text-xs text-custom-red" />
              </FormItem>
            )}
          />

          <div className="flex w-full items-center justify-between border-t border-light-750 pt-6 dark:border-dark-350">
            <FormField
              control={form.control}
              name="postImage"
              render={({ field }) => (
                <HomePostPhoto
                  fieldChange={field.onChange}
                  handleImageInput={handleImageInput}
                  media={media}
                  resetMedia={resetMedia}
                />
              )}
            />

            <Button
              className="w-20 bg-primary-500 text-light-900"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default HomePostForm;
