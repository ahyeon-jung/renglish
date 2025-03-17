import Text from "../Text";

type Button = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ children, ...props }: Button) {
  return (
    <button className="bg-yellow-200 w-full h-[50px] rounded-xl" {...props}>
      <Text typography="headline-md">{children}</Text>
    </button>
  );
}
