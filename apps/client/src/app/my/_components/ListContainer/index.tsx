import Text from '@/components/Text';

type ListContainerProps = { title: string } & React.PropsWithChildren;

export default function ListContainer({ children, title }: ListContainerProps) {
  return (
    <div className="flex flex-col gap-2">
      <Text typography="subHead-lg">{title}</Text>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}
