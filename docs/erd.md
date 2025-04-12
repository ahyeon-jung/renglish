# ERD (Entity-Relationship Diagram)

## 테이블 설명

### 1. **User**

사용자 정보를 저장하는 테이블입니다.

| 컬럼명              | 데이터 타입 | 설명                         |
| ------------------ | ----------- | ---------------------------- |
| `id`               | UUID        | 사용자 고유 ID (Primary Key) |
| `email`            | VARCHAR     | 사용자 이메일                |
| `password`         | VARCHAR     | 사용자 비밀번호              |
| `nickname`         | VARCHAR     | 사용자 닉네임                |
| `how`              | VARCHAR     | 가입 경로 (nullable)         |
| `hashedRefreshToken`| VARCHAR    | 리프레시 토큰 (nullable)     |
| `created_at`       | DATETIME    | 생성일                      |
| `updated_at`       | DATETIME    | 수정일                      |
| `deleted_at`       | DATETIME    | 삭제일 (nullable)           |

### 2. **Movie**

영화 정보를 저장하는 테이블입니다.

| 컬럼명        | 데이터 타입 | 설명                       |
| ------------- | ----------- | -------------------------- |
| `id`          | UUID        | 영화 고유 ID (Primary Key) |
| `title`       | VARCHAR     | 영화 제목                  |
| `category`    | VARCHAR     | 영화 카테고리              |
| `imageUrl`    | VARCHAR     | 영화 이미지 URL            |
| `description` | TEXT        | 영화 설명                  |
| `created_at`  | DATETIME    | 생성일                    |
| `updated_at`  | DATETIME    | 수정일                    |
| `deleted_at`  | DATETIME    | 삭제일 (nullable)         |

### 3. **Scene**

영화의 장면 정보를 저장하는 테이블입니다.

| 컬럼명       | 데이터 타입 | 설명                             |
| ------------ | ----------- | -------------------------------- |
| `id`         | UUID        | 장면 고유 ID (Primary Key)       |
| `title`      | VARCHAR     | 장면 제목                        |
| `studiedAt`  | DATETIME    | 학습 일시                        |
| `description`| TEXT        | 장면 설명                        |
| `audioUrl`   | VARCHAR     | 오디오 파일 URL                  |
| `created_at` | DATETIME    | 생성일                          |
| `updated_at` | DATETIME    | 수정일                          |
| `deleted_at` | DATETIME    | 삭제일 (nullable)               |

### 4. **Speaker**

대화 화자 정보를 저장하는 테이블입니다.

| 컬럼명         | 데이터 타입 | 설명                             |
| -------------- | ----------- | -------------------------------- |
| `id`           | UUID        | 화자 고유 ID (Primary Key)       |
| `speaker_name` | VARCHAR     | 화자 이름                        |
| `speaker_type` | VARCHAR     | 화자 유형                        |
| `created_at`   | DATETIME    | 생성일                          |
| `updated_at`   | DATETIME    | 수정일                          |
| `deleted_at`   | DATETIME    | 삭제일 (nullable)               |

### 5. **Writing**

사용자의 작문 기록을 저장하는 테이블입니다.

| 컬럼명       | 데이터 타입 | 설명                              |
| ------------ | ----------- | --------------------------------- |
| `id`         | UUID        | 작문 고유 ID (Primary Key)        |
| `writing`    | TEXT        | 작성한 내용                       |
| `userId`     | UUID        | 사용자 ID (Foreign Key)           |
| `dialogueId` | UUID        | 대화 ID (Foreign Key)             |
| `created_at` | DATETIME    | 생성일                           |
| `updated_at` | DATETIME    | 수정일                           |
| `deleted_at` | DATETIME    | 삭제일 (nullable)                |

### 6. **Study**

스터디 정보를 저장하는 테이블입니다.

