type ExpressionItemProps = {
  order: number;
  expression: string;
  meaning: string;
  explanation: string;
  examples: { en: string; ko: string }[];
};
export default function ExpressionItem({
  order,
  expression,
  meaning,
  explanation,
  examples,
}: ExpressionItemProps) {
  return (
    <div className="border-t pt-4">
      <div className="text-base font-medium text-orange-700">
        {order}. {expression}
      </div>
      <ul className="mt-2 space-y-2 text-gray-700 list-disc list-inside">
        <li>
          <span className="font-semibold">뜻:</span> {meaning}
        </li>
        <li>
          <span className="font-semibold">의미:</span> {explanation}
        </li>
        <li>
          <span className="font-semibold">예문:</span>
          <div className="ml-4 mt-1 space-y-1">
            {examples.map((example, index) => (
              <div key={index}>
                <div>
                  <span className="font-medium text-gray-900">{example.en}</span>
                </div>
                <div className="text-sm text-gray-600">{example.ko}</div>
              </div>
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
}
