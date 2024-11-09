"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TDropdownProps = {
  form: any;
  formLabel?: string;
  inputName: string;
  options: { _id: string; name: string }[];
  formDescription?: string;
};

const Dropdown = ({
  form,
  formLabel,
  inputName,
  options,
  formDescription,
}: TDropdownProps) => {
  return (
    <FormField
      control={form.control}
      name={inputName}
      render={({ field }) => (
        <FormItem className="w-full pb-2">
          <FormLabel className="text-dark-100_light-850">{formLabel}</FormLabel>
          <FormControl className="no-focus">
            <Select onValueChange={(_id: string) => field.onChange(_id)}>
              <SelectTrigger className="no-focus text-dark-100_light-850 border border-solid border-light-750 bg-light-800 text-sm dark:border-dark-350 dark:bg-dark-250">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="no-focus text-dark-100_light-850 border border-solid border-light-750 bg-light-800 text-sm dark:border-dark-350 dark:bg-dark-250 ">
                {options?.map((option, index) => (
                  <SelectItem
                    key={index}
                    value={option?._id}
                    className="cursor-pointer hover:bg-light-500 hover:dark:bg-dark-350"
                  >
                    {option?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export default Dropdown;
