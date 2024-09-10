"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { Trash, Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string | string[]) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const [images, setImages] = useState<string[]>([]);

  // console.log("Image Field value => ", value);

  const onUpload = (result: any) => {
    setImages((prevState) => {
      const updatedImages = [...prevState, result.info.secure_url];

      setTimeout(() => {
        onChange(updatedImages);
      }, 10);

      return updatedImages;
    });

    // console.log(result);
  };

  // console.log("Images state => ", images);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-500 text-white">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>

      <CldUploadWidget
        options={{
          multiple: true,
        }}
        uploadPreset="x59efxzq"
        onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className="bg-gray-600 hover:bg-gray-500 text-white">
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
