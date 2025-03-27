import SceneNav, { SceneNav as SceneNavType } from '../SceneNav';

import SubHeaderContainer from '@/components/SubheaderContainer';
import { formatTitle } from '@/utils/format';

type Header = { title: string } & SceneNavType & React.PropsWithChildren;

export default function SceneHeader({ title, children, ...props }: Header) {
  return (
    <SubHeaderContainer title={formatTitle(title)}>
      {children}
      <SceneNav {...props} />
    </SubHeaderContainer>
  );
}
