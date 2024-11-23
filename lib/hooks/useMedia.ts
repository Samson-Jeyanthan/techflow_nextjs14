"use client";

import { ChangeEvent, useState } from "react";

export type TMedia = {
  data: File | null;
  preview: string;
  fileType: string | null;
  fileName: string | null;
  mediaType?: string;
};

export const defaultMediaState: TMedia = {
  data: null,
  preview: "",
  fileType: null,
  fileName: null,
  mediaType: "",
};

type InputProps = {
  e: ChangeEvent<HTMLInputElement>;
  isMultiple: boolean;
  acceptFileType: string[];
  filesLimit?: number;
};

export function useMedia() {
  const [error, setError] = useState("");
  const [media, setMedia] = useState<TMedia>(defaultMediaState);
  const [multipleMedia, setMultipleMedia] = useState<TMedia[]>([]);

  const resetMedia = () => {
    setMedia(defaultMediaState);
    setMultipleMedia([]);
  };

  const handleImageInput = ({
    e,
    isMultiple,
    acceptFileType,
    filesLimit,
  }: InputProps) => {
    // Convert FileList to Array
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate the number of files
    if (filesLimit && files.length > filesLimit) {
      setError(`Your file selection limit is ${filesLimit}.`);
      return;
    }

    // Validate file types
    const invalidFiles = files.filter(
      (file) => !acceptFileType.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      setError(
        "Invalid file type. Please choose files in JPEG, JPG, PNG, or WEBP format and try again."
      );
      return;
    }

    // Reset errors if validation passes
    setError("");

    if (isMultiple) {
      // For multiple file uploads
      const newMedia = files.map((file) => ({
        data: file,
        preview: URL.createObjectURL(file),
        fileType: file.type,
        fileName: file.name,
        mediaType: "image",
      }));

      setMultipleMedia((prev) => [...newMedia, ...prev]); // Append new media to the existing state
    } else {
      // For single file upload
      const file = files[0];
      setMedia({
        data: file,
        preview: URL.createObjectURL(file),
        fileType: file.type,
        fileName: file.name,
        mediaType: "image",
      });
    }
  };

  return {
    error,
    media,
    multipleMedia,
    setError,
    setMedia,
    setMultipleMedia,
    handleImageInput,
    resetMedia,
  };
}
