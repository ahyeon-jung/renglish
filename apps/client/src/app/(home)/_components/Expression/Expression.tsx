import getWeeklyExpressions from "@/app/actions/expressions/getWeeklyExpressions";
import Container from "../Container";
import { PATHS } from "@/constants/path";
import clsx from "clsx";
import Text from "@/components/Text";

export default async function RandomExpression() {
  const expressions = await getWeeklyExpressions();

  const shuffled = expressions.data.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 2);

  return (
    <Container label="Today Expression" goTo={PATHS.WEEKLY_EXPRESSIONS}>
      <div className="flex flex-col gap-4">
        {selected.map((expression, index) => (
          <div
            key={index}
            className={clsx(
              'rounded-2xl p-4 bg-white',
              'flex flex-col gap-3 border-1 border-gray-200',
            )}
          >
            <Text as="h5" typography='headline-md' className="text-orange-400">
              {expression.expression}
            </Text>
            <ul className="space-y-1 text-gray-700 list-disc list-inside">
              <li>
                <Text typography='body-lg'>
                  <span className="font-semibold">뜻:</span> {expression.meaning}
                </Text>
              </li>
              <li>
                <Text typography='body-lg'>
                  <span className="font-semibold">의미:</span> {expression.usage}
                </Text>
              </li>
              <div className="ml-2 mt-1 space-y-1">
                {expression.examples.map((example, index) => (
                  <div key={index}>
                    <div>
                      <span className="font-medium text-gray-900">{example.en}</span>
                    </div>
                    <div className="text-md text-gray-600">{example.ko}</div>
                  </div>
                ))}
              </div>
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}
