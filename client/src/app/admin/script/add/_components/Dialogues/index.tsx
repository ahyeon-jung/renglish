"use client";

import { useRef, useState } from "react";

import Button from "@/components/Button";
import { Speaker } from "../Speakers";
import Text from "@/components/Text";

export type Dialogue = {
  speaker: string;
  english_script: string;
  korean_script: string;
  order: number;
};

type Dialogues = {
  speakers: Speaker[];
  dialogues: Dialogue[];
  setDialogues: (dialogues: Dialogue[]) => void;
};

export default function Dialogues({ speakers, setDialogues }: Dialogues) {
  const [dialoguesBody, setDialoguesBody] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleDialoguesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setDialoguesBody(input);

    const words = input.split("\n");
    const lastWord = input.split("\n")[words.length - 1];

    if (lastWord) {
      const filteredSuggestions = speakers
        .map((speaker) => speaker.speaker_name)
        .filter((name) => name.toLowerCase().includes(lastWord.toLowerCase()));

      setSuggestions(filteredSuggestions);
      if (textareaRef.current) {
        const rect = textareaRef.current.getBoundingClientRect();

        const lineHeight = 24;
        const cursorTop = rect.top + lineHeight * words.length + 8;
        const cursorLeft = rect.left;

        setCursorPosition({ top: cursorTop, left: cursorLeft });
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      setDialoguesBody((prev) => {
        const words = prev.split("\n").slice(0, -1);

        return words.join("\n") + suggestions[0];
      });
      setSuggestions([]);
    }
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
        ref={textareaRef}
        className="border w-full p-2 rounded-lg"
        rows={10}
        value={dialoguesBody}
        onChange={handleDialoguesChange}
        onKeyDown={handleKeyDown}
        placeholder="Type speaker's name"
      />
      {suggestions.length > 0 && (
        <ul
          className="bg-gray-300 rounded-lg"
          style={{
            position: "absolute",
            top: `${cursorPosition.top}px`,
            left: `${cursorPosition.left}px`,
            width: `${textareaRef.current?.offsetWidth}px`,
            zIndex: 10,
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer py-1 px-2 hover:bg-gray-200"
              onClick={() => {
                setDialoguesBody(suggestion);
                setSuggestions([]);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