| 컬럼명       | 데이터 타입 | 설명                         |
| ------------ | ----------- | ---------------------------- |
| `id`         | UUID        | 스터디 고유 ID (Primary Key) |
| `title`      | VARCHAR     | 스터디 제목                  |
| `description`| TEXT        | 스터디 설명                  |
| `studiedAt`  | DATETIME    | 스터디 일시                  |
| `created_at` | DATETIME    | 생성일                      |
| `updated_at` | DATETIME    | 수정일                      |
| `deleted_at` | DATETIME    | 삭제일 (nullable)           |

### 7. **Inquiry**

문의사항을 저장하는 테이블입니다.

| 컬럼명       | 데이터 타입 | 설명                         |
| ------------ | ----------- | ---------------------------- |
| `id`         | UUID        | 문의 고유 ID (Primary Key)   |
| `title`      | VARCHAR     | 문의 제목                    |
| `content`    | TEXT        | 문의 내용                    |
| `userId`     | UUID        | 사용자 ID (Foreign Key)      |
| `created_at` | DATETIME    | 생성일                      |
| `updated_at` | DATETIME    | 수정일                      |
| `deleted_at` | DATETIME    | 삭제일 (nullable)           |

### 8. **Notice**

공지사항을 저장하는 테이블입니다.

| 컬럼명       | 데이터 타입 | 설명                         |
| ------------ | ----------- | ---------------------------- |
| `id`         | UUID        | 공지 고유 ID (Primary Key)   |
| `title`      | VARCHAR     | 공지 제목                    |
| `content`    | TEXT        | 공지 내용                    |
| `created_at` | DATETIME    | 생성일                      |
| `updated_at` | DATETIME    | 수정일                      |
| `deleted_at` | DATETIME    | 삭제일 (nullable)           |

### 9. **Statistic**

통계 정보를 저장하는 테이블입니다.

| 컬럼명       | 데이터 타입 | 설명                         |
| ------------ | ----------- | ---------------------------- |
| `id`         | UUID        | 통계 고유 ID (Primary Key)   |
| `type`       | VARCHAR     | 통계 유형                    |
| `count`      | INTEGER     | 통계 수치                    |
| `created_at` | DATETIME    | 생성일                      |
| `updated_at` | DATETIME    | 수정일                      |
| `deleted_at` | DATETIME    | 삭제일 (nullable)           |

## 테이블 간의 관계

- **User ↔ Writing**:
  - `User`는 여러 개의 `Writing`을 가질 수 있습니다. (`1:N` 관계)
  - 각 `Writing`은 하나의 `User`에 속합니다.

- **User ↔ Inquiry**:
  - `User`는 여러 개의 `Inquiry`를 가질 수 있습니다. (`1:N` 관계)
  - 각 `Inquiry`는 하나의 `User`에 속합니다.

- **User ↔ Study**:
  - `User`는 여러 개의 `Study`에 신청하거나 참여할 수 있습니다. (`N:M` 관계)
  - 각 `Study`는 여러 명의 신청자와 참여자를 가질 수 있습니다.

- **Movie ↔ Scene**:
  - 하나의 `Movie`는 여러 개의 `Scene`을 가질 수 있습니다. (`1:N` 관계)
  - 각 `Scene`은 하나의 `Movie`에 속합니다.

- **Scene ↔ Speaker**:
  - 하나의 `Scene`은 여러 개의 `Speaker`를 가질 수 있습니다. (`1:N` 관계)
  - 각 `Speaker`는 하나의 `Scene`에 속합니다.

- **Scene ↔ Study**:
  - 하나의 `Scene`은 여러 개의 `Study`와 연결될 수 있습니다. (`1:N` 관계)
  - 각 `Study`는 하나의 `Scene`에 속합니다.

## 관계 요약

- **User** (1) ↔ (N) **Writing**
- **User** (1) ↔ (N) **Inquiry**
- **User** (N) ↔ (M) **Study**
- **Movie** (1) ↔ (N) **Scene**
- **Scene** (1) ↔ (N) **Speaker**
- **Scene** (1) ↔ (N) **Study**