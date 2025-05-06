# Renglish

<div align="center">
  <img src="https://github.com/ahyeon-jung/renglish/blob/dev/apps/client/public/icon.png?raw=true" alt="logo" width="150" height="auto" />
</div>
<br/>

> [Renglish(Reel + English)](https://renglish.vercel.app/) is a movie script application designed to help users practice English conversation. Depending on their skill level, users can engage in exercises such as filling in the blanks or viewing scripts in either English or Korean. Signing up unlocks additional features for writing and learning English expressions, and members who join a study group of script can listen the recording.

## Table of contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Troubleshootings](#troubleshootings)
- [Infrastructure](#infrastructure)
- [Structure](#structure)
- [Getting Started](#getting-started)

## Features
### Browse the latest scripts and choose to join a study session
> You can instantly access the latest scripts in the main page. When you click the "Join Study" button, you’ll either be prompted to log in or see a modal to join the study session.

|Main Page|My Page|
|:---:|:---:|
|<img src="https://github.com/user-attachments/assets/822b2d0e-b5ca-4b6a-8e13-7b99391787d8" />|<img src="https://github.com/user-attachments/assets/822b2d0e-b5ca-4b6a-8e13-7b99391787d8"/>|

### Key English expressions are managed through the admin page
> Some users with admin privileges can add English expressions via the admin page. And regular members can view expressions related to each scene.

|Admin Page|Expressions Page|
|:---:|:---:|
|<img src="https://github.com/user-attachments/assets/822b2d0e-b5ca-4b6a-8e13-7b99391787d8" />|<img src="https://github.com/user-attachments/assets/822b2d0e-b5ca-4b6a-8e13-7b99391787d8" />|

### Study participants can share audio and video while participaiting in the study session
Participants can enter the meeting page to view the script together while sharing audio and video. Each participant can follow others’ positions in the script, and there are some features to assign partners group and provide feedback.

|Studies Page|Meeting Page|
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
To run this project locally, make sure you have the following environment:

- **Node.js**: 20.x or higher
- **pnpm**: Package manager

### Run All at Once

1. **Install dependencies**:

Install all project dependencies.

   ```bash
   $ pnpm install
   ```

2. **Run the app**:

To start the development server, use the following command:

   ```bash
   $ pnpm run dev
   ```
   
### Run Individually
<details>
   <summary>Server</summary>
To run the server:

1. **Navigate to the server folder**:

   ```bash
   $ cd server
   ```

2. **Install dependencies**:

   ```bash
   $ pnpm install
   ```

3. **Start the server**:

   ```bash
   $ pnpm run start
   ```


</details>
<details>
   <summary>Client</summary>
To run the client application:

1. **Navigate to the client folder**:

   ```bash
   $ cd client
   ```

2. **Install dependencies**:

 ```bash
 $ pnpm install
 ```

3. **Start the client**:

```bash
$ pnpm run dev
```
</details>

<details>
   <summary>Admin</summary>
To run the admin application:
1. **Navigate to the admin folder**:

   ```bash
   $ cd admin
   ```

2. **Install dependencies**:


   ```bash
   $ pnpm install
   ```

3. **Start the Admin**:

   ```bash
   $ pnpm run dev
   ```
</details>
