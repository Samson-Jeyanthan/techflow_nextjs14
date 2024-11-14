"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const HomePostForm = ({ avatar, userId }: any) => {
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  return (
    <Form {...form}>
      <form className="flex w-4/6 items-start justify-between gap-6 rounded-2xl bg-light-900 p-4 shadow-md dark:bg-dark-200">
        <Image
          src={avatar}
          alt="profile picture"
          width={120}
          height={120}
          className="mt-1 size-10 rounded-full border object-cover"
        />
        <div className="flex w-full flex-col justify-start gap-6">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col pt-[3px]">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="What's on your mind?"
                    className="no-focus text-dark-100_light-850 bg-light-800_dark-250 rounded-lg border-none text-sm placeholder:text-light-500 dark:border-dark-350 placeholder:dark:text-dark-500"
                  />
                </FormControl>
                <FormMessage className="text-xs text-custom-red" />
              </FormItem>
            )}
          />

          <div className="flex w-full items-center justify-between border-t border-light-750 pt-6 dark:border-dark-350">
            <Button className="w-max bg-none text-light-900">Image</Button>
            <Button className="w-20 bg-primary-500 text-light-900">Post</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default HomePostForm;
