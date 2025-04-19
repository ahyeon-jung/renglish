'use client';

import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { use } from 'react';
import { useDataFetching } from '@/hooks/useDataFetching';
import { getTokenInClient } from '@/utils/cookie';
import { parseText } from '@/utils/content';
import getScene from '@/app/actions/scenes/getScene';
import { Scene } from '@/types/scene';
import Button from '@/components/Button';

type DownloadMode = 'english' | 'korean' | 'dual';

const PrintableScene = ({
  scene,
  title,
  downloadMode,
}: {
  scene: Scene;
  title: string;
  downloadMode: DownloadMode;
}) => {
  return (
    <div>
      <h1>{title.replaceAll('%20', ' ')}</h1>
      <ul className="flex flex-col gap-3">
        {scene.dialogues.map((dialogue: any, idx: number) => (
          <li key={idx} className="flex gap-3">
            <div className="font-bold"> - </div>
            <div>
              {downloadMode === 'english' && parseText(dialogue.englishScript, 'text-bold')}
              {downloadMode === 'korean' && parseText(dialogue.koreanScript, 'text-bold')}
              {downloadMode === 'dual' && (
                <>
                  <div>{parseText(dialogue.englishScript, 'text-bold')}</div>
                  <div className="text-gray-500">{parseText(dialogue.koreanScript, 'text-bold')}</div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function MovieSceneEnglishScript({
  params,
}: {
  params: Promise<{ movie: string; scene: string }>;
}) {
  const [downloadMode, setDownloadMode] = useState<DownloadMode | null>(null);
  const resolvedParams = use(params);
  const token = getTokenInClient() || '';

  const { data, isLoading } = useDataFetching({
    queryKey: ['scene', resolvedParams.scene, token],
    queryFn: () => getScene(resolvedParams.scene),
    enabled: !!resolvedParams.scene,
  });

  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resolvedParams.movie}_Scene`,
  });

  useEffect(() => {
    if (downloadMode) {
      handlePrint?.();
    }
  }, [downloadMode]);

  if (isLoading) return <div>Loading...</div>;
  if (!data?.data) return null;

  const scene = data.data;

  return (
    <div>
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <PrintableScene scene={scene} title={resolvedParams.movie} downloadMode={downloadMode || 'english'} />
        </div>
      </div>

      <main className="mt-[var(--header-height)] p-3 space-y-2">
        <Button onClick={() => setDownloadMode('english')}>English only script download</Button>
        <Button onClick={() => setDownloadMode('korean')}>Korean only script download</Button>
        <Button onClick={() => setDownloadMode('dual')}>Dual script download</Button>
      </main>
    </div>
  );
}
