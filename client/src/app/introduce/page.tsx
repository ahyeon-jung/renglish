import { OPEN_CHAT_URL } from '@/constants/url';
import Link from 'next/link';
import clsx from 'clsx';

export default function Introduce() {
  return (
    <main
      className={clsx('mt-[var(--header-height)] py-4', 'flex flex-col items-center text-gray-800')}
    >
      <section className="text-center">
        <h1 className="text-2xl font-bold text-orange-600 mb-2">🎬 Reel + English, Renglish!</h1>
        <p className="text-md leading-relaxed">
          함께 영화 속 명장면을 읽고 연기하며,
          <br />
          자연스러운 영어 표현을 익혀보세요.
        </p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">🎥 스터디 진행 방식</h2>
          <ul className="text-gray-600 mt-2 text-left list-disc list-inside">
            <li>매주 한 편의 영화를 선정</li>
            <li>주요 장면의 대본을 함께 읽으며 표현 익히기</li>
            <li>빈칸 연습, 한글 대본 참고 가능</li>
            <li>실력에 따라 보고 읽어도 좋아요!</li>
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700">📍 스터디 장소 & 일정</h2>
          <p className="text-gray-600 mt-2">
            매주 일요일 오전 10시 <strong>게더타운</strong>에서 진행됩니다.
          </p>
          <p className="text-gray-600">2025년 3월 시작, 점점 확장 중! 🚀</p>
          <br />
          <p>
            매주 목요일 저녁 8시
            <br />
            보증금(참석시 환불): <del>3000원</del> <strong className="text-orange-600 ml-1">현재 무료로 진행중</strong>
          </p>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-2">
            📌 스터디 오픈 소식, 스크립트 업데이트, 질문은 아래 오픈채팅방에서!
          </p>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={OPEN_CHAT_URL}
            className="inline-block px-4 py-2 mt-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition"
          >
            오픈채팅방 바로가기 💬
          </Link>
        </div>
        <div className="mt-6 text-lg font-semibold text-orange-600">
          영어 실력과 상관없이,
          <br /> 영화와 영어를 사랑하는 분이라면
          <br /> 누구나 환영합니다! 🎭
        </div>
      </section>
    </main>
  );
}
