"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const FormInput = ({
  form,
  inputName,
  inputType,
  formLabel,
  formDescription,
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
            <Input
              type={inputType || "text"}
              {...field}
              onChange={(e) =>
                field.onChange(
                  inputType === "number"
                    ? Number(e.target.value)
                    : e.target.value
                )
              }
              className="no-focus text-dark-100_light-850 bg-light-800_dark-250 border border-solid border-light-750 text-sm placeholder:text-light-500 dark:border-dark-350 placeholder:dark:text-dark-500"
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

export default FormInput;
