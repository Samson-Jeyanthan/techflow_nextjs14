import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { format } from "date-fns";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

const CalendarInput = ({
  form,
  inputName,
  formLabel,
  formDescription,
}: any) => {
  return (
    <FormField
      control={form.control}
      name={inputName}
      render={({ field }) => (
        <FormItem className="flex w-[32%] flex-col pt-[3px]">
          <FormLabel className="text-dark-100_light-850 mb-1.5">
            {formLabel}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "no-focus text-dark-100_light-850 bg-light-800_dark-250 border border-solid border-light-750 text-sm placeholder: dark:border-dark-350",
                    !field.value && "text-light-500 dark:text-dark-500"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto size-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full border-none p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className="bg-light-800_dark-250 text-dark-100_light-850 w-full rounded-lg border border-solid border-light-750 dark:border-dark-350"
              />
            </PopoverContent>
          </Popover>

          <FormDescription className="mt-2.5 text-xs text-light-500">
            {formDescription}
          </FormDescription>
          <FormMessage className="text-xs text-custom-red" />
        </FormItem>
      )}
    />
  );
};

export default CalendarInput;
