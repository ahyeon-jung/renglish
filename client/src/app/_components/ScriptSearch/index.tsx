'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

import Categories from '../Categories';
import Container from '../Container';
import Image from 'next/image';
import { OptionType } from '@/components/SearchBar/List';
import { PATHS } from '@/constants/path';
import SearchBar from '@/components/SearchBar';
import Text from '@/components/Text';
import backgroundImage from '@/assets/images/background.webp';
import getMovies from '@/app/_actions/movies/getMovies';
import { useRouter } from 'next/navigation';

export default function ScriptSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [keywordOptions, setKeywordOptions] = useState<OptionType[]>([]);

  const searchBarRef = useRef<HTMLDivElement>(undefined);

  const handleKeywordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);

    if (value.length <= 2) {
      setKeywordOptions([]);
      return;
    }

    const {
      data: { data: movies },
    } = await getMovies({ keyword: value });

    setKeywordOptions(movies.map((movie) => ({ label: movie.title, value: movie.id })));
  };

  const handleKeywordClick = (value: string) => {
    router.push(`${PATHS.MOVIE.DETAIL(value)}`);
  };

  const resetKeywordOptions = () => {
    setKeywordOptions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        resetKeywordOptions();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full pt-[80px] pb-[40px]">
      <Image
        src={backgroundImage}
        alt="library background image"
        priority
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      <Container className="relative z-10 flex flex-col justify-center items-center">
        <Text as="h3" typography="display-md" className="text-white">
          Learn English with Movies
        </Text>
        <SearchBar className="w-[60%]">
          <SearchBar.InputWithSearch
            ref={searchBarRef as RefObject<HTMLInputElement>}
            value={keyword}
            onChange={handleKeywordChange}
            onFocus={resetKeywordOptions}
            onBlur={resetKeywordOptions}
          />
          <SearchBar.List options={keywordOptions} onItemClick={handleKeywordClick} />
        </SearchBar>
        <Categories />
      </Container>
    </div>
  );
}
