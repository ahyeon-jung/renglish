import Link from "next/link";
import { QUESTION_CHAT_URL } from "@/constants/url";

export default function Introduce() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-gray-800">
      <section className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">
          🎬 Reel + English, Renglish!
        </h1>
        <p className="text-lg leading-relaxed">
          영화 대본으로 영어 실력을 키우는 <strong>Renglish</strong> 스터디에
          오신 걸 환영합니다!
          <br />
          함께 영화 속 명장면을 읽고 연기하며, 자연스러운 영어 표현을
          익혀보세요.
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">
            🎥 스터디 진행 방식
          </h2>
          <ul className="text-gray-600 mt-2 text-left list-disc list-inside">
            <li>매주 한 편의 영화를 선정하여 감상</li>
            <li>주요 장면의 대본을 함께 읽으며 표현 익히기</li>
            <li>
              빈칸 연습, 한글 대본 참고 가능 (실력에 따라 보고 읽어도 좋아요!)
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">
            📍 스터디 장소 & 일정
          </h2>
          <p className="text-gray-600 mt-2">
            대면 스터디는 <strong>경기도 구리시 수택동</strong>에서 진행됩니다.
          </p>
          <p className="text-gray-600">2025년 3월 시작, 점점 확장 중! 🚀</p>
          <br />
          <p>매주 목요일 저녁 8시</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">📢 참여 방법</h2>
          <p className="text-gray-600 mt-2">
            관심 있는 분들은 아래 오픈채팅방을 통해 문의해주세요!
          </p>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={QUESTION_CHAT_URL}
            className="mt-3 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
          >
            오픈채팅방 입장하기
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
