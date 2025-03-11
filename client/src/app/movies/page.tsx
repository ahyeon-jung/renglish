import ScriptListItem from "./@components/ScriptListItem";
import clsx from "clsx";

const SCRIPTS = [{ title: "me before you", path: "/me_before_you" }];

export default function Scripts() {
  return (
    <main
      className={clsx(
        "mt-[var(--header-height)] p-3",
        "flex flex-col gap-[15px]"
      )}
    >
      <ul>
        {SCRIPTS.map((movie, index) => (
          <ScriptListItem key={index} {...movie} />
        ))}
      </ul>
    </main>
  );
}
