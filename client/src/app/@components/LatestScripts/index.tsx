import Container from '../Container';
import Image from 'next/image';
import Overlay from '@/components/Overlay';
import Text from '@/components/Text';

export default function LatestScript() {
  return (
    <Container label="Latest Script">
      <div className="relative h-[100px] overflow-hidden rounded-xl">
        <Text
          className="absolute right-4 bottom-0 text-white z-[var(--overlay-text-z-index)]"
          typography="display-xl"
        >
          Inside Out
        </Text>
        <Overlay />
        <Image
          alt="inside out poster"
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA3MDlfMjkx%2FMDAxNzIwNTIzNzgwMDQ1.Z7Q_Mx9F_aj4Gy4JTNZJxrRrh9M9sGT3_WoZmlF3k3cg.e6x1PsoFbfhuVNzWyYzXFSm4pGkKN4CD3yYYl2Gwq48g.JPEG%2FIMG_9355.JPG&type=sc960_832"
          width={500}
          height={100}
          className="absolute bottom-[-200px] object-cover object-bottom"
        />
      </div>
    </Container>
  );
}
