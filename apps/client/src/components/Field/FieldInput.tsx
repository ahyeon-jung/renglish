import clsx from "clsx";

export type FieldInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function FieldInput({ className, ...props }: FieldInputProps) {
  return <input className={clsx("border p-2 rounded-lg", className)} {...props} />;
}
