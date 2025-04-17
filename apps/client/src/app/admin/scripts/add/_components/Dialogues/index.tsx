'use client';

import { FunnelContext, FunnelContextType } from '@/hooks/useFunnel';
import { SCRIPT_ADD_STEP, ScriptAddStepType } from '../../_constants/step';
import { useContext, useEffect, useRef, useState } from 'react';

import { ScriptAddBodyType } from '../../page';
import StepFormContainer from '../StepFormContainer';
import { PaginationSceneDto, Speaker } from '@renglish/services';
import Field from '@/components/Field';
import getScenes from '@/app/actions/scenes/getScenes';
import addDialogueAction from '@/app/actions/dialogues/addDialogue';

type ScriptAddDialogueBodyType = string;

export type ScriptAddDialoguesBodyType = ScriptAddDialogueBodyType[];

export default function Dialogues() {
  const { setStep } = useContext(FunnelContext) as FunnelContextType<
    ScriptAddStepType,
    ScriptAddBodyType
  >;
  const [mode, setMode] = useState<'html' | 'text'>('text');
  const [scenes, setScenes] = useState<PaginationSceneDto[]>([]);
  const [selectedScene, setSelectedScene] = useState<{ id: string; speakers: Speaker[] }>({
    id: '',
    speakers: [],
  });
  const [dialoguesBody, setDialoguesBody] = useState(`<p>Speaker Name</p>
<p>English dialogue</p>
<p>Korean dialogue</p>
    
<p>Speaker Name</p>
<p>English dialogue</p>
<p>Korean dialogue</p>`);
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
      const filteredSuggestions = scenes
        .filter((scene) => scene.id === selectedScene.id)[0]
        .speakers.filter((name) => name.speakerName.toLowerCase().includes(lastWord.toLowerCase()))
        .map((speaker) => speaker.speakerName);

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

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value as 'html' | 'text';

    if (newMode === 'html' && mode === 'text') {
      setDialoguesBody(convertTextToHtml(dialoguesBody));
    } else if (newMode === 'text' && mode === 'html') {
      setDialoguesBody(convertHtmlToText(dialoguesBody));
    }

    setMode(newMode);
  };

  const handleNextClick = async () => {
    if (!dialoguesBody) {
      alert('값을 입력해주세요.');
      return;
    }
    const formattedDialogues = dialoguesBody.split('\n\n').map((dialogue, index) => {
      const [speaker, english, korean] = dialogue.split('\n');
      if (!speaker || !english || !korean) {
        return;
      }

      const speakerId = selectedScene.speakers.find(
        (selectedSpeaker) => selectedSpeaker.speakerName === speaker,
      )?.id;
      if (!speakerId) {
        alert('올바른 형식으로 입력해주세요');
        return;
      }

      const formattedEnglish = `<p>${english.replace(/\*\*(.*?)\*\*/g, "<span class='keypoint'>$1</span>")}</p>`;
      const formattedKorean = `<p>${korean}</p>`;

      return {
        speakerId: speakerId,
        english_script: formattedEnglish,
        korean_script: formattedKorean,
        order: index,
      };
    });

    for (const dialogue of formattedDialogues) {
      if (!dialogue) {
        continue;
      }

      await addDialogueAction(selectedScene.id, dialogue.speakerId, {
        englishScript: dialogue.english_script,
        koreanScript: dialogue.korean_script,
        order: dialogue.order,
      });
    }
    setStep(SCRIPT_ADD_STEP.SUBMIT_CONFIRM);
  };

  useEffect(() => {
    const loadScenes = async () => {
      const fetched = await getScenes({ offset: 1, limit: 100 });
      setScenes(fetched.data.data);
    };
    loadScenes();
  }, []);

  return (
    <StepFormContainer onNext={handleNextClick}>
      <Field>
        <Field.Label>Scene</Field.Label>
        <Field.Select
          options={scenes.map(({ id, title }) => ({ value: id, label: title }))}
          value={selectedScene.id}
          onChange={(e) =>
            setSelectedScene({
              id: e.target.value,
              speakers: scenes.find((scene) => scene.id === e.target.value)?.speakers ?? [],
            })
          }
        />
      </Field>
      <input
        type="file"
        accept="application/json"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const json = JSON.parse(event.target?.result as string);
              setDialoguesBody(
                json.dialogues
                  .map(
                    (dialogue: {
                      speaker: string;
                      english_script: string;
                      korean_script: string;
                    }) => `${dialogue.speaker}
${dialogue.english_script
  .replace(/^<p>/, '')
  .replace(/<\/p>$/, '')
  .replace(/<span class='keypoint'>(.*?)<\/span>/g, '**$1**')}
${dialogue.korean_script.replace(/^<p>/, '').replace(/<\/p>$/, '')}`,
                  )
                  .join('\n\n'),
              );
            } catch (err) {
              console.error('JSON 파싱 에러:', err);
              alert('올바른 JSON 파일을 업로드해주세요.');
            }
          };
          reader.readAsText(file);
        }}
        className="mt-2"
      />

      <div className="flex gap-3">
        <div>*Speakers: </div>
        {selectedScene.speakers.map((speaker, index) => (
          <div key={index}>{speaker.speakerName}</div>
        ))}
      </div>
      <Field>
        <Field.Label>Mode</Field.Label>
        <Field.Select
          options={[
            { value: 'html', label: 'HTML' },
            { value: 'text', label: 'Text' },
          ]}
          value={mode}
          onChange={handleModeChange}
        />
      </Field>
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

function convertTextToHtml(text: string): string {
  return text
    .split('\n\n')
    .map((dialogue) => {
      const [speaker, english, korean] = dialogue.split('\n');
      const formattedEnglish = `<p>${english?.replace(/\*\*(.*?)\*\*/g, "<span class='keypoint'>$1</span>")}</p>`;
      const formattedKorean = `<p>${korean}</p>`;
      return `${speaker}\n${formattedEnglish}\n${formattedKorean}`;
    })
    .join('\n\n');
}

function convertHtmlToText(html: string): string {
  return html
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '')
    .replace(/<span class='keypoint'>(.*?)<\/span>/g, '**$1**');
}
