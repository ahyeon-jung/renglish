import getVisitorCount from '@/app/actions/statics/getVisitorCount';

export default async function Footer() {
  const { data: visitorCount } = await getVisitorCount();

  return (
    <footer className="bg-gray-100 p-6 mt-10">
      <div className="container mx-auto flex flex-col space-y-2">
        <p className="text-sm">
          Visitors: <span>{visitorCount}</span>
        </p>
        <p className="text-sm">
          Contact:{' '}
          <a href="mailto:ahyeon.aisha@gmail.com" className="underline">
            email here
          </a>
        </p>
      </div>
    </footer>
  );
}
