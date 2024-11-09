"use client";

import { ChangeEvent, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { CameraIcon } from "@/public/svgs";
import Image from "next/image";
import { useMedia } from "@/hooks/useMedia";

const CoverPhoto = ({ fieldChange, mediaUrl }: any) => {
  const photoRef = useRef<HTMLInputElement>(null);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const { handleImageInput, media } = useMedia();

  // handle the photo action modal open and input change
  const handleInputBtn = () => {
    if (media.preview) {
      setIsActionOpen(true);
    } else {
      photoRef.current?.click();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleImageInput(e);
    fieldChange(media.data);
  };

  return (
    <>
      <div className="flex-center bg-light-800_dark-250 relative flex h-80 max-h-80 w-full rounded-xl">
        <input
          type="file"
          ref={photoRef}
          hidden
          onChange={handleInputChange}
          accept="image/jpeg,image/jpg,image/png,image/webp"
        />

        {media.preview ? (
          <Image
            src={media.preview || ""}
            alt="cropped-cover-image"
            width={2048}
            height={1024}
            className="size-full rounded-xl object-cover"
          />
        ) : (
          <p className="text-center text-sm text-light-500">
            Drag and drop or
            <br />
            click the button to add cover photo
          </p>
        )}

        <div
          className="absolute bottom-2 right-2 flex cursor-pointer gap-2 rounded-lg bg-dark-100 fill-light-900 p-3 text-sm text-light-900"
          onClick={handleInputBtn}
        >
          {media.preview ? (
            <div className="grid place-items-center text-base">
              <MdEdit fill="white" />
            </div>
          ) : (
            <CameraIcon fill="white" width="21px" height="21px" />
          )}
          {media.preview ? "Edit Cover Photo" : "Add Cover Photo"}
        </div>
      </div>
    </>
  );
};

export default CoverPhoto;
