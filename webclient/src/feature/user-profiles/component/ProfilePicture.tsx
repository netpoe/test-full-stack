import React from "react";
import { createApi } from "unsplash-js";

type Props = {
  preventImageFetch?: boolean;
};

const Component: React.FC<Props> = ({ preventImageFetch = false }) => {
  const unsplash = createApi({
    accessKey: "M7OEt-7IehthODdsfvQlaxxt6KfnpktzZYekCrHqyKw",
  });

  const [url, setURL] = React.useState();

  React.useEffect(() => {
    if (preventImageFetch) {
      return;
    }

    getRandomProfilePic();
  }, []);

  if (preventImageFetch) {
    return <span className="icon-plus-circle"></span>;
  }

  const getRandomProfilePic = async () => {
    try {
      const result = await unsplash.photos.getRandom({
        query: "face",
        featured: true,
        orientation: "squarish",
        count: 30,
      });

      const { urls } = result.response[Math.floor(Math.random() * result.response.length)];

      setURL(urls.thumb);
    } catch (error) {
      console.log(error);
    }
  };

  return <span style={{ backgroundImage: `url(${url})` }}></span>;
};

export const ProfilePicture = Component;
