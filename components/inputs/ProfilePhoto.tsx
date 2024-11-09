"use client";

import { ChangeEvent, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { CameraIcon } from "@/public/svgs";
import Image from "next/image";
import { useMedia } from "@/hooks/useMedia";

const ProfilePhoto = ({ fieldChange, mediaUrl }: any) => {
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
      <div className="flex-center bg-light-750_dark-250 relative -mt-20 ml-12 size-36 rounded-full border border-solid border-light-750 shadow-lg dark:border-dark-350">
        <input
          type="file"
          ref={photoRef}
          hidden
          onChange={handleInputChange}
          accept="image/jpeg,image/jpg,image/png,image/webp"
        />
        <Image
          src={media.preview || "/images/default_profile_pic.png"}
          alt="profile_pic"
          width={512}
          height={512}
          className="size-36 rounded-full object-cover"
        />

        <div
          className="absolute bottom-0 right-1 cursor-pointer rounded-full bg-dark-100 fill-white p-2 text-white"
          onClick={handleInputBtn}
        >
          {media.preview ? (
            <MdEdit fill="white" />
          ) : (
            <CameraIcon fill="white" width="21px" height="21px" />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePhoto;
