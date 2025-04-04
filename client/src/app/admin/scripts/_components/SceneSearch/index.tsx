'use client';

import SearchBar from '@/components/SearchBar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type SceneSearchProps = { currentKeyword?: string };

export default function SceneSearch({ currentKeyword }: SceneSearchProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(currentKeyword ?? '');

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearchClick = () => {
    router.push(`?keyword=${keyword}`);
  };

  return (
    <SearchBar>
      <SearchBar.InputWithSearch
        value={keyword}
        onChange={handleKeywordChange}
        onClick={handleSearchClick}
      />
    </SearchBar>
  );
}
