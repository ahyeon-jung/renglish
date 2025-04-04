import { Scene } from '@/types/scene';
import { formatDate } from '@/utils/format';

type TitleProps = Pick<Scene, 'title' | 'studiedAt'>;
export default function Title({ title, studiedAt }: TitleProps) {
  return (
    <div className="flex gap-2">
      <div>
        <span className="font-semibold">Renglish</span> - <span>{title}</span>
      </div>
      <div>{formatDate(studiedAt, 'long')}</div>
    </div>
  );
}
