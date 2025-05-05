import React from "react";
import clsx from "clsx";

type Typography =
  | "body-lg"
  | "body-md"
  | "body-xl"
  | "display-xl"
  | "display-lg"
  | "display-md"
  | "display-sm"
  | "headline-lg"
  | "headline-md"
  | "subHead-xl"
  | "subHead-lg"
  | "subHead-md"
  | "subHead-sm";

type TextProps = {
  className?: string;
  typography?: Typography;
  as?: keyof React.JSX.IntrinsicElements;
} & React.PropsWithChildren;

const typographyClasses: Record<Typography, string> = {
  "body-lg": "font-normal text-base leading-6 tracking-[0.2px]",
  "body-md": "font-normal text-sm leading-5 tracking-[0.2px]",
  "body-xl": "font-normal text-lg leading-7 tracking-[0.2px]",
  "display-xl": "font-bold text-4xl leading-15 tracking-[-0.6px]",
  "display-lg": "font-medium text-3xl leading-13 tracking-[-0.6px]",
  "display-md": "text-xl font-semibold md:text-2xl leading-10 tracking-[-0.4px]",
  "display-sm": "font-medium text-xl leading-9 tracking-[-0.2px]",
  "headline-lg": "font-semibold text-xl leading-7 tracking-[0px]",
  "headline-md": "font-semibold text-lg leading-7 tracking-[0.2px]",
  "subHead-xl": "font-medium text-lg leading-7 tracking-[0.2px]",
  "subHead-lg": "font-semibold text-base leading-6 tracking-[0.6px]",
  "subHead-md": "font-semibold text-sm leading-6 tracking-[0.4px]",
  "subHead-sm": "font-semibold text-xs leading-4 tracking-[0.4px]",
};

export default function Text({
  children,
  className,
  as = "span",
  typography,
  ...props
}: TextProps): React.JSX.Element {
  const classes = typography ? typographyClasses[typography] : "";

  return React.createElement(as, { ...props, className: clsx(classes, className) }, children);
}
