# REnglish

REnglish는 영어 회화 연습을 위한 영화 대본 애플리케이션입니다. 사용자는 영어 영화 대본을 통해 회화 연습을 하고, 이를 기반으로 여러 기능을 활용할 수 있습니다.

## Features

- 영화 대본을 읽고 따라하는 방식으로 영어 회화를 연습
- 주간 대본 업데이트 기능
- 서버와 클라이언트를 통한 효율적인 데이터 처리

---

## Getting Started

이 프로젝트는 **백엔드 서버**와 **프론트엔드 클라이언트**로 나뉘어져 있습니다. 각각의 서버를 설정하고 실행하는 방법은 아래에 설명되어 있습니다.

### 1. Getting Started - Backend Server

서버를 실행하려면 다음 단계를 따르세요.

1. **서버 폴더로 이동**:

   ```bash
   $ cd server
   ```

2. **의존성 설치**:

   프로젝트의 의존성을 설치합니다.

   ```bash
   $ pnpm install
   ```

3. **서버 실행**:

   서버를 실행하려면 다음 명령어를 사용하세요.

   ```bash
   $ pnpm run start
   ```

### 2. Getting Started - Client (Frontend)

클라이언트 애플리케이션을 실행하려면 다음 단계를 따르세요.

1. **클라이언트 폴더로 이동**:

   ```bash
   $ cd client
   ```

2. **의존성 설치**:

   클라이언트의 의존성을 설치합니다.

   ```bash
   $ pnpm install
   ```

3. **클라이언트 실행**:

   클라이언트를 실행하려면 다음 명령어를 사용하세요.

   ```bash
   $ pnpm run dev
   ```

---

## 기술 스택

- **Backend**: NestJS
- **Frontend**: Next.js
- **Database**: (필요한 경우, 사용된 데이터베이스 추가)
- **기타**: TypeScript, pnpm, ESLint, Prettier

---

## 개발 환경 설정

이 프로젝트를 로컬에서 실행하려면 다음 환경이 필요합니다.

- **Node.js**: 16.x 이상
- **pnpm**: 패키지 매니저

### pnpm 설치

`pnpm`을 설치하려면 아래 명령어를 실행하세요:

```bash
npm install -g pnpm
```
