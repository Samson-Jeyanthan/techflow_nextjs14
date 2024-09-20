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
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { QuestionsSchema } from "@/lib/validations";

const QuestionForm = () => {
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  function onSubmit(values: z.infer<typeof QuestionsSchema>) {
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
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-dark-100_light-850">
                Question Title
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus text-dark-100_light-850 border border-solid border-light-750 bg-light-800 text-sm dark:border-dark-350 dark:bg-dark-250"
                />
              </FormControl>
              <FormDescription className="mt-2.5 text-xs text-light-500">
                This is your public display name.
              </FormDescription>
              <FormMessage className="text-xs text-custom-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="text-dark-100_light-850">
                Question Title
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus text-dark-100_light-850 border border-solid border-light-750 bg-light-800 text-sm dark:border-dark-350 dark:bg-dark-250"
                />
              </FormControl>
              <FormDescription className="mt-2.5 text-xs text-light-500">
                This is your public display name.
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
              <FormLabel className="text-dark-100_light-850">
                Question Title
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  className="no-focus text-dark-100_light-850 border border-solid border-light-750 bg-light-800 text-sm dark:border-dark-350 dark:bg-dark-250"
                />
              </FormControl>
              <FormDescription className="mt-2.5 text-xs text-light-500">
                This is your public display name.
              </FormDescription>
              <FormMessage className="text-xs text-custom-red" />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
