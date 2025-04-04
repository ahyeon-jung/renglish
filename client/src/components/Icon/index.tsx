import Text from '../Text';

type Icon = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function Icon({ label, icon: IconComponent }: Icon) {
  return (
    <div className="flex flex-col gap-[2px] items-center">
      <IconComponent />
      <Text as="label" typography="subHead-md">
        {label}
      </Text>
    </div>
  );
}
