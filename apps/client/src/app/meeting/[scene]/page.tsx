import { Suspense } from "react";
import Script from "./components/Script";
import ScriptModeSelector from "./components/ScriptModeSelector";
import WebRTCClients from "./components/WebRTCClients";

export default async function MeetingScenePage({ params }: { params: Promise<{ scene: string }> }) {
  const slug = await params;

  return (
    <Suspense>
      <div>
        <ScriptModeSelector />
        <Script scene={slug.scene} />
        <WebRTCClients sceneId={slug.scene} />
      </div>
    </Suspense>
  );
}
