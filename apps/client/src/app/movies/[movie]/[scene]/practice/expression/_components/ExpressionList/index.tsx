"use client";

import Button from "@/components/Button";
import Expression from "@/components/Expression";
import { ExpressionType } from "@/types/expression";
import Title from "../Title";
import clsx from "clsx";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

type ExpressionListProps = { expressions: ExpressionType[] };

export default function ExpressionList({ expressions }: ExpressionListProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <main className="mt-[var(--header-height)] p-3">
      <div ref={contentRef} className={clsx("print-container", "p-4 flex flex-col gap-[10px]")}>
        <Title title="I feel pretty" studiedAt={new Date("2025-04-04T15:31:41.000Z")} />
        {expressions.map((expression, index) => (
          <Expression key={index} order={index + 1} {...expression} />
        ))}
      </div>
      <Button onClick={() => reactToPrintFn()}>Print</Button>
    </main>
  );
}
