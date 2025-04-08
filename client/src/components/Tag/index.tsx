'use client';

import clsx from 'clsx';

type TagProps = {
  label: string;
  value: string;
  isActive?: boolean;
};

export default function Tag({ label, value, isActive = false }: TagProps) {
  const handleTagClick = () => {
    console.log(value);
  };

  return (
    <button
      onClick={handleTagClick}
      className={clsx(
        'py-2 px-4 w-[100px] rounded-2xl text-sm font-medium text-center transition-all',
        'hover:bg-gray-200 hover:text-black',
        isActive ? 'bg-black text-white' : 'bg-gray-100 text-gray-700',
      )}
    >
      {label}
    </button>
  );
}
