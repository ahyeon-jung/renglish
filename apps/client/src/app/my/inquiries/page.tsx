import ListContainer from "../_components/ListContainer";
import SubHeaderContainer from "@/components/SubheaderContainer";
import clsx from "clsx";

export default async function Inquiries() {
  return (
    <main className={clsx("mt-[var(--header-height)] p-3", "flex flex-col gap-3")}>
      <SubHeaderContainer title="My Inquiry List" />
      <div className="mt-[45px]">
        <ListContainer title="미완료된 문의">
          <div></div>
        </ListContainer>
        <ListContainer title="완료된 문의">
          <div></div>
        </ListContainer>
      </div>
    </main>
  );
}
