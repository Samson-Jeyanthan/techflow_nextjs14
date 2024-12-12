"use client";

import { useMedia } from "@/lib/hooks/useMedia";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

type Props = {
  fieldChange: (e: any) => void;
};

const ResumeInput = ({ fieldChange }: Props) => {
  const resumeRef = useRef<HTMLInputElement>(null);
  const { handlePDFInput, error, media, resetMedia } = useMedia();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handlePDFInput({ e, acceptFileType: ["application/pdf"] });
  };

  useEffect(() => {
    console.log(media, error);
    if (error === "") {
      fieldChange([media.data]);
      console.log(media, error);
    }
  }, [media, error, fieldChange]);

  const handleReset = () => {
    resetMedia();
  };
  return (
    <div>
      <h2 className="text-dark-100_light-850 mb-2 text-sm font-medium">
        CV Resume
      </h2>
      <input
        type="file"
        ref={resumeRef}
        hidden
        onChange={handleInputChange}
        accept="application/pdf"
      />
      {media.preview ? (
        <div className="flex-center h-44 w-full gap-4 rounded-lg border border-light-750 dark:border-dark-350">
          <div className="flex items-center gap-4">
            <Image
              src="/images/pdf.png"
              alt="resume"
              width={1024}
              height={1024}
              className="size-16 min-w-16 rounded-lg object-cover"
            />
            <p className="text-dark-200_light-700 text-sm">{media.fileName}</p>
            <span
              className="flex-center hover:text-dark-100_light-900 cursor-pointer rounded-full border border-light-500 p-1 text-light-500"
              onClick={handleReset}
            >
              <MdClose className="text-base" />
            </span>
          </div>
        </div>
      ) : (
        <div
          className="text-dark-300_light-750 flex-center h-44 w-full cursor-pointer gap-2 rounded-lg border border-dashed border-light-500 bg-transparent text-sm dark:border-dark-500"
          onClick={() => resumeRef.current?.click()}
        >
          Upload CV Resume
        </div>
      )}
      {error && <p className="mt-2 text-xs text-custom-red">{error}</p>}
    </div>
  );
};

export default ResumeInput;
