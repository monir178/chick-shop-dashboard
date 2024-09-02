"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface IMultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<IMultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />

      <div className="flex gap-1 flex-wrap mt-4">
        {value.map((item, index) => (
          <Badge className="bg-gray-600 hover:bg-gray-500" key={index}>
            {item}
            <button
              onClick={() => onRemove(item)}
              className="ml-1 outline-none hover:bg-red-500 bg-transparent rounded-full">
              <X size={16} />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
