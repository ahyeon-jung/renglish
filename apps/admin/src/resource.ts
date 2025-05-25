import { BookOpenText, CircleUserRound, Clapperboard, Image, MessageSquare, NotebookPen, Speech } from "lucide-react";
import RESOURCE from "./constants/resource";

import DialogueCreate from "./resources/dialogues/create";
import DialogueList from "./resources/dialogues/list";

import { ExpressionCreate } from "./resources/expressions";
import ExpressionsList from "./resources/expressions/list";

import { MovieCreate, MovieList, MovieShow } from "./resources/movies";

import { SceneCreate, SceneList, SceneShow } from "./resources/scenes";

import SpeakerCreate from "./resources/speakers/create";
import SpeakerList from "./resources/speakers/list";

import { StudyCreate, StudyEdit, StudyList, StudyShow } from "./resources/studies";

import { UserList, UserShow } from "./resources/users";

const resources = [
  {
    name: RESOURCE.SCENES,
    icon: Image,
    list: SceneList,
    create: SceneCreate,
    show: SceneShow,
  },
  {
    name: RESOURCE.STUDIES,
    icon: BookOpenText,
    list: StudyList,
    create: StudyCreate,
    show: StudyShow,
    edit: StudyEdit,
  },
  {
    name: RESOURCE.SPEAKERS,
    icon: Speech,
    list: SpeakerList,
    create: SpeakerCreate,
  },
  {
    name: RESOURCE.USERS,
    icon: CircleUserRound,
    list: UserList,
    show: UserShow,
  },
  {
    name: RESOURCE.DIALOGUES,
    icon: MessageSquare,
    list: DialogueList,
    create: DialogueCreate,
  },
  {
    name: RESOURCE.MOVIES,
    icon: Clapperboard,
    list: MovieList,
    show: MovieShow,
    create: MovieCreate,
  },
  {
    name: RESOURCE.EXPRESSIONS,
    icon: NotebookPen,
    list: ExpressionsList,
    create: ExpressionCreate,
  },
];

export default resources;
