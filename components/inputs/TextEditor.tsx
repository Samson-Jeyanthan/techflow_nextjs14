"use client";

import { Editor } from "@tinymce/tinymce-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useTheme } from "@/context/ThemeProvider";

const TextEditor = ({
  form,
  editorRef,
  parsedDetails,
  inputName,
  formLabel,
  formDescription,
}: any) => {
  const { mode } = useTheme();

  return (
    <FormField
      control={form.control}
      name={inputName}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          {formLabel && (
            <FormLabel className="text-dark-100_light-850">
              {formLabel}
            </FormLabel>
          )}
          <FormControl className="mt-3.5">
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
              onInit={(evt, editor) =>
                // @ts-ignore
                (editorRef.current = editor)
              }
              onBlur={field.onBlur} // save the value on the exit
              onEditorChange={(content) => field.onChange(content)}
              initialValue={parsedDetails?.content || ""}
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
                content_style: "body { font-family:Poppins; font-size:16px }",
                skin: mode === "dark" ? "oxide-dark" : "oxide",
                content_css: mode === "dark" ? "dark" : "light",
              }}
            />
          </FormControl>
          {formDescription && (
            <FormDescription className="mt-2.5 text-xs text-light-500">
              {formDescription}
            </FormDescription>
          )}
          <FormMessage className="text-xs text-custom-red" />
        </FormItem>
      )}
    />
  );
};

export default TextEditor;
