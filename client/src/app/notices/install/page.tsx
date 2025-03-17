import Image from "next/image";
import Text from "@/components/Text";
import clsx from "clsx";
import install1 from "@/assets/images/install1.webp";
import install2 from "@/assets/images/install2.webp";
import install3 from "@/assets/images/install3.webp";
import install4 from "@/assets/images/install4.webp";

const INSTALL_GUIDE = [
  {
    describe: "1. Open the webpage and tap the button.",
    image: install1,
  },
  { describe: "2. Select 'Add to Home Screen'.", image: install2 },
  {
    describe: "3. Enter a name for the app on your home screen.",
    image: install3,
  },
  {
    describe:
      "4. That’s it! Now you can access the app directly from your home screen. :D",
    image: install4,
  },
];

export default function InstallNotice() {
  return (
    <main
      className={clsx("mt-[var(--header-height)] p-4", "flex flex-col gap-8")}
    >
      <Text typography="display-lg">How to Install(IOS ver)?</Text>
      {INSTALL_GUIDE.map(({ describe, image }, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div>{describe}</div>
          <Image src={image} alt={describe} width={250} />
        </div>
      ))}
    </main>
  );
}
