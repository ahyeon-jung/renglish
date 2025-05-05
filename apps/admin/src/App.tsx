import { Admin, Resource } from "react-admin";
import { SceneList, SceneCreate, SceneShow } from "./resources/scenes";
import authProvider from "./provider/authProvider";
import LoginPage from "./pages/Login";
import RESOURCE from "./constants/resource";
import dataProvider from "./provider/dataProvider";
import { StudyCreate, StudyEdit, StudyList, StudyShow } from "./resources/studies";
import { UserList, UserShow } from "./resources/users";
import { MovieList, MovieShow, MovieCreate } from "./resources/movies";
import ExpressionsList from "./resources/expressions/list";
import { ExpressionCreate } from "./resources/expressions";
import SpeakerList from "./resources/speakers/list";
import SpeakerCreate from "./resources/speakers/create";
import DialogueCreate from "./resources/dialogues/create";
import DialogueList from "./resources/dialogues/list";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={LoginPage}>
    <Resource name={RESOURCE.SCENES} list={SceneList} create={SceneCreate} show={SceneShow} />
    <Resource
      name={RESOURCE.STUDIES}
      list={StudyList}
      show={StudyShow}
      edit={StudyEdit}
      create={StudyCreate}
    />
    <Resource name={RESOURCE.SPEAKERS} list={SpeakerList} create={SpeakerCreate} />
    <Resource name={RESOURCE.USERS} list={UserList} show={UserShow} />
    <Resource name={RESOURCE.DIALOGUES} list={DialogueList} create={DialogueCreate} />
    <Resource name={RESOURCE.MOVIES} list={MovieList} show={MovieShow} create={MovieCreate} />
    <Resource name={RESOURCE.EXPRESSIONS} list={ExpressionsList} create={ExpressionCreate} />
  </Admin>
);
