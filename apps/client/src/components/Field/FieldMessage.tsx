import clsx from "clsx";

type FieldMessageProps = { label: string, varients?: 'error' | 'default' | 'success' };

export default function FieldMessage({ label, varients = 'default' }: FieldMessageProps) {
  return <div className={clsx(varients === 'error' ? "text-red-700" : "")}>{label}</div>;
}
