"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  return (
    <div className={`relative ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`${otherClasses} bg-light-800_dark-250 border-none px-5 py-2.5 text-sm text-light-500`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-light-850_dark-200 border-none shadow-md shadow-dark-100/25">
          <SelectGroup>
            {filters.map((item, index) => (
              <SelectItem
                key={index}
                value={item.value}
                className="hover:bg-light-800_dark-300 hover:text-dark-100_light-800 cursor-pointer text-light-500"
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
