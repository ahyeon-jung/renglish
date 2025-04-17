import clsx from 'clsx';

export default function MemberGuidePage() {
  return (
    <main
      className={clsx('mt-[var(--header-height)] py-4', 'flex flex-col items-center text-gray-800')}
    >
      <section className="text-center">
        <h1 className="text-2xl font-bold text-orange-600 mb-2">🔑 이용 권한 안내</h1>
        <p className="text-md leading-relaxed">사용자 등급에 따라 이용 가능한 기능이 달라집니다.</p>

        <div className="mt-6 text-left max-w-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">👤 비회원</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>영문 대본 보기</li>
            <li>한글 번역 보기</li>
            <li>영문-한글 대본 보기</li>
            <li>이번 주 영문 표현 페이지 이용</li>
          </ul>
        </div>

        <div className="mt-6 text-left max-w-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">🙋 회원</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>비회원 기능 포함</li>
            <li>모든 영화의 영문 표현 페이지 이용</li>
            <li>작문 페이지 및 작문 기록 열람</li>
          </ul>
        </div>

        <div className="mt-6 text-left max-w-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">🎓 스터디 참여자</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>회원 기능 포함</li>
            <li>스터디 참여 회차의 오디오 업로드 및 열람</li>
            <li>스터디 참여 회차의 과제 페이지 이용 및 공유</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
