"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

const TextArea = ({
  form,
  inputName,
  formLabel,
  formDescription,
  maxLength,
}: any) => {
  return (
    <FormField
      control={form.control}
      name={inputName}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col pt-[3px]">
          <FormLabel className="text-dark-100_light-850 mb-1.5">
            {formLabel}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              className="no-focus text-dark-100_light-850 h-24 resize-none border border-solid border-light-750 bg-light-800 text-sm dark:border-dark-350 dark:bg-dark-250"
              maxLength={maxLength}
            />
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

export default TextArea;
