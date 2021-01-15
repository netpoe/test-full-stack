import { User } from "@sf-test/shared/graphql/generated/schema";
import moment from "moment";
import React from "react";
import DependencyContext from "../../../common/context/DependencyContext";
import { UserProfilesModel } from "../model/UserProfilesModel";
import { ProfilePicture } from "./ProfilePicture";

const RESULTS_PER_CALL = 5;

type Props = {
  onUpdateUserItem: (item: User) => void;
  onDisplayCreateUserModal: () => void;
};

export type UsersListComponentReferenceProps = {
  refetch: () => void;
};

const Component: React.ForwardRefRenderFunction<
  UsersListComponentReferenceProps,
  Props
> = ({ children, onUpdateUserItem, onDisplayCreateUserModal }, ref) => {
  const url = new URL(window.location.href);

  const [queryExecutionCount, setQueryExecutionCount] = React.useState(
    url.searchParams.get("pageSize")
      ? Number(url.searchParams.get("pageSize"))
      : 1
  );
  const [isRefetching, setIsRefetching] = React.useState(false);
  const [items, setItems] = React.useState<Array<User>>([]);

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

  const shouldLoadMore = Boolean(getUsersData?.exclusiveStartKey);

  React.useEffect(() => {
    getUsers();
  }, []);

  React.useEffect(() => {
    if (!Boolean(getUsersData?.items)) {
      return;
    }

    setIsRefetching(false);

    const users = (getUsersData as { items: Array<User> }).items;
    setItems([...items, ...users]);

    setURLSearchParams();
  }, [getUsersData]);

  React.useImperativeHandle(ref, () => ({
    refetch,
  }));

  const refetch = () => {
    setIsRefetching(true);
    setItems([]);
    getUsers();
  };

  const onLoadMore = () => {
    setQueryExecutionCount(queryExecutionCount + 1);
    getUsers();
  };

  const getUsers = () => {
    executeGetUsersQuery({
      pageSize: RESULTS_PER_CALL * queryExecutionCount,
      exclusiveStartKey: getUsersData?.exclusiveStartKey,
    });
  };

  const setURLSearchParams = () => {
    url.searchParams.set("pageSize", queryExecutionCount.toString());
    window.history.pushState({}, "", url.href);
  };

  const NewUserCard = (
    <article className="item">
      <div className="card center-items">
        <div className="actions"></div>
        <div className="profile-picture">
          <ProfilePicture preventImageFetch={true} />
        </div>
        <div className="description">
          <button
            className="btn btn-outline-primary full-width"
            onClick={onDisplayCreateUserModal}
          >
            Create a user
          </button>
        </div>
      </div>
    </article>
  );

  if (isGetUsersQueryLoading || isRefetching) {
    return <p>Loading...</p>;
  }

  if (items.length === 0) {
    return <section id="list">{NewUserCard}</section>;
  }

  return (
    <>
      <section id="list">
        {NewUserCard}

        {items?.map((item, i) => (
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
      {shouldLoadMore && (
        <div className="load-more">
          <button className="btn btn-light btn-lg" onClick={onLoadMore}>
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export const UsersList = React.forwardRef(Component);
