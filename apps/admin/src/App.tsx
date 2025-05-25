import { BookOpenText, CircleUserRound, Clapperboard, Image, MessageSquare, NotebookPen, Speech, } from "lucide-react";
import { Admin, Resource } from "react-admin";
import RESOURCE from "./constants/resource";
import LoginPage from "./pages/Login";
import authProvider from "./provider/authProvider";
import dataProvider from "./provider/dataProvider";
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

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={LoginPage}>
    <Resource
      icon={Image}
      name={RESOURCE.SCENES}
      list={SceneList}
      create={SceneCreate}
      show={SceneShow}
    />
    <Resource
      icon={BookOpenText}
      name={RESOURCE.STUDIES}
      list={StudyList}
      show={StudyShow}
      edit={StudyEdit}
      create={StudyCreate}
    />
    <Resource
      icon={Speech}
      name={RESOURCE.SPEAKERS}
      list={SpeakerList}
      create={SpeakerCreate}
    />
    <Resource
      icon={CircleUserRound}
      name={RESOURCE.USERS}
      list={UserList}
      show={UserShow}
    />
    <Resource
      icon={MessageSquare}
      name={RESOURCE.DIALOGUES}
      list={DialogueList}
      create={DialogueCreate}
    />
    <Resource
      icon={Clapperboard}
      name={RESOURCE.MOVIES}
      list={MovieList}
      show={MovieShow}
      create={MovieCreate}
    />
    <Resource
      icon={NotebookPen}
      name={RESOURCE.EXPRESSIONS}
      list={ExpressionsList}
      create={ExpressionCreate}
    />
  </Admin>
);
