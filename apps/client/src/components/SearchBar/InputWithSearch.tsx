import { Search } from 'lucide-react';
import { forwardRef } from 'react';

type InputWithSearchProps = { onClick?: () => void } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const InputWithSearch = forwardRef<HTMLInputElement, InputWithSearchProps>(
  ({ onClick, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          className="border-none outline-none bg-transparent flex-1 text-sm px-3 py-2 rounded-l-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
          {...props}
        />
        <Search className="text-gray-600 cursor-pointer" onClick={onClick} size={20} />
      </>
    );
  },
);

InputWithSearch.displayName = 'InputWithSearch';

export default InputWithSearch;
