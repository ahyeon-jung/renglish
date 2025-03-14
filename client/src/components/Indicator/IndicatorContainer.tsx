import clsx from "clsx";

type IndicatorContainer = {
  className?: string;
} & React.PropsWithChildren;

export default function IndicatorContainer({
  className,
  children,
}: IndicatorContainer) {
  return <div className={clsx("flex gap-[2px]", className)}>{children}</div>;
}
