import clsx from 'clsx';

export default function Assignment() {
  return (
    <main
      className={clsx('mt-[var(--header-height)] py-4', 'flex flex-col items-center text-gray-800')}
    >
      <section className="text-center">
        <h1 className="text-2xl font-bold text-orange-600 mb-2">📝 과제 안내</h1>
        <p className="text-md leading-relaxed">
          스터디 참여 후, 일주일 동안 아래의 과제를 진행해 주세요.
        </p>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">🎤 과제 진행 방식</h2>
          <ul className="flex flex-col gap-3 text-gray-600 mt-2 text-left list-disc list-inside">
            <li>1일차 - 전체 대본을 보고 A, B의 대사를 녹음</li>
            <li>2일차 - 작문 페이지에서 A, B의 대사 작문 1회차 진행</li>
            <li>3일차 - 빈칸 대본을 보고 A, B의 대사를 녹음</li>
            <li>4일차 - (스피킹 페이지 권장) A의 대사를 녹음</li>
            <li>5일차 - (스피킹 페이지 권장) B의 대사를 녹음</li>
            <li>6-7일차 - 작문 2회차 진행 및 놓친 과제 업로드</li>
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">📍 과제 제출 방식</h2>
          <p className="text-gray-600 mt-2">
            과제는 <span className="font-bold">오픈채팅방</span>에 녹음본을 업로드해주세요.
          </p>
        </div>
      </section>
    </main>
  );
}
