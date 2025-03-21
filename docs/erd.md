# ERD (Entity-Relationship Diagram)

## 테이블 설명

### 1. **User**

사용자는 계정을 생성하고 로그인하여 작문 기록을 저장할 수 있는 테이블입니다.

| 컬럼명       | 데이터 타입 | 설명                         |
| ------------ | ----------- | ---------------------------- |
| `id`         | INTEGER     | 사용자 고유 ID (Primary Key) |
| `email`      | VARCHAR     | 사용자 이메일 (Unique)       |
| `password`   | VARCHAR     | 사용자 비밀번호              |
| `created_at` | DATETIME    | 계정 생성일                  |
| `updated_at` | DATETIME    | 마지막 수정일                |

### 2. **Movie**

영화 정보 테이블로, 각 영화의 기본 정보가 저장됩니다.

| 컬럼명        | 데이터 타입 | 설명                       |
| ------------- | ----------- | -------------------------- |
| `id`          | INTEGER     | 영화 고유 ID (Primary Key) |
| `title`       | VARCHAR     | 영화 제목                  |
| `description` | TEXT        | 영화 설명 (영어로 제공)    |
| `created_at`  | DATETIME    | 영화 정보 생성일           |
| `updated_at`  | DATETIME    | 영화 정보 수정일           |

### 3. **Scene**

영화의 각 장면에 대한 대본 정보를 저장하는 테이블입니다.

| 컬럼명       | 데이터 타입 | 설명                             |
| ------------ | ----------- | -------------------------------- |
| `id`         | INTEGER     | 장면 고유 ID (Primary Key)       |
| `movie_id`   | INTEGER     | 영화 ID (Foreign Key -> `Movie`) |
| `created_at` | DATETIME    | 장면 생성일                      |
| `updated_at` | DATETIME    | 장면 수정일                      |

### 4. **Speaker**

장면에 등장하는 화자에 대한 정보를 저장하는 테이블입니다.

| 컬럼명         | 데이터 타입 | 설명                             |
| -------------- | ----------- | -------------------------------- |
| `id`           | INTEGER     | 화자 고유 ID (Primary Key)       |
| `scene_id`     | INTEGER     | 장면 ID (Foreign Key -> `Scene`) |
| `speaker_name` | VARCHAR     | 화자 이름                        |
| `created_at`   | DATETIME    | 화자 정보 생성일                 |
| `updated_at`   | DATETIME    | 화자 정보 수정일                 |

### 5. **MovieSceneDialogue**

각 장면의 대사를 저장하는 테이블입니다. 이 테이블은 `Scene`과 `Speaker`를 기준으로 대사를 저장합니다.

| 컬럼명       | 데이터 타입 | 설명                               |
| ------------ | ----------- | ---------------------------------- |
| `id`         | INTEGER     | 대사 고유 ID (Primary Key)         |
| `scene_id`   | INTEGER     | 장면 ID (Foreign Key -> `Scene`)   |
| `speaker_id` | INTEGER     | 화자 ID (Foreign Key -> `Speaker`) |
| `en`         | TEXT        | 영어 대사                          |
| `ko`         | TEXT        | 한글 번역                          |
| `created_at` | DATETIME    | 대사 생성일                        |
| `updated_at` | DATETIME    | 대사 수정일                        |

### 6. **Writing**

사용자가 작성한 대본을 저장하는 테이블입니다. 사용자는 영화 장면을 선택하여 대사를 작성할 수 있습니다.

| 컬럼명        | 데이터 타입 | 설명                              |
| ------------- | ----------- | --------------------------------- |
| `id`          | INTEGER     | 작성한 대본 고유 ID (Primary Key) |
| `user_id`     | INTEGER     | 사용자 ID (Foreign Key -> `User`) |
| `scene_id`    | INTEGER     | 장면 ID (Foreign Key -> `Scene`)  |
| `user_script` | TEXT        | 사용자가 작성한 대사              |
| `created_at`  | DATETIME    | 작성일                            |
| `updated_at`  | DATETIME    | 수정일                            |

## 테이블 간의 관계

- **User ↔ Writing**:

  - `User`는 여러 개의 `Writing`을 가질 수 있습니다. (`1:N` 관계)
  - 각 `Writing`은 하나의 `User`에 속합니다.

- **Movie ↔ Scene**:

  - 하나의 `Movie`는 여러 개의 `Scene`을 가질 수 있습니다. (`1:N` 관계)
  - 각 `Scene`은 하나의 `Movie`에 속합니다.

- **Scene ↔ Speaker**:

  - 하나의 `Scene`은 여러 개의 `Speaker`를 가질 수 있습니다. (`1:N` 관계)
  - 각 `Speaker`는 하나의 `Scene`에 속합니다.

- **Scene ↔ MovieSceneDialogue**:

  - 하나의 `Scene`은 여러 개의 `MovieSceneDialogue`를 가질 수 있습니다. (`1:N` 관계)
  - 각 `MovieSceneDialogue`는 하나의 `Scene`에 속합니다.

- **Speaker ↔ MovieSceneDialogue**:

  - 하나의 `Speaker`는 여러 개의 `MovieSceneDialogue`를 가질 수 있습니다. (`1:N` 관계)
  - 각 `MovieSceneDialogue`는 하나의 `Speaker`에 속합니다.

- **Scene ↔ Writing**:
  - 하나의 `Scene`은 여러 개의 `Writing`을 가질 수 있습니다. (`1:N` 관계)
  - 각 `Writing`은 하나의 `Scene`에 해당합니다.

## 관계 요약

- **User** (1) ↔ (N) **Writing**
- **Movie** (1) ↔ (N) **Scene**
- **Scene** (1) ↔ (N) **Speaker**
- **Scene** (1) ↔ (N) **MovieSceneDialogue**
- **Speaker** (1) ↔ (N) **MovieSceneDialogue**
- **Scene** (1) ↔ (N) **Writing**
