import Text from "../Text";

export default function FieldLabel({ children }: React.PropsWithChildren) {
  return (
    <label>
      <Text typography="subHead-lg">{children}</Text>
    </label>
  );
}
