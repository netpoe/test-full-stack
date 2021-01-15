import { User } from "@sf-test/shared/graphql/generated/schema";
import React from "react";
import { Container, Modal } from "../../../common/component";
import { colors, maxWidth } from "../../../common/theme/light";
import {
  ComponentReferenceProps as UsersListComponentReferenceProps,
  CreateUserCard,
  UpdateUserCard,
  UsersList,
} from "../component";
import "../styles/user-profiles.scss";

const Component: React.FC<{}> = () => {
  const [isCreateUserModalVisible, displayCreateUserModal] = React.useState(
    false
  );
  const [isUpdateUserModalVisible, displayUpdateUserModal] = React.useState(
    false
  );
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
        <h1>Users List</h1>
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
