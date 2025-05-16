"use client";

import DialogListContainer from "../../../../_components/DialogListContainer";
import ResultModal from "../ResultModal";
import WritingDialogue from "../WritingDialogue";
import { WritingDialogueType } from "@/types/dialogue";
import { useState } from "react";

type WritingDialoguesProps = { dialogues: WritingDialogueType[] };

export default function WritingDialogues({ dialogues }: WritingDialoguesProps) {
  const [writingDialogues, setWritingDialogues] = useState(dialogues);

  const handleWritingDialogueChange = (dialogueId: string, writing: string) => {
    setWritingDialogues((prev) =>
      prev.map((dialogue) =>
        dialogue.id === dialogueId ? { ...dialogue, writing_script: writing } : dialogue,
      ),
    );
  };
  return (
    <>
      <DialogListContainer>
        {writingDialogues.map((dialogue, index) => {
          return (
            <WritingDialogue key={index} {...dialogue} onChange={handleWritingDialogueChange} />
          );
        })}
      </DialogListContainer>
      <ResultModal dialogues={writingDialogues} />
    </>
  );
}
