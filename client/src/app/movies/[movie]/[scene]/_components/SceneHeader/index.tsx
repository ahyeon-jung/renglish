import SceneNav, { SceneNav as SceneNavType } from '../SceneNav';

import SubHeaderContainer from '@/components/SubheaderContainer';
import { formatTitle } from '@/utils/format';

type Header = { title: string } & SceneNavType;

export default function SceneHeader({ title, ...props }: Header) {
  return (
    <SubHeaderContainer title={formatTitle(title)}>
      <SceneNav {...props} />
    </SubHeaderContainer>
  );
}
