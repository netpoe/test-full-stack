import Amplify from "aws-amplify";
import React from "react";
import "./App.scss";
import DependencyContext, { container } from "./common/context/DependencyContext";
import { UserProfiles } from "./feature/user-profiles/screen";

Amplify.configure({
  aws_appsync_region: "us-west-2",
  aws_appsync_graphqlEndpoint:
    "https://rujtyvr2tvhkbbcibtfozaijyu.appsync-api.us-west-2.amazonaws.com/graphql",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-6bdqwskg35dlbagvx3h2y3vihm",
});

function App() {
  return (
    <DependencyContext.Provider value={container}>
      <UserProfiles />
    </DependencyContext.Provider>
  );
}

export default App;
