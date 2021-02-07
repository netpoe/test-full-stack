import { Container } from "inversify";
import React from "react";
import { UserProfilesModel } from "./UserProfilesModel.mock";

export const container = new Container();

container
  .bind<UserProfilesModel>(UserProfilesModel.type)
  .to(UserProfilesModel)
  .inSingletonScope();

export const DependencyContext = React.createContext(container);

export default DependencyContext;
