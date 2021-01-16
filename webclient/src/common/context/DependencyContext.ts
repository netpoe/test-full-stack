import { Container } from "inversify";
import React from "react";
import { UserProfilesModel } from "../../feature/user-profiles/model/UserProfilesModel";

export const container = new Container();

container
  .bind<UserProfilesModel>(UserProfilesModel.type)
  .to(UserProfilesModel)
  .inSingletonScope();

export const DependencyContext = React.createContext(container);

export default DependencyContext;
