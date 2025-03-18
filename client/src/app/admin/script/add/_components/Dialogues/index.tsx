"use client";

import Button from "@/components/Button";
import Text from "@/components/Text";
import { useState } from "react";

export type Dialogue = {
  speaker: string;
  english_script: string;
  korean_script: string;
  order: number;
};

type Dialogues = {
  dialogues: Dialogue[];
  setDialogues: (dialogues: Dialogue[]) => void;
};

export default function Dialogues({ setDialogues }: Dialogues) {
  const [dialoguesBody, setDialoguesBody] = useState("");

  const handleDialoguesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDialoguesBody(e.target.value);
  };

  const handleTransformDialoguesClick = () => {
    const formattedDialogues = dialoguesBody
      .split("\n\n")
      .map((dialogue, index): Dialogue => {
        const [speaker, english, korean] = dialogue.split("\n");
        const formattedEnglish = `<p>${english.replace(/\*\*(.*?)\*\*/g, "<span class='keypoint'>$1</span>")}</p>`;
        const formattedKorean = `<p>${korean}</p>`;
        return {
          speaker,
          english_script: formattedEnglish,
          korean_script: formattedKorean,
          order: index,
        };
      });
    setDialogues(formattedDialogues);
  };

  const isAvailableTransformButton = dialoguesBody;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Text as="h3" typography="display-md">
          Conversation
        </Text>
        <Button
          type="button"
          size="sm"
          fit
          disabled={!isAvailableTransformButton}
          onClick={handleTransformDialoguesClick}
        >
          transform
        </Button>
      </div>
      <textarea
        className="border w-full p-2 rounded-lg"
        rows={10}
        value={dialoguesBody}
        onChange={handleDialoguesChange}
      />
    </div>
  );
}
