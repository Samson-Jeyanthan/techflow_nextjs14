"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PostSchema } from "@/lib/validations";
import { Input } from "../ui/input";
import { useTheme } from "@/context/ThemeProvider";
import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useMedia } from "@/hooks/useMedia";
import { PostPhotoInput } from "../inputs";

interface Props {
  type?: string;
  currentUserId: string;
  postDetails?: string;
}

const CreatePostForm = ({ type, currentUserId, postDetails }: Props) => {
  const { mode } = useTheme();
  const editorRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const { handleImageInput, media, resetMedia } = useMedia();
  const parsedPostDetails = postDetails && JSON.parse(postDetails || "");

  const groupedTags = parsedPostDetails?.tags.map((tag: any) => tag.name);

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      description: "",
      postImage: [],
      tags: groupedTags || [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tags must be less than 15 characters",
          });
        }

        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        } else {
          form.trigger();
        }
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  async function onSubmit(values: z.infer<typeof PostSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="postImage"
          render={({ field }) => (
            <PostPhotoInput
              fieldChange={field.onChange}
              handleImageInput={handleImageInput}
              media={media}
              resetMedia={resetMedia}
            />
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-dark-100_light-850">
                Post Title
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus text-dark-100_light-850 border border-solid border-light-750 bg-light-800 text-sm dark:border-dark-350 dark:bg-dark-250"
                />
              </FormControl>
              <FormDescription className="mt-2.5 text-xs text-light-500">
                Be specific and express your creativity you’re creating a post
                to public
              </FormDescription>
              <FormMessage className="text-xs text-custom-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-dark-100_light-850">
                Description of your post
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(evt, editor) =>
                    // @ts-ignore
                    (editorRef.current = editor)
                  }
                  onBlur={field.onBlur} // save the value on the exit
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={parsedPostDetails?.content || ""}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | " +
                      "codesample | bold italic forecolor | alignleft aligncenter |" +
                      "alignright alignjustify | bullist numlist",
                    content_style:
                      "body { font-family:Poppins; font-size:16px }",
                    skin: mode === "dark" ? "oxide-dark" : "oxide",
                    content_css: mode === "dark" ? "dark" : "light",
                  }}
                />
              </FormControl>
              <FormDescription className="mt-2.5 text-xs text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-xs text-custom-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-dark-100_light-850">Tags</FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    disabled={type === "Edit"}
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    className="no-focus text-dark-100_light-850 border border-solid border-light-750 bg-light-800 text-sm dark:border-dark-350 dark:bg-dark-250"
                  />

                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag, index) => (
                        <Badge
                          key={index}
                          className="flex items-center gap-2 rounded-md border-none bg-light-750 px-4 py-2 text-xs text-primary-500 dark:bg-dark-250 dark:text-primary-500/80"
                        >
                          {tag}
                          {type !== "Edit" && (
                            <span
                              className="cursor-pointer text-sm"
                              onClick={() =>
                                type !== "Edit"
                                  ? handleTagRemove(tag, field)
                                  : () => {}
                              }
                            >
                              <IoClose />
                            </span>
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="mt-2.5 text-xs text-light-500">
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </FormDescription>
              <FormMessage className="text-xs text-custom-red" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-primary-100_primary-500 text-sm font-medium text-light-900"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>{type ? "Updating..." : "Posting..."}</>
          ) : (
            <>{type ? "Edit Post" : "Create Post"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePostForm;
