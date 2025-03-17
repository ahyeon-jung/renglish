type FieldInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function FieldInput({ ...props }: FieldInput) {
  return <input className="border p-2 rounded-lg" {...props} />;
}
