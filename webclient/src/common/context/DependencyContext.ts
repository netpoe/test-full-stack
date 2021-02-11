import { Container, decorate, injectable } from "inversify";
import React from "react";
import { UserProfilesModel } from "../../feature/user-profiles/model/UserProfilesModel";

decorate(injectable(), UserProfilesModel);

export const container = new Container();

container
  .bind<UserProfilesModel>(UserProfilesModel.type)
  .to(UserProfilesModel)
  .inSingletonScope();

export const DependencyContext = React.createContext(container);

export default DependencyContext;
