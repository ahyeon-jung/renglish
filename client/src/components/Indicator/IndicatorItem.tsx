import clsx from "clsx";

type IndicatorItem = {
  label: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
  isDefault?: boolean;
};

export default function IndicatorItem({
  className,
  isActive = false,
  isDefault = false,
  label,
  onClick,
}: IndicatorItem) {
  return (
    <button
      className={clsx(
        "p-1 px-3 rounded-sm cursor-pointer",
        className,
        isDefault || isActive ? "bg-yellow-200" : "bg-gray-100"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
