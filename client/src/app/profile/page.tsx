import clsx from "clsx";
import getAuthDataAction from "../@actions/auth/user/getAuthData";

export default async function Profile() {
  const data = await getAuthDataAction();

  return (
    <main className={clsx("mt-[var(--header-height)]")}>
      프로필 페이지입니다.
      <div>{data.email}</div>
    </main>
  );
}
