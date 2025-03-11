import { MovieSceneDialogue } from "@/types/script";
import Text from "@/components/Text";

export default function LineItem({ text }: Pick<MovieSceneDialogue, "text">) {
  return (
    <div className="bg-gray-100 p-2 rounded-md">
      <Text as="h2" typography="subHead-xl">
        {text}
      </Text>
    </div>
  );
}
