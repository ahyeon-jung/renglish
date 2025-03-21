'use client';

import { ChevronLeft } from 'lucide-react';
import Text from '../Text';
import { useRouter } from 'next/navigation';

export type BackButton = { title?: string };

export default function BackButton({ title }: BackButton) {
  const router = useRouter();

  const goToBefore = () => {
    router.back();
  };

  return (
    <div className="flex gap-[15px]">
      <ChevronLeft onClick={goToBefore} />
      {title && <Text>{title}</Text>}
    </div>
  );
}
