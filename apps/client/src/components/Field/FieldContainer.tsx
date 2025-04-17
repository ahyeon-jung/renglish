export default function FieldContainer({ children }: React.PropsWithChildren) {
  return <div className="flex flex-col gap-[5px]">{children}</div>;
}
