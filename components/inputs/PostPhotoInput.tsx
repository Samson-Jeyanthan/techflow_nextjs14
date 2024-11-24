"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMedia } from "@/lib/hooks/useMedia";
import { LuPlus } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { IMediaProps } from "@/types/utils.types";

type Props = {
  fieldChange: (e: any) => void;
  previousMedia: IMediaProps[];
  setPreviousMedia: (media: IMediaProps[]) => void;
};

const LargeMediaDisplay = ({ src, onClick }: any) => {
  return (
    <div className="relative">
      <Image
        src={src || ""}
        alt="first-image"
        width={1024}
        height={1024}
        className="size-72 min-w-72 rounded-lg object-cover"
      />
      <span
        className="absolute right-2 top-2 cursor-pointer rounded-full bg-light-500 p-1.5 text-lg"
        onClick={onClick}
      >
        <MdClose />
      </span>
    </div>
  );
};

const PostPhotoInput = ({
  fieldChange,
  previousMedia,
  setPreviousMedia,
}: Props) => {
  const photoRef = useRef<HTMLInputElement>(null);
  const { handleImageInput, error, multipleMedia, setMultipleMedia } =
    useMedia();
  const [selectedItem, setSelectedItem] = useState({
    isURL: previousMedia.length > 0,
    index: 0,
  });

  const allMedia = multipleMedia.length + previousMedia.length;

  const handleInputBtn = () => {
    photoRef.current?.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleImageInput({
      e,
      isMultiple: true,
      acceptFileType: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
      filesLimit: 3 - allMedia,
    });
    setSelectedItem({ isURL: false, index: 0 });
  };

  const handleRemoveMedia = (item: { isURL: boolean; index: number }) => {
    if (multipleMedia.length > 1) {
      setSelectedItem({ isURL: false, index: 0 });
    } else {
      setSelectedItem({ isURL: true, index: 0 });
    }

    if (item.isURL) {
      const updatedMedia = [...previousMedia];
      updatedMedia.splice(item.index, 1);
      setPreviousMedia(updatedMedia);
    } else {
      const updatedMedia = [...multipleMedia];
      updatedMedia.splice(item.index, 1);
      setMultipleMedia(updatedMedia);
    }
  };

  useEffect(() => {
    fieldChange([...multipleMedia]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multipleMedia]);

  useEffect(() => {
    console.log(
      previousMedia,
      multipleMedia,
      selectedItem,
      "useeffcet",
      allMedia
    );
  }, [previousMedia, multipleMedia, selectedItem, allMedia]);

  return (
    <div className="flex w-full flex-col gap-4">
      <input
        type="file"
        ref={photoRef}
        hidden
        onChange={handleInputChange}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
      />

      {allMedia === 0 && (
        <div
          className="text-dark-300_light-750 flex-center h-72 w-full cursor-pointer gap-2 rounded-lg border border-dashed border-light-500 bg-transparent text-sm dark:border-dark-400"
          onClick={handleInputBtn}
        >
          Click here to add files
        </div>
      )}

      <div className="flex items-center justify-start">
        {allMedia > 0 && selectedItem.isURL ? (
          <>
            {previousMedia.length > 0 && (
              <LargeMediaDisplay
                src={previousMedia[selectedItem.index].mediaURL}
                onClick={() =>
                  handleRemoveMedia({ isURL: true, index: selectedItem.index })
                }
              />
            )}
          </>
        ) : (
          <>
            {multipleMedia.length > 0 && (
              <LargeMediaDisplay
                src={multipleMedia[selectedItem.index].preview || ""}
                onClick={() =>
                  handleRemoveMedia({ index: selectedItem.index, isURL: false })
                }
              />
            )}
          </>
        )}

        <div className="flex w-full items-center justify-center gap-6">
          {allMedia > 1 && (
            <>
              {multipleMedia.map((media, index) => (
                <Image
                  key={index}
                  src={media.preview || ""}
                  alt="cropped-cover-image"
                  width={120}
                  height={120}
                  onClick={() => setSelectedItem({ index, isURL: false })}
                  className="size-20 min-w-20 cursor-pointer rounded-md object-cover"
                />
              ))}
              {previousMedia.map((media, index) => (
                <Image
                  key={index}
                  src={media.mediaURL || ""}
                  alt="cropped-cover-image"
                  width={120}
                  height={120}
                  onClick={() => {
                    setSelectedItem({ index, isURL: true });
                    console.log(index);
                  }}
                  className="size-20 min-w-20 cursor-pointer rounded-md object-cover"
                />
              ))}
            </>
          )}

          {allMedia < 3 && allMedia >= 1 && (
            <div
              className="text-dark-100_light-850 flex cursor-pointer items-center justify-center gap-3 text-sm"
              onClick={handleInputBtn}
            >
              <div className="bg-light-800_dark-250 rounded-full p-3">
                <LuPlus className="text-lg" />
              </div>
              <p>Add More</p>
            </div>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-custom-red">{error}</p>}
    </div>
  );
};

export default PostPhotoInput;
