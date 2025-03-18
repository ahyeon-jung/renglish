import ScriptForm from "./_components/ScriptForm";
import clsx from "clsx";

export default function ScriptAdd() {
  return (
    <main className={clsx("mt-[var(--header-height)]")}>
      <ScriptForm />
    </main>
  );
}
