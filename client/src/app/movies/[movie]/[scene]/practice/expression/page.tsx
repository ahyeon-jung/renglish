'use client';

import Button from '@/components/Button';
import ExpressionItem from './_components/ExpressionItem';
import Title from './_components/Title';
import clsx from 'clsx';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

export default function MovieScenePracticeFill({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  console.log(params);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <main className="mt-[var(--header-height)] p-3">
      <div ref={contentRef} className={clsx('print-container', 'p-4 flex flex-col gap-[10px]')}>
        <Title title="I feel pretty" studiedAt={new Date('2025-04-04T15:31:41.000Z')} />
        {expressions.map((expression, index) => (
          <ExpressionItem key={index} order={index + 1} {...expression} />
        ))}
      </div>
      <Button onClick={() => reactToPrintFn()}>Print</Button>
    </main>
  );
}
export const expressions = [
  {
    id: 1,
    expression: 'She killed it (tonight).',
    explanation: '어떤 일을 매우 잘했을 때 쓰는 표현',
    meaning: '완전 잘했어, 성공했어',
    examples: [
      { en: 'She killed it tonight.', ko: '그녀 오늘 밤 대박쳤어.' },
      { en: 'You killed it on stage!', ko: '무대에서 완전 잘했어!' },
    ],
  },
  {
    id: 2,
    expression: 'I didn’t ask for a podcast.',
    explanation: '말이 너무 많을 때 농담처럼 하는 표현',
    meaning: '그 정도로 자세히 듣고 싶은 건 아니야',
    examples: [
      {
        en: 'I just asked where you went! I didn’t ask for a podcast.',
        ko: '어디 갔냐고만 물었는데, 팟캐스트를 들으려던 건 아니야.',
      },
    ],
  },
  {
    id: 3,
    expression: 'She’s the complete package.',
    explanation: '외모, 성격, 능력 등 모든 걸 갖춘 사람을 표현할 때 사용',
    meaning: '완벽한 사람',
    examples: [
      {
        en: 'She’s smart, funny, and beautiful. She’s the complete package.',
        ko: '그녀는 똑똑하고, 유쾌하고, 아름다워. 완벽해.',
      },
    ],
  },
  {
    id: 4,
    expression: 'I’ve never seen anything like that.',
    explanation: '놀랍거나 인상 깊은 상황에서 감탄할 때 사용',
    meaning: '그런 건 본 적 없어',
    examples: [
      {
        en: 'Wow, I’ve never seen anything like that before.',
        ko: '와, 그런 건 처음 봐.',
      },
    ],
  },
  {
    id: 5,
    expression: 'Can I be you when I grow up?',
    explanation: '상대방을 존경하거나 부러워할 때 장난스럽게 말함',
    meaning: '나도 너처럼 되고 싶어',
    examples: [
      {
        en: 'You’re so confident. Can I be you when I grow up?',
        ko: '너 너무 멋져. 나도 너처럼 되고 싶다!',
      },
    ],
  },
  {
    id: 6,
    expression: 'Is there a [something] here?',
    explanation: '무언가가 이 장소에 존재하는지 물을 때 사용',
    meaning: '[무엇무엇]이 여기 있어?',
    examples: [
      { en: 'Is there a backstage here?', ko: '여기 백스테이지 있어?' },
      { en: 'Is there a restroom here?', ko: '여기 화장실 있어?' },
    ],
  },
  {
    id: 7,
    expression: 'I’m getting to know that.',
    explanation: '점점 알게 되는 사실이나 사람에 대해 이야기할 때 사용',
    meaning: '나도 그걸 알아가는 중이야',
    examples: [
      {
        en: 'She’s amazing.\nYeah, I’m getting to know that.',
        ko: '그녀 대단하지. / 응, 나도 그걸 알아가는 중이야.',
      },
    ],
  },
  {
    id: 8,
    expression: 'That was so great.',
    explanation: '어떤 경험이나 결과가 정말 좋았을 때 감탄하는 말',
    meaning: '정말 좋았어, 최고였어',
    examples: [
      {
        en: 'Your performance? That was so great!',
        ko: '너 공연? 진짜 최고였어!',
      },
    ],
  },
  {
    id: 9,
    expression: 'I’m sorry it didn’t go the way you wanted it to.',
    explanation: '상대방의 기대가 무너졌을 때 위로하는 말',
    meaning: '네가 원하는 대로 안 돼서 미안해',
    examples: [
      {
        en: 'I lost the contest...\nI’m sorry it didn’t go the way you wanted it to.',
        ko: '대회에서 졌어... / 네가 원하는 대로 안 돼서 미안해.',
      },
    ],
  },
  {
    id: 10,
    expression: 'You were ripped off.',
    explanation: '비싸게 샀거나 속았을 때 상대를 위로하거나 놀랄 때 사용',
    meaning: '바가지 썼어, 사기당했어',
    examples: [
      {
        en: '$50 for that t-shirt? You were ripped off!',
        ko: '저 티셔츠가 50달러라고? 너 완전 바가지 썼네!',
      },
    ],
  },
];
