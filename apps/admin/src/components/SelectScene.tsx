import { SelectInput, useGetList } from "react-admin";
import RESOURCE from "../constants/resource";

type SelectSceneProps = {
  onSelect?: (id: string) => void;
};
const SelectScene = ({ onSelect }: SelectSceneProps) => {
  const { data } = useGetList(RESOURCE.SCENES);
  return (
    <SelectInput
      source="sceneId"
      choices={data?.map((scene) => ({ id: scene.id, name: scene.title })) || []}
      optionText="name"
      optionValue="id"
      onChange={(e) => onSelect?.(e.target.value)}
    />
  );
};

export default SelectScene;
