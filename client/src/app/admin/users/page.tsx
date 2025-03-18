import clsx from "clsx";

export default function Users() {
  return (
    <main
      className={clsx(
        "mt-[var(--header-height)]",
        "flex flex-col gap-4 py-4 px-2"
      )}
    >
      <div>사용자 목록 리스트</div>
    </main>
  );
}
