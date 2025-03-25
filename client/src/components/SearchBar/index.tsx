import List from './List';
import { Search } from 'lucide-react';
import clsx from 'clsx';

type SearchBar = { onClick?: () => void } & React.PropsWithChildren &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function SearchBar({ onClick, children, ...props }: SearchBar) {
  return (
    <div
      className={clsx('relative flex items-center', 'bg-gray-100 rounded-lg py-[5px] px-[10px]')}
    >
      <input
        className="border-none outline-none bg-transparent flex-1 text-sm px-3 py-2 rounded-l-lg focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        {...props}
      />
      <Search className="text-gray-600 cursor-pointer" onClick={onClick} size={20} />
      {children}
    </div>
  );
}

SearchBar.List = List;
