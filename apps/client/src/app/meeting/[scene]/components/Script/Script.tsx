"use client";

import Text from "@/components/Text";
import getScene from "@/app/actions/scenes/getScene";
import { parseText } from "@/utils/content";
import { useUserStore } from "@/stores/userStore";
import { useDataFetching } from "@/hooks/useDataFetching";
import DialogListContainer from "@/app/movies/[movie]/[scene]/_components/DialogListContainer";
import DialogListItem from "@/app/movies/[movie]/[scene]/_components/DialogListItem";
import AudioBox from "@/app/movies/[movie]/[scene]/_components/AudioBox";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { SCRIPT_MODE_SEARCH } from "@/constants/script-mode";

type ScriptProps = {
  scene: string; // 제목 혹은 id
};

const SCRIPT_MODE = {
  BLANK: "blank",
  ENGLISH: "english",
  KOREAN: "korean",
  DUAL: "dual",
};

export default function Script({ scene }: ScriptProps) {
  const { userId } = useUserStore();
  const searchParams = useSearchParams();
  const mode = searchParams.get(SCRIPT_MODE_SEARCH);

  const { data, isLoading } = useDataFetching({
    queryKey: ["scene", scene, userId ?? ""],
    queryFn: () => getScene(scene),
    enabled: !!scene,
  });

  if (isLoading) {
    return (
      <main className="mt-[var(--header-height)] p-3">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 bg-gray-200 rounded" />
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-16 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!data?.data) return null;

  const script = data.data;

  return (
    <main className="mt-[var(--header-height)] py-3">
      <DialogListContainer>
        {script.audioUrl && <AudioBox audioUrl={script.audioUrl} />}
        {script.dialogues.map((dialogue, index) => {
          return (
            <DialogListItem key={index} speaker={dialogue.speaker} isBackground>
              {mode === SCRIPT_MODE.BLANK ? (
                <div>
                  <Text>
                    {parseText(
                      dialogue.englishScript,
                      dialogue.speaker.speakerType === "a"
                        ? "text-gray-50 border-black border-b"
                        : "text-[#f0f0f0] border-black border-b",
                    )}
                  </Text>
                  <Text className="text-gray-500">{parseText(dialogue.koreanScript)}</Text>
                </div>
              ) : mode === SCRIPT_MODE.ENGLISH ? (
                <div>
                  <Text>{parseText(dialogue.englishScript)}</Text>
                </div>
              ) : mode === SCRIPT_MODE.KOREAN ? (
                <div>
                  <Text>{parseText(dialogue.koreanScript)}</Text>
                </div>
              ) : (
                <div>
                  <Text>{parseText(dialogue.englishScript)}</Text>
                  <Text className="text-gray-500">{parseText(dialogue.koreanScript)}</Text>
                </div>
              )}
            </DialogListItem>
          );
        })}
      </DialogListContainer>
    </main>
  );
}
