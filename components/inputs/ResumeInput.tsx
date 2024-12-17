"use client";

import { useMedia } from "@/lib/hooks/useMedia";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

type Props = {
  fieldChange: (e: any) => void;
  urlSelected: boolean;
  setUrlSelected: (e: boolean) => void;
};

const ResumeInput = ({ fieldChange, urlSelected, setUrlSelected }: Props) => {
  const resumeRef = useRef<HTMLInputElement>(null);
  const { handlePDFInput, error, media, resetMedia } = useMedia();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handlePDFInput({ e, acceptFileType: ["application/pdf"] });
    setUrlSelected(false);
  };

  useEffect(() => {
    if (error === "" && media.data) {
      fieldChange([media.data]);
    }
  }, [media, error, fieldChange]);

  return (
    <div>
      <input
        type="file"
        ref={resumeRef}
        hidden
        onChange={handleInputChange}
        accept="application/pdf"
      />
      {media.preview ? (
        <div
          className={`${urlSelected ? "border-light-750 dark:border-dark-350" : "border-primary-500"} flex-center z-0 h-44 w-full cursor-pointer gap-3 rounded-xl border `}
          onClick={() => setUrlSelected(false)}
        >
          <Image
            src="/images/pdf.png"
            alt="resume"
            width={1024}
            height={1024}
            className="size-16 min-w-16 rounded-lg object-cover"
          />
          <p className="text-dark-200_light-700 line-clamp-2 text-left text-sm">
            {media.fileName}
          </p>
          <span
            className="flex-center hover:text-dark-100_light-900 z-10 cursor-pointer rounded-full border border-light-500 p-1 text-light-500"
            onClick={resetMedia}
          >
            <MdClose className="text-base" />
          </span>
        </div>
      ) : (
        <div
          className="text-dark-300_light-750 flex-center h-44 w-full cursor-pointer gap-2 rounded-lg border border-light-750 bg-transparent text-sm dark:border-dark-350"
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
