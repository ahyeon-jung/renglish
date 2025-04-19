import InputWithSearch from './InputWithSearch';
import List from './List';
import clsx from 'clsx';

type SearchBarProps = { className?: string } & React.PropsWithChildren;

export default function SearchBar({ className, children }: SearchBarProps) {
  return (
    <div
      className={clsx(
        'relative flex items-center',
        'bg-gray-100 rounded-lg py-[5px] px-[10px]',
        className,
      )}
    >
      {children}
    </div>
  );
}

SearchBar.List = List;
SearchBar.InputWithSearch = InputWithSearch;
