type FieldSelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: { value: string; label: string }[];
};

export default function FieldSelect({ options, ...props }: FieldSelectProps) {
  return (
    <select className="border p-2 rounded-lg" {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
