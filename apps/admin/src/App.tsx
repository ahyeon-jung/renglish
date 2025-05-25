import { Admin, Resource } from "react-admin";
import LoginPage from "./pages/Login";
import authProvider from "./provider/authProvider";
import dataProvider from "./provider/dataProvider";
import resources from "./resource";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={LoginPage}>
    {resources.map((res) => (
      <Resource key={res.name} {...res} />
    ))}
  </Admin>
);
