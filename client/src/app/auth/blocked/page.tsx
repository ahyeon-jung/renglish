import Text from '@/components/Text';
import clsx from 'clsx';

export default function Blocked() {
  return (
    <main className={clsx('mt-[var(--header-height)] p-3 pt-[30px]', 'flex flex-col gap-4')}>
      <Text as="h2" typography="display-lg">
        Blocked
      </Text>
      <div>
        <Text as="h2" typography="display-lg">
          Sorry, this account is blocked
        </Text>
        <Text as="p" typography="body-lg">
          Please contact other account
        </Text>
      </div>
    </main>
  );
}
