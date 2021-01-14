import moment from "moment";
import React from "react";
import { Container } from "../../../common/component";
import DependencyContext from "../../../common/context/DependencyContext";
import { colors, maxWidth } from "../../../common/theme/light";
import { ProfilePicture } from "../component";
import { UserProfilesModel } from "../model/UserProfilesModel";
import "../styles/user-profiles.scss";

const Component: React.FC<{}> = () => {
  const container = React.useContext(DependencyContext);
  const userProfilesModel = container.get<UserProfilesModel>(
    UserProfilesModel.type
  );

  const {
    execute: executeGetUsersQuery,
    data: getUsersData,
    error: getUsersError,
  } = userProfilesModel.useGetUsersQuery();

  React.useEffect(() => {
    executeGetUsersQuery({ pageSize: "6" });
  }, []);

  return (
    <Container
      bgColor={colors.whitesmoke}
      maxWidth={maxWidth.large}
      minHeight="100vh"
    >
      <div id="user-profiles">
        <h1>Users List</h1>
        {!Boolean(getUsersData?.items) ? (
          <section>No results to show</section>
        ) : (
          <section id="list">
            {getUsersData?.items?.map((item, i) => (
              <article className="item" key={i}>
                <div>
                  <div className="actions">
                    <span className="edit">icon</span>
                  </div>
                  <div className="profile-picture">
                    <ProfilePicture />
                  </div>
                  <div className="name-created-at">
                    <span className="name">{item?.name}</span>
                    <div className="created-at">
                      <span>created:</span>{" "}
                      {moment(item?.createdAt).format("DD MMM YYYY")}
                    </div>
                  </div>
                  <p className="description">{item?.description}</p>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </Container>
  );
};

export const UserProfiles = Component;
