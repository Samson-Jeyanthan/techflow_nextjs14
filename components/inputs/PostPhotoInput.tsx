"use client";

import { ChangeEvent, useRef } from "react";
import Image from "next/image";

type Props = {
  fieldChange: (e: any) => void;
  handleImageInput: (e: ChangeEvent<HTMLInputElement>) => void;
  media: any;
  resetMedia: () => void;
};

const PostPhotoInput = ({
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
    <div className="">
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
        </div>
      ) : (
        <div className="" onClick={handleInputBtn}>
          Add Image
        </div>
      )}
    </div>
  );
};

export default PostPhotoInput;
