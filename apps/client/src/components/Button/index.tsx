import clsx from "clsx";
import Text from "../Text";

export type ButtonProps = {
  fit?: boolean;
  size?: "sm" | "md" | "default";
  variants?: "danger" | "default" | "primary" | "secondary" | "success";
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function Button({
  fit = false,
  size = "default",
  className,
  disabled,
  children,
  variants = "default",
  ...props
}: ButtonProps) {
  const variantClasses = disabled
    ? "bg-orange-300 text-white cursor-not-allowed"
    : variants === "default"
      ? "bg-orange-400 hover:bg-orange-500 text-white cursor-pointer"
      : variants === "danger"
        ? "bg-red-600 text-white cursor-pointer"
        : variants === "primary"
          ? "bg-blue-400 text-white cursor-pointer"
          : variants === "secondary"
            ? "bg-gray-400 text-white cursor-pointer"
            : variants === "success"
              ? "bg-green-600 text-white cursor-pointer"
              : "";

  return (
    <button
      className={clsx(
        fit ? "" : "w-full",
        "px-2 rounded-xl",
        size === "sm" ? "35" : size === "md" ? "h-[40]" : "h-[50px]",
        variantClasses,
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <Text typography="headline-md">{children}</Text>
    </button>
  );
}
