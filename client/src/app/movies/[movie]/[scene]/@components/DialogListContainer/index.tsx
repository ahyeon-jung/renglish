export default function DialogListContainer({
  children,
}: React.PropsWithChildren) {
  return <ul className="mt-[45px] flex flex-col gap-[10px]">{children}</ul>;
}
