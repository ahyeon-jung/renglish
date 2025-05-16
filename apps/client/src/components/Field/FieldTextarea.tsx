import clsx from "clsx";

export type FieldTextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export default function FieldTextarea({ className, ...props }: FieldTextareaProps) {
  return <textarea className={clsx("border p-2 rounded-lg", className)} {...props} />;
}
