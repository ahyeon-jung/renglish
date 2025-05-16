"use client";

import ExpressionItem from "./_components/ExpressionItem";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ExpressionType } from "@/types/expression";
import getWeeklyExpressions from "../actions/expressions/getWeeklyExpressions";

export default function WeeklyExpressionPage() {
  const [expressions, setExpressions] = useState<ExpressionType[]>([]);

  useEffect(() => {
    const fetchExpressions = async () => {
      const response = await getWeeklyExpressions();
      if (response.success) {
        setExpressions(response.data);
      }
    };

    fetchExpressions();
  }, []);

  return (
    <main className={clsx("mt-[var(--header-height)] p-3", "flex flex-col gap-6")}>
      <div>
        <h1 className="text-2xl font-bold text-orange-600 mb-2">Weekly Expressions</h1>
        <p className="text-md leading-relaxed">
          Let&apos;s learn this week&apos;s essential English expressions
        </p>
      </div>
      <section className="flex flex-col gap-4">
        {expressions.map((expression, index) => (
          <ExpressionItem key={expression.id} order={index + 1} {...expression} />
        ))}
      </section>
    </main>
  );
}
