"use client";

import { IoClose } from "react-icons/io5";
import { Badge } from "../ui/badge";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import React from "react";

const TagInput = ({ form, type, formDescription }: any) => {
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

  return (
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
                  {field.value.map((tag: any, index: number) => (
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
            {formDescription}
          </FormDescription>
          <FormMessage className="text-xs text-custom-red" />
        </FormItem>
      )}
    />
  );
};

export default TagInput;
