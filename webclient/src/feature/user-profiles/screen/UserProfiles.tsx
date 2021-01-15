import { User } from "@sf-test/shared/graphql/generated/schema";
import React, { ChangeEvent } from "react";
import { Container, Modal } from "../../../common/component";
import { colors, maxWidth } from "../../../common/theme/light";
import {
  CreateUserCard,
  UpdateUserCard,
  UsersList,
  UsersListComponentReferenceProps,
} from "../component";
import "../styles/user-profiles.scss";

const Component: React.FC<{}> = () => {
  const [isCreateUserModalVisible, displayCreateUserModal] = React.useState(
    false
  );
  const [isUpdateUserModalVisible, displayUpdateUserModal] = React.useState(
    false
  );
  const [searchQuery, setSearchQuery] = React.useState<string>();
  const [currentUserItem, setCurrentUserItem] = React.useState<User>();
  const usersListRef = React.createRef<UsersListComponentReferenceProps>();

  const onDisplayCreateUserModal = () => {
    displayCreateUserModal(!isCreateUserModalVisible);
  };

  const onDisplayUpdateUserModal = () => {
    displayUpdateUserModal(!isUpdateUserModalVisible);
  };

  const onCreateUserSuccess = () => {
    usersListRef.current?.refetch();
    onDisplayCreateUserModal();
  };

  const onUpdateUserSuccess = () => {
    usersListRef.current?.refetch();
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
        <div className="row">
          <div className="col-lg-6">
            <h1>Users List</h1>
          </div>
          <div className="col"></div>
          <div className="col-lg-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search..."
              value={searchQuery}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(event.currentTarget.value);
                usersListRef.current?.search(event.currentTarget.value);
              }}
            />
          </div>
        </div>
        <UsersList
          onUpdateUserItem={onUpdateUserItem}
          onDisplayCreateUserModal={onDisplayCreateUserModal}
          ref={usersListRef}
        />
      </div>
    </Container>
  );
};

export const UserProfiles = Component;
