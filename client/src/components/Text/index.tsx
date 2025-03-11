import React from "react";

type TextProps = {
  typography?: "subtitle1";
  as?: keyof React.JSX.IntrinsicElements;
} & React.PropsWithChildren;

export default function Text({ children, as = "span", ...props }: TextProps) {
  return React.createElement(as, props, children);
}
