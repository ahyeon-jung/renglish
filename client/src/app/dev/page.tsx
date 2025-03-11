import Text from "@/components/Text";
import clsx from "clsx";

export default function TextExample() {
  return (
    <main
      className={clsx(
        "mt-[var(--header-height)] p-3",
        "flex flex-col gap-[15px]"
      )}
    >
      <h1 className="text-3xl font-bold">Text Component Example</h1>

      <div className="flex flex-col gap-[15px]">
        <h2 className="text-2xl font-semibold">Typography Variants</h2>
        <div className="flex flex-col gap-[15px]">
          <Text typography="body-lg">This is body-lg text.</Text>
          <Text typography="body-md">This is body-md text.</Text>
          <Text typography="body-xl">This is body-xl text.</Text>
          <br />
          <Text typography="display-xl">This is display-xl text.</Text>
          <Text typography="display-lg">This is display-lg text.</Text>
          <Text typography="display-md">This is display-md text.</Text>
          <Text typography="display-sm">This is display-sm text.</Text>
          <br />
          <Text typography="headline-lg">This is headline-lg text.</Text>
          <Text typography="headline-md">This is headline-md text.</Text>
          <br />
          <Text typography="subHead-xl">This is subHead-xl text.</Text>
          <Text typography="subHead-lg">This is subHead-lg text.</Text>
          <Text typography="subHead-md">This is subHead-md text.</Text>
          <Text typography="subHead-sm">This is subHead-sm text.</Text>
        </div>
      </div>
    </main>
  );
}
