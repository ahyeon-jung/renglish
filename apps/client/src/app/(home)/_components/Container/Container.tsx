import { Ellipsis } from 'lucide-react';
import Link from 'next/link';
import Text from '@/components/Text';
import clsx from 'clsx';

type ContainerProps = {
  label?: string;
  ellipsisDescription?: string;
  className?: string;
  goTo?: string;
} & React.PropsWithChildren;

export default function Container({ label, goTo, className, children, ellipsisDescription }: ContainerProps) {
  return (
    <section className={clsx('flex flex-col ', className)}>
      <div className="flex justify-between items-center">
        {label && (
          <Text as="h3" typography="headline-md" className='text-gray-800'>
            {label}
          </Text>
        )}
        {goTo && (
          <Link className="hover:bg-gray-300 p-2 rounded-2xl" href={goTo} title={ellipsisDescription}>
            <Ellipsis size={20} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
