'use client';

import clsx from 'clsx';

type TagProps = {
  label: string;
  value: string;
  isActive?: boolean;
  variant?: 'default' | 'outline';
  size?: 'md' | 'sm';
};

export default function Tag({
  label,
  value,
  isActive = false,
  variant = 'default',
  size = 'md',
}: TagProps) {
  const handleTagClick = () => {
    console.log(value);
  };

  return (
    <button
      onClick={handleTagClick}
      className={clsx('rounded-2xl font-medium text-center transition-all', {
        // Size variants
        'py-2 px-4 text-sm w-[100px]': size === 'md',
        'py-1 px-2 text-xs w-[70px]': size === 'sm',
        'md:py-2 md:px-3 md:text-sm md:w-[90px]': size === 'sm',

        // Default variant styles
        'bg-black text-white': isActive && variant === 'default',
        'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-black':
          !isActive && variant === 'default',

        // Outline variant styles
        'border border-gray-300 text-gray-300 bg-transparent hover:bg-gray-100 hover:text-gray-500 hover:border-black':
          variant === 'outline',
      })}
    >
      {label}
    </button>
  );
}
