import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { SceneList, SceneCreate, SceneShow } from "./resources/scenes";
import StudyList from "./resources/studies/list";
import UserList from "./resources/users/list";
import authProvider from "./provider/authProvider";
import LoginPage from "./pages/Login";
import RESOURCE from "./constants/resource";
import dataProvider from "./provider/dataProvider";

import MovieList from "./resources/movies/list";
import ExpressionsList from "./resources/expressions/list";

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
  >
    <Resource name={RESOURCE.SCENES} list={SceneList} create={SceneCreate} show={SceneShow} />
    <Resource name={RESOURCE.STUDIES} list={StudyList} />
    <Resource name={RESOURCE.USERS} list={UserList} />
    <Resource name={RESOURCE.MOVIES} list={MovieList} />
    <Resource name={RESOURCE.EXPRESSIONS} list={ExpressionsList} />
  </Admin>
);
