import { User } from "@sf-test/shared/graphql/generated/schema";
import moment from "moment";
import React from "react";
import { Container, Modal } from "../../../common/component";
import DependencyContext from "../../../common/context/DependencyContext";
import { colors, maxWidth } from "../../../common/theme/light";
import { CreateUserCard, ProfilePicture, UpdateUserCard } from "../component";
import { UserProfilesModel } from "../model/UserProfilesModel";
import "../styles/user-profiles.scss";

const Component: React.FC<{}> = () => {
  const [isCreateUserModalVisible, displayCreateUserModal] = React.useState(
    false
  );
  const [isUpdateUserModalVisible, displayUpdateUserModal] = React.useState(
    false
  );
  const [currentUserItem, setCurrentUserItem] = React.useState<User>();

  const container = React.useContext(DependencyContext);
  const userProfilesModel = container.get<UserProfilesModel>(
    UserProfilesModel.type
  );

  const {
    execute: executeGetUsersQuery,
    data: getUsersData,
    error: getUsersError,
    loading: isGetUsersQueryLoading,
  } = userProfilesModel.useGetUsersQuery();

  React.useEffect(() => {
    executeGetUsersQuery({ pageSize: "6" });
  }, []);

  const onDisplayCreateUserModal = () => {
    displayCreateUserModal(!isCreateUserModalVisible);
  };

  const onDisplayUpdateUserModal = () => {
    displayUpdateUserModal(!isUpdateUserModalVisible);
  };

  const onCreateUserSuccess = () => {
    executeGetUsersQuery({ pageSize: "6" });
    onDisplayCreateUserModal();
  };

  const onUpdateUserSuccess = () => {
    executeGetUsersQuery({ pageSize: "6" });
    onDisplayUpdateUserModal();
  };

  const onUpdateUserItem = (user: User) => {
    setCurrentUserItem(user);
    onDisplayUpdateUserModal();
  };

  return (
    <Container
      bgColor={colors.whitesmoke}
      maxWidth={maxWidth.large}
      minHeight="100vh"
    >
      <Modal visible={isCreateUserModalVisible}>
        <CreateUserCard
          onCancel={onDisplayCreateUserModal}
          onSuccess={onCreateUserSuccess}
        />
      </Modal>

      <Modal visible={isUpdateUserModalVisible}>
        <UpdateUserCard
          onCancel={onDisplayUpdateUserModal}
          onSuccess={onUpdateUserSuccess}
          user={currentUserItem as User}
        />
      </Modal>

      <div id="user-profiles">
        <h1>Users List</h1>

        {isGetUsersQueryLoading ? (
          <p>Loading...</p>
        ) : !Boolean(getUsersData?.items) ? (
          <section id="list">
            <article className="item">
              <div className="card">
                <div className="actions"></div>
                <div className="profile-picture">
                  <ProfilePicture preventImageFetch={true} />
                </div>
                <div className="name-created-at">
                  <span className="name">No items</span>
                </div>
                <p className="description">Create your first one</p>
              </div>
            </article>
          </section>
        ) : (
          <section id="list">
            <article className="item">
              <div className="card">
                <div className="actions"></div>
                <div className="profile-picture">
                  <ProfilePicture preventImageFetch={true} />
                </div>
                <div className="name-created-at">
                  <button
                    className="btn btn-outline-primary full-width btn-lg"
                    onClick={onDisplayCreateUserModal}
                  >
                    Create a user
                  </button>
                </div>
              </div>
            </article>
            {getUsersData?.items?.map((item, i) => (
              <article className="item" key={i}>
                <div className="card">
                  <div className="actions">
                    <span
                      className="edit icon-pencil"
                      onClick={() => {
                        onUpdateUserItem(item as User);
                      }}
                    ></span>
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
