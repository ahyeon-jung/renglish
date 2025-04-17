import Text from '@/components/Text';
import clsx from 'clsx';

type AuthContainerProps = {
  title: string;
};

export default function AuthContainer({
  children,
  title,
}: React.PropsWithChildren<AuthContainerProps>) {
  return (
    <main className={clsx('mt-[var(--header-height)] p-3 pt-[30px]', 'flex flex-col gap-4')}>
      <Text as="h2" typography="display-lg">
        {title}
      </Text>
      {children}
    </main>
  );
}
