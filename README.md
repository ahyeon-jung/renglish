# Renglish

<div align="center">
  <img src="https://github.com/ahyeon-jung/renglish/blob/dev/apps/client/public/icon.png?raw=true" alt="logo" width="150" height="auto" />
</div>
<br/>

> [Renglish(Reel + English)](https://renglish.vercel.app/)는 영어 회화 연습을 위한 영화 대본 기반 애플리케이션입니다. 사용자는 실력에 따라 빈칸 채우기, 한글/영어 대본 보기 등의 방식으로 연습할 수 있습니다. 회원가입 시 작문과 영어 표현 학습 기능이 열리며, 스터디에 참여한 회원은 자신의 녹음본을 대본과 함께 확인할 수 있습니다.

## Table of contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Troubleshootings](#troubleshootings)
- [Infrastructure](#infrastructure)
- [Structure](#structure)
- [Getting Started](#getting-started)

## Features
### 최신 스크립트를 보고, 스터디 참여 선택을 결정합니다.
> 최신 스크립트로 바로 접근 가능하며, 스터디 참여 버튼 선택 시 로그인 요청 혹은 스터디 참여 모달이 노출됩니다.

|메인 페이지|마이 페이지|
|:---:|:---:|
|<img src="https://github.com/user-attachments/assets/822b2d0e-b5ca-4b6a-8e13-7b99391787d8" />|<img src="https://github.com/user-attachments/assets/822b2d0e-b5ca-4b6a-8e13-7b99391787d8"/>|

### 관리자 페이지에서 핵심 영어 표현을 정리합니다.
> 관리자 역할을 맡은 사용자가 관리자 페이지에서 영어 표현을 추가합니다. 회원 유저는 해당 장면에 속하는 영어 표현을 볼 수 있습니다.

|관리자 페이지|영어표현 페이지|
|:---:|:---:|
|<img src="https://github.com/user-attachments/assets/822b2d0e-b5ca-4b6a-8e13-7b99391787d8" />|<img src="https://github.com/user-attachments/assets/822b2d0e-b5ca-4b6a-8e13-7b99391787d8" />|

### 스터디 참여자는 대본을 보며 음성 및 비디오를 공유할 수 있습니다.
> 스터디 참여자는 미팅 페이지에 들어가 함께 대본을 보며 음성 및 비디오를 공유합니다. 각 참여자들은 다른 참여자의 위치에 따라 이동할 수 있으며 파트너 및 피드백 선정 기능이 있습니다.

|스터디 목록 페이지|미팅 페이지|
|:---:|:---:|
|<img src="https://github.com/user-attachments/assets/822b2d0e-b5ca-4b6a-8e13-7b99391787d8" />|<img src="https://github.com/user-attachments/assets/822b2d0e-b5ca-4b6a-8e13-7b99391787d8" />|

## Tech Stack
- **Client**
  - **Next.js**
  - **@tanstack/react-query**
  - **@tanstack/react-virtual**
  - **zustand**
  - **next-pwa**
  - **swiper**
  - **socket.io-client**
  - **react-toastify**
- **Admin**
  - **react-admin**
  - **react-hook-form**
  - **@mui/material**
- **Server**
  - **@nestjs**
  - **@nestjs/swagger**
  - **bcrypt**
  - **socket.io**
  - **class-validator**
  - **cache-manager**
- **Database**
  - **MySQL**
  - **Redis**
- TypeScript, openapi-generator, pnpm, biome

## Troubleshootings
### Challenge 1
- about

### Challenge 2
- about

## Infrastructure
![image](https://github.com/user-attachments/assets/8e556188-8484-420f-8dd1-21c34539d683)

## Structure
```
├── .gitignore
├── .prettierrc
├── .releaserc.json
├── apps/
|   ├── admin/
|   |   ├── .env
|   |   ├── .gitignore
|   |   ├── eslint.config.mjs
|   |   ├── index.html
|   |   ├── package.json
|   |   ├── pnpm-lock.yaml
|   |   ├── prettier.config.js
|   |   ├── public/
|   |   |   └── manifest.json
|   |   |
|   |   ├── README.md
|   |   ├── src/
|   |   |   ├── components/
|   |   |   ├── constants/
|   |   |   ├── libs/
|   |   |   ├── pages/
|   |   |   ├── provider/
|   |   |   |   ├── authProvider/
|   |   |   |   └── dataProvider/
|   |   |   |
|   |   |   └── resources/
|   |   |       ├── dialogues/
|   |   |       ├── expressions/
|   |   |       ├── movies/
|   |   |       ├── scenes/
|   |   |       ├── speakers/
|   |   |       ├── studies/
|   |   |       └── users/
|   |   |
|   |   |
|   |   ├── tsconfig.app.json
|   |   ├── tsconfig.json
|   |   └── tsconfig.node.json
|   |
|   ├── client/
|   |   ├── .env
|   |   ├── .gitignore
|   |   ├── next.config.js
|   |   ├── package.json
|   |   ├── pnpm-lock.yaml
|   |   ├── postcss.config.mjs
|   |   ├── public/
|   |   |   ├── manifest.json
|   |   |   ├── sw.js
|   |   |   └── workbox-01fd22c6.js
|   |   |
|   |   ├── README.md
|   |   ├── src/
|   |   |   ├── app/
|   |   |   |   ├── (home)/
|   |   |   |   |   └── _components/
|   |   |   |   |       ├── Categories/
|   |   |   |   |       ├── Container/
|   |   |   |   |       ├── Expression/
|   |   |   |   |       ├── LatestScripts/
|   |   |   |   |       ├── RecruitingStudies/
|   |   |   |   |       └── ScriptSearch/
|   |   |   |   |
|   |   |   |   |
|   |   |   |   ├── actions/
|   |   |   |   |   ├── admin/
|   |   |   |   |   |   └── studies/
|   |   |   |   |   |
|   |   |   |   |   ├── auth/
|   |   |   |   |   ├── check/
|   |   |   |   |   ├── dialogues/
|   |   |   |   |   ├── email-verification/
|   |   |   |   |   ├── expressions/
|   |   |   |   |   ├── movies/
|   |   |   |   |   ├── my/
|   |   |   |   |   ├── scenes/
|   |   |   |   |   ├── speakers/
|   |   |   |   |   ├── statics/
|   |   |   |   |   ├── studies/
|   |   |   |   |   ├── users/
|   |   |   |   |   ├── webhook/
|   |   |   |   |   └── writings/
|   |   |   |   |
|   |   |   |   ├── api/
|   |   |   |   |   ├── cookies/
|   |   |   |   |   |   ├── access/
|   |   |   |   |   |   |   └── [token]/
|   |   |   |   |   |   |
|   |   |   |   |   |   ├── refresh/
|   |   |   |   |   |   |   └── [token]/
|   |   |   |   |   |   |
|   |   |   |   |   |   └── set-token/
|   |   |   |   |   |
|   |   |   |   |   ├── movies/
|   |   |   |   |   └── studies/
|   |   |   |   |
|   |   |   |   ├── auth/
|   |   |   |   |   ├── blocked/
|   |   |   |   |   ├── callback/
|   |   |   |   |   ├── login/
|   |   |   |   |   |   └── _components/
|   |   |   |   |   |       └── EmailLoginForm/
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   ├── logout/
|   |   |   |   |   ├── register/
|   |   |   |   |   |   ├── social/
|   |   |   |   |   |   └── _components/
|   |   |   |   |   |       └── EmailRegisterForm/
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   ├── reset-password/
|   |   |   |   |   └── _components/
|   |   |   |   |       ├── AuthContainer/
|   |   |   |   |       └── SocialButtons/
|   |   |   |   |
|   |   |   |   |
|   |   |   |   ├── expressions/
|   |   |   |   |   └── _components/
|   |   |   |   |       └── ExpressionItem/
|   |   |   |   |
|   |   |   |   |
|   |   |   |   ├── introduce/
|   |   |   |   ├── meeting/
|   |   |   |   |   └── [scene]/
|   |   |   |   |       ├── components/
|   |   |   |   |       |   ├── LocalVideo/
|   |   |   |   |       |   ├── RemoteVideo/
|   |   |   |   |       |   ├── Script/
|   |   |   |   |       |   ├── ScriptModeSelector/
|   |   |   |   |       |   └── WebRTCClients/
|   |   |   |   |       |
|   |   |   |   |       └── hooks/
|   |   |   |   |
|   |   |   |   |
|   |   |   |   ├── movies/
|   |   |   |   |   ├── [movie]/
|   |   |   |   |   |   ├── [scene]/
|   |   |   |   |   |   |   ├── practice/
|   |   |   |   |   |   |   |   ├── expression/
|   |   |   |   |   |   |   |   |   └── _components/
|   |   |   |   |   |   |   |   |       ├── ExpressionList/
|   |   |   |   |   |   |   |   |       ├── NonAccess/
|   |   |   |   |   |   |   |   |       └── Title/
|   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   ├── fill/
|   |   |   |   |   |   |   |   ├── speaking/
|   |   |   |   |   |   |   |   |   └── _components/
|   |   |   |   |   |   |   |   |       └── DialogList/
|   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   └── writing/
|   |   |   |   |   |   |   |       └── _components/
|   |   |   |   |   |   |   |           ├── ResultDialogueItem/
|   |   |   |   |   |   |   |           ├── ResultModal/
|   |   |   |   |   |   |   |           ├── WritingDialogue/
|   |   |   |   |   |   |   |           └── WritingDialogues/
|   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |
|   |   |   |   |   |   |   ├── script/
|   |   |   |   |   |   |   |   ├── download/
|   |   |   |   |   |   |   |   ├── en/
|   |   |   |   |   |   |   |   ├── en-ko/
|   |   |   |   |   |   |   |   └── ko/
|   |   |   |   |   |   |   |
|   |   |   |   |   |   |   └── _components/
|   |   |   |   |   |   |       ├── AudioBox/
|   |   |   |   |   |   |       ├── DialogListContainer/
|   |   |   |   |   |   |       ├── DialogListItem/
|   |   |   |   |   |   |       ├── SceneHeader/
|   |   |   |   |   |   |       └── SceneNav/
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   └── _components/
|   |   |   |   |   |       ├── MovieInfo/
|   |   |   |   |   |       └── MovieLineItem/
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   └── _components/
|   |   |   |   |       ├── Categories/
|   |   |   |   |       ├── ScriptLink/
|   |   |   |   |       └── ScriptListItem/
|   |   |   |   |
|   |   |   |   |
|   |   |   |   ├── my/
|   |   |   |   |   ├── inquiries/
|   |   |   |   |   ├── profile/
|   |   |   |   |   |   └── _components/
|   |   |   |   |   |       ├── CreatedDate/
|   |   |   |   |   |       ├── Email/
|   |   |   |   |   |       └── Nickname/
|   |   |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   ├── studies/
|   |   |   |   |   ├── writings/
|   |   |   |   |   └── _components/
|   |   |   |   |       └── ListContainer/
|   |   |   |   |
|   |   |   |   |
|   |   |   |   ├── notices/
|   |   |   |   |   ├── assignment/
|   |   |   |   |   ├── install/
|   |   |   |   |   └── member/
|   |   |   |   |
|   |   |   |   └── studies/
|   |   |   |       └── _components/
|   |   |   |           ├── ApplyToStudyModal/
|   |   |   |           ├── CancelToApplyModal/
|   |   |   |           ├── StatusQueryTags/
|   |   |   |           ├── StudyItem/
|   |   |   |           └── StudyMember/
|   |   |   |
|   |   |   |
|   |   |   |
|   |   |   ├── assets/
|   |   |   |   ├── images/
|   |   |   |   └── social/
|   |   |   |
|   |   |   ├── components/
|   |   |   |   ├── BackButton/
|   |   |   |   ├── Button/
|   |   |   |   ├── CheckBox/
|   |   |   |   ├── Dialog/
|   |   |   |   ├── Expression/
|   |   |   |   ├── Fallback/
|   |   |   |   ├── Field/
|   |   |   |   ├── Footer/
|   |   |   |   ├── Header/
|   |   |   |   ├── Icon/
|   |   |   |   ├── Indicator/
|   |   |   |   ├── Modal/
|   |   |   |   ├── Nav/
|   |   |   |   ├── NavItem/
|   |   |   |   ├── Overlay/
|   |   |   |   ├── SearchBar/
|   |   |   |   ├── SubheaderContainer/
|   |   |   |   ├── Tag/
|   |   |   |   ├── Text/
|   |   |   |   └── Toast/
|   |   |   |
|   |   |   ├── constants/
|   |   |   ├── hooks/
|   |   |   ├── libs/
|   |   |   ├── middlewares/
|   |   |   ├── providers/
|   |   |   ├── stores/
|   |   |   ├── styles/
|   |   |   ├── types/
|   |   |   └── utils/
|   |   |
|   |   └── tsconfig.json
|   |
|   └── server/
|       ├── .env
|       ├── .eslintrc.js
|       ├── .gitignore
|       ├── docker-compose.yml
|       ├── Dockerfile
|       ├── nest-cli.json
|       ├── package.json
|       ├── pnpm-lock.yaml
|       ├── README.md
|       ├── src/
|       |   ├── auth/
|       |   |   ├── dto/
|       |   |   ├── guards/
|       |   |   ├── interfaces/
|       |   |   └── strategies/
|       |   |
|       |   ├── common/
|       |   |   ├── constants/
|       |   |   ├── dto/
|       |   |   ├── entities/
|       |   |   ├── filters/
|       |   |   ├── interceptors/
|       |   |   ├── middlewares/
|       |   |   └── utils/
|       |   |
|       |   ├── configs/
|       |   ├── database/
|       |   ├── dialogue/
|       |   |   ├── dto/
|       |   |   └── entities/
|       |   |
|       |   ├── email-verification/
|       |   |   ├── dto/
|       |   |   └── test/
|       |   |
|       |   ├── expression/
|       |   |   ├── dto/
|       |   |   └── entities/
|       |   |
|       |   ├── inquiry/
|       |   |   ├── dto/
|       |   |   └── entities/
|       |   |
|       |   ├── logger/
|       |   ├── movie/
|       |   |   ├── dto/
|       |   |   ├── entities/
|       |   |   └── types/
|       |   |
|       |   ├── my/
|       |   ├── notice/
|       |   |   ├── dto/
|       |   |   └── entities/
|       |   |
|       |   ├── redis/
|       |   ├── scene/
|       |   |   ├── dto/
|       |   |   ├── entities/
|       |   |   └── types/
|       |   |
|       |   ├── signaling/
|       |   ├── speaker/
|       |   |   ├── dto/
|       |   |   └── entities/
|       |   |
|       |   ├── statistic/
|       |   |   ├── dto/
|       |   |   └── entities/
|       |   |
|       |   ├── study/
|       |   |   ├── dto/
|       |   |   ├── entities/
|       |   |   ├── enums/
|       |   |   └── types/
|       |   |
|       |   ├── user/
|       |   |   ├── dto/
|       |   |   ├── entities/
|       |   |   └── types/
|       |   |
|       |   └── writing/
|       |       ├── dto/
|       |       └── entities/
|       |
|       |
|       ├── test/
|       |   └── jest-e2e.json
|       |
|       ├── tsconfig.build.json
|       └── tsconfig.json
|
|
├── auto-deploy.py
├── biome.json
├── CHANGELOG.md
├── docs/
|   ├── erd.md
|   └── features.md
|
├── generateStructure.js
├── openapitools.json
├── package.json
├── packages/
|   └── services/
|       ├── .openapi-generator/
|       |   ├── FILES
|       |   └── VERSION
|       |
|       ├── .openapi-generator-ignore
|       ├── apis/
|       ├── models/
|       ├── package.json
|       ├── src/
|       |   └── generated/
|       |       ├── .openapi-generator/
|       |       |   ├── FILES
|       |       |   └── VERSION
|       |       |
|       |       ├── .openapi-generator-ignore
|       |       ├── apis/
|       |       └── models/
|       |
|       |
|       └── tsconfig.json
|
|
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── swagger.json
└── tsconfig.json
```

## Getting Started
이 프로젝트를 로컬에서 실행하려면 다음 환경이 필요합니다.

- **Node.js**: 20.x 이상
- **pnpm**: 패키지 매니저

### 동시 실행

1. **의존성 설치**:

   프로젝트의 의존성을 설치합니다.

   ```bash
   $ pnpm install
   ```

2. **실행**:

   서버를 실행하려면 다음 명령어를 사용하세요.

   ```bash
   $ pnpm run dev
   ```
   
### 개별 실행
<details>
   <summary>Server</summary>
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


</details>
<details>
   <summary>Client</summary>
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
</details>
<details>
   <summary>Admin</summary>
어드민 애플리케이션을 실행하려면 다음 단계를 따르세요.
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
</details>
