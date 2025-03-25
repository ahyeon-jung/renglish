type FieldDateProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function FieldDate({ ...props }: FieldDateProps) {
  return <input type="date" className="border p-2 rounded-lg" {...props} />;
}
