"use client";

import { useState } from "react";

type FieldSelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: { value: string; label: string }[];
};

export default function FieldSelect({ options, ...props }: FieldSelectProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <select
      className="border p-2 rounded-lg"
      value={selectedValue}
      onChange={handleChange}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
