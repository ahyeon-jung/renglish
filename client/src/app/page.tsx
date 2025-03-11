import Categories from "./@components/Categories";
import LatestScript from "./@components/LatestScripts";
import ScriptSearch from "./@components/ScriptSearch";
import clsx from "clsx";

export default function Home() {
  return (
    <main
      className={clsx(
        "mt-[var(--header-height)] p-3",
        "flex flex-col gap-[15px]"
      )}
    >
      <ScriptSearch />
      <Categories />
      <LatestScript />
    </main>
  );
}
