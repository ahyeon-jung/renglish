type Icon = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function Icon({ label, icon: IconComponent }: Icon) {
  return (
    <div className="flex flex-col items-center">
      <IconComponent />
      <label>{label}</label>
    </div>
  );
}
