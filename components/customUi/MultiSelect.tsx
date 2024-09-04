import React, { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface IMultiSelectProps {
  placeholder: string;
  collections: TCollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<IMultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: TCollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as TCollectionType[];
  }

  const selectedTables = collections.filter(
    (collection) => !selected.includes(collection)
  );

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((collection) => (
          <Badge
            className="bg-transparent hover:bg-transparent text-gray-900 "
            key={collection._id}>
            {collection.title}
            <button
              type="button"
              onClick={() => onRemove(collection._id)}
              className="ml-1 hover:text-red-500">
              <X size={18} />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>
      <div className="relative mt-2">
        {open && (
          <CommandGroup className="absolute w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {selectedTables?.map((collection) => (
                <CommandItem
                  key={collection?._id}
                  onMouseDown={(e) => e.preventDefault()}
                  onSelect={() => {
                    onChange(collection?._id);
                    setInputValue("");
                  }}
                  className="cursor-pointer">
                  {collection?.title}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
