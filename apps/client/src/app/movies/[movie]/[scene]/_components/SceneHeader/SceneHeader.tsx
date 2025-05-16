import SceneNav from "../SceneNav";

import SubHeaderContainer from "@/components/SubheaderContainer";
import { formatTitle } from "@/utils/format";
import { SceneNavProps } from "../SceneNav/SceneNav";
import { AlignJustify, Info as InfoIcon } from "lucide-react";
import Link from "next/link";
import { PATHS } from "@/constants/path";

type Header = { title: string } & Omit<SceneNavProps, "iconSize"> & React.PropsWithChildren;

export default function SceneHeader({ title, children, movieId, sceneId }: Header) {
  const iconSize = 21;

  return (
    <SubHeaderContainer title={formatTitle(title)}>
      {children}
      <div className="flex gap-2 items-center">
        <Link href={PATHS.MOVIE.DETAIL(movieId)} title="영화 상세 정보">
          <InfoIcon size={iconSize} />
        </Link>
        <Link href={PATHS.MOVIE.LIST} title="목록으로 돌아가기">
          <AlignJustify size={iconSize} />
        </Link>
        <SceneNav iconSize={iconSize} movieId={movieId} sceneId={sceneId} />
      </div>
    </SubHeaderContainer>
  );
}
