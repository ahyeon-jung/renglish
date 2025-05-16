import Email from "./_components/Email";
import Nickname from "./_components/Nickname";
import SubHeaderContainer from "@/components/SubheaderContainer";
import clsx from "clsx";
import getAuthDataAction from "../../actions/my/getAuthData";
import CreatedDate from "./_components/CreatedDate";

export default async function Profile() {
  const { data } = await getAuthDataAction();

  if (!data) {
    return <div>로그인 후 이용해주세요.</div>;
  }

  return (
    <main className={clsx("mt-[var(--header-height)] p-3", "flex flex-col gap-3")}>
      <SubHeaderContainer title="My Profile" />
      <div className="mt-[45px]">
        <div className="flex flex-col gap-2">
          <Email email={data.email} />
          <CreatedDate createdAt={data.createdAt.toISOString()} />
          <Nickname id={data.id} nickname={data.nickname} />
        </div>
      </div>
    </main>
  );
}
