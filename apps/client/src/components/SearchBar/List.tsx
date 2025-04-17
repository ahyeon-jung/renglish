export type OptionType = { label: string; value: string };

type ListProps = {
  onItemClick: (value: string) => void;
  options: OptionType[];
};

export default function List({ options, onItemClick }: ListProps) {
  return (
    <div className="absolute top-[45px] right-0 left-0 bg-white shadow-lg rounded-md z-10 max-h-60 overflow-y-auto">
      <ul className="divide-y divide-gray-200">
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => onItemClick(option.value)}
            className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-200"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
