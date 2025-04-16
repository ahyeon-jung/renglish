import ExpressionItem from './_components/ExpressionItem';
import clsx from 'clsx';
import getWeeklyExpressions from '../_actions/expressions/getWeeklyExpressions';

export default async function WeeklyExpressionPage() {
  const { data } = await getWeeklyExpressions();

  return (
    <main className={clsx('mt-[var(--header-height)] p-3', 'flex flex-col gap-6')}>
      <div>
        <h1 className="text-2xl font-bold text-orange-600 mb-2"> Weekly Expressions</h1>
        <p className="text-md leading-relaxed">
          Let&apos;s learn this week&apos;s essential English expressions
        </p>
      </div>
      <section className="flex flex-col gap-4">
        {data.map((expression, index) => (
          <ExpressionItem key={expression.id} order={index + 1} {...expression} />
        ))}
      </section>
    </main>
  );
}
