"use client";

import { ChangeEvent, useRef } from "react";
import Image from "next/image";
import { RiAttachment2 } from "react-icons/ri";
import { MdClose } from "react-icons/md";

type Props = {
  fieldChange: (e: any) => void;
  handleImageInput: (e: ChangeEvent<HTMLInputElement>) => void;
  media: any;
  resetMedia: () => void;
};

const HomePostPhoto = ({
  fieldChange,
  handleImageInput,
  media,
  resetMedia,
}: Props) => {
  const photoRef = useRef<HTMLInputElement>(null);

  // handle the photo action modal open and input change
  const handleInputBtn = () => {
    photoRef.current?.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleImageInput(e);
    fieldChange(e.target.files);
  };

  return (
    <div className="flex w-4/5 items-center gap-1">
      <input
        type="file"
        ref={photoRef}
        hidden
        onChange={handleInputChange}
        accept="image/jpeg,image/jpg,image/png,image/webp"
      />
      {media.preview ? (
        <div className="flex items-center gap-3">
          <Image
            src={media.preview || ""}
            alt="cropped-cover-image"
            width={120}
            height={120}
            className="size-12 min-w-12 rounded-sm object-cover"
          />

          <div className="text-dark-400_light-500 flex w-[90%] items-center gap-1.5 text-sm">
            <p className="line-clamp-1">{media.fileName}</p>
            <span
              className="hover:text-dark-100_light-800 cursor-pointer text-lg"
              onClick={() => resetMedia()}
            >
              <MdClose />
            </span>
          </div>
        </div>
      ) : (
        <p
          className="text-dark-400_light-500 hover:text-dark-200_light-700 flex h-12 cursor-pointer items-center gap-1 text-sm"
          onClick={handleInputBtn}
        >
          <RiAttachment2 className="text-lg" />
          Image
        </p>
      )}
    </div>
  );
};

export default HomePostPhoto;
