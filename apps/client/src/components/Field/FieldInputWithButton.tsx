import Button, { ButtonProps } from "../Button";
import FieldInput, { FieldInputProps } from "./FieldInput";

import clsx from "clsx";

type InputWidthButtonProps = { buttonProps: ButtonProps; inputProps: FieldInputProps };

export default function InputWidthButton({
  buttonProps,
  inputProps: { className, ...inputProps },
}: InputWidthButtonProps) {
  return (
    <div className="w-full flex gap-3">
      <FieldInput className={clsx("flex-[8]", className)} {...inputProps} />
      <Button type="button" className="flex-[2]" {...buttonProps}>
        Verify
      </Button>
    </div>
  );
}
