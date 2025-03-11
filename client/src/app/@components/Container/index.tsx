import Text from "@/components/Text";
import clsx from "clsx";

type Container = {
  label?: string;
  className?: string;
} & React.PropsWithChildren;

export default function Container({ label, className, children }: Container) {
  return (
    <section className={clsx("flex flex-col gap-[15px]", className)}>
      {label && <Text>{label}</Text>}
      {children}
    </section>
  );
}
