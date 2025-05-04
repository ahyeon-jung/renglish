import Script from "./components/Script";
import WebRTCClients from "./components/WebRTCClients";

export default async function MeetingScenePage(
  { params }: { params: Promise<{ scene: string }> }
) {
  const slug = await params;

  return (
    <div>
      <Script />
      <WebRTCClients sceneId={slug.scene} />
    </div>
  )
}