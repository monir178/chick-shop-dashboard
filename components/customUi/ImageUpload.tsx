import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { Trash, Upload } from "lucide-react";
import Image from "next/image";

interface IImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<IImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-500 text-white">
                <Trash className="size-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover   rounded-lg"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="x59efxzq">
        {({ open }) => {
          return (
            <Button
              className="bg-gray-600 text-white hover:bg-gray-500"
              onClick={() => open()}>
              <Upload className="size-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
