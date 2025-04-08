import Tag from '@/components/Tag';

const CATEGORIES = [
  { value: 'all' },
  { value: 'romance' },
  { value: 'drama' },
  { value: 'action' },
  { value: 'comedy' },
  { value: 'adventure' },
  { value: 'thriller' },
  { value: 'sci-fi' },
];

export default function Categories() {
  return (
    <div className="w-[60%] grid grid-cols-4 place-items-center gap-y-2">
      {CATEGORIES.map((category) => (
        <Tag
          size="sm"
          variant="outline"
          key={category.value}
          label={category.value}
          value={category.value}
        />
      ))}
    </div>
  );
}
