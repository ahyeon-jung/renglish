'use client';

import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';
import { useContext, useRef, useState } from 'react';

import { ScriptAddBodyType } from '../../page';
import StepFormContainer from '../StepFormContainer';

type ScriptAddDialogueBodyType = {
  speaker: string;
  english_script: string;
  korean_script: string;
  order: number;
};

export type ScriptAddDialoguesBodyType = ScriptAddDialogueBodyType[];

export default function Dialogues() {
  const {
    data: { speakers },
    setStep,
    setData,
  } = useContext(FunnelContext) as FunnelContextType<ScriptAddStepType, ScriptAddBodyType>;

  const [dialoguesBody, setDialoguesBody] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cursorPosition, setCursorPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleDialoguesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setDialoguesBody(input);

    const words = input.split('\n');
    const lastWord = input.split('\n')[words.length - 1];

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
    if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      setDialoguesBody((prev) => {
        const words = prev.split('\n').slice(0, -1);

        return words.join('\n') + suggestions[0];
      });
      setSuggestions([]);
    }
  };

  const handleNextClick = () => {
    if (!dialoguesBody) {
      alert('값을 입력해주세요.');
      return;
    }
    const formattedDialogues = dialoguesBody
      .split('\n\n')
      .map((dialogue, index): ScriptAddDialogueBodyType | undefined => {
        const [speaker, english, korean] = dialogue.split('\n');

        if (!speaker || !english || !korean) {
          return;
        }

        const formattedEnglish = `<p>${english.replace(/\*\*(.*?)\*\*/g, "<span class='keypoint'>$1</span>")}</p>`;
        const formattedKorean = `<p>${korean}</p>`;
        return {
          speaker,
          english_script: formattedEnglish,
          korean_script: formattedKorean,
          order: index,
        };
      });

    if (formattedDialogues.some((dialogue) => dialogue === undefined)) {
      alert('올바른 형식으로 입력해주세요');
      return;
    }

    setData((prev) => ({ ...prev, dialogues: formattedDialogues as ScriptAddDialoguesBodyType }));
    setStep(SCRIPT_ADD_STEP.SUBMIT_CONFIRM);
  };

  return (
    <StepFormContainer header="Conversation" onNext={handleNextClick}>
      <textarea
        ref={textareaRef}
        className="border w-full p-2 rounded-lg"
        rows={25}
        value={dialoguesBody}
        onChange={handleDialoguesChange}
        onKeyDown={handleKeyDown}
        placeholder={`
          Enter conversation in the following format:

          {Speaker Name}
          {English dialogue}
          {Korean dialogue}
          
          (Separate each dialogue set with a blank line.)
          
          Formatting tips:
          - Wrap a word with **{word}** to make it a keypoint.
          - It will be blank in blank mode.
          - Start typing a speaker's name to see suggestions for full names.
          `}
      />
      {suggestions.length > 0 && (
        <ul
          className="bg-gray-300 rounded-lg"
          style={{
            position: 'absolute',
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
    </StepFormContainer>
  );
}
