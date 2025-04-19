import SceneNav from '../SceneNav';

import SubHeaderContainer from '@/components/SubheaderContainer';
import { formatTitle } from '@/utils/format';
import { SceneNavProps } from '../SceneNav/SceneNav';

type Header = { title: string } & SceneNavProps & React.PropsWithChildren;

export default function SceneHeader({ title, children, ...props }: Header) {
  return (
    <SubHeaderContainer title={formatTitle(title)}>
      {children}
      <SceneNav {...props} />
    </SubHeaderContainer>
  );
}
