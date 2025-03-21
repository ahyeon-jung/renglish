import Container from '../Container';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import Text from '@/components/Text';
import backgroundImage from '@/assets/images/background.webp';

export default function ScriptSearch() {
  return (
    <div className="relative w-full pt-[80px] pb-[120px]">
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
        <SearchBar />
      </Container>
    </div>
  );
}
