import React from "react";
import { createApi } from "unsplash-js";
import "../styles/user-profiles.scss";

const Component: React.FC<{}> = () => {
  const unsplash = createApi({
    accessKey: "M7OEt-7IehthODdsfvQlaxxt6KfnpktzZYekCrHqyKw",
  });

  const [url, setURL] = React.useState();

  React.useEffect(() => {
    getRandomProfilePic();
  }, []);

  const getRandomProfilePic = async () => {
    try {
      const result = await unsplash.photos.getRandom({
        query: "face",
      });

      const { urls } = result.response;

      setURL(urls.thumb);
    } catch (error) {
      console.log(error);
    }
  };

  return <span style={{ backgroundImage: `url(${url})` }}></span>;
};

export const ProfilePicture = Component;
