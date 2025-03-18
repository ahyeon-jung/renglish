"use client";

import Dialogues, { Dialogue } from "../Dialogues";
import Movie, { MovieType } from "../Scene";
import Speakers, { Speaker } from "../Speakers";

import Button from "@/components/Button";
import { useState } from "react";

type ScriptAddBody = {
  movie: MovieType;
  dialogues: Dialogue[];
  speaker: Speaker[];
};

const INITIAL_SCRIPT_ADD_BODY = {
  movie: {
    title: "",
    imageUrl: "",
    studiedAt: "",
    description: "",
  },
  speaker: [],
  dialogues: [],
};

export default function ScriptForm() {
  const [scriptAddBody, setScriptAddBody] = useState<ScriptAddBody>(
    INITIAL_SCRIPT_ADD_BODY
  );

  const updateMovie = (newMovie: Partial<MovieType>) => {
    setScriptAddBody((prev) => ({
      ...prev,
      movie: { ...prev.movie, ...newMovie },
    }));
  };

  const updateDialogues = (dialogues: Dialogue[]) => {
    setScriptAddBody((prev) => ({
      ...prev,
      dialogues,
    }));
  };

  const addSpeaker = (speaker: Speaker) => {
    setScriptAddBody((prev) => ({
      ...prev,
      speaker: [...prev.speaker, speaker],
    }));
  };

  const handleScriptAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(scriptAddBody);
  };

  const isAvailableSubmitButton = scriptAddBody.dialogues.length !== 0;

  return (
    <form onSubmit={handleScriptAddSubmit} className="flex flex-col gap-3">
      <Movie movie={scriptAddBody.movie} setMovie={updateMovie} />
      <Speakers speakers={scriptAddBody.speaker} addSpeaker={addSpeaker} />
      <Dialogues
        dialogues={scriptAddBody.dialogues}
        setDialogues={updateDialogues}
      />
      <Button type="submit" disabled={!isAvailableSubmitButton}>
        Upload
      </Button>
    </form>
  );
}
