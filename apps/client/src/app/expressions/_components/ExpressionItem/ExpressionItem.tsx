import Expression from "@/components/Expression";
import { ExpressionType } from "@/types/expression";

type ExpressionProps = {
  order: number;
} & ExpressionType;

export default function ExpressionItem({ ...props }: ExpressionProps) {
  return (
    <div>
      <Expression {...props} />
    </div>
  );
}
