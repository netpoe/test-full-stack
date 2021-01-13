import React from "react";
import { Container } from "../../../common/component";
import { colors, maxWidth } from "../../../common/theme/light";
import "../styles/user-profiles.scss";

const Component: React.FC<{}> = () => {
  return (
    <Container
      bgColor={colors.whitesmoke}
      maxWidth={maxWidth.large}
      minHeight="100vh"
    >
      <div id="user-profiles">
        <h1>Users List</h1>
        <section id="list">
          <article className="item">
            <div>
              <div className="actions">
                <span className="edit">icon</span>
              </div>
              <div className="profile-picture">
                <span style={{ backgroundImage: `url()` }}></span>
              </div>
              <div className="name-created-at">
                <span className="name">A Name</span>
                <div className="created-at">
                  <span>created:</span> 2021-01-01
                </div>
              </div>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </article>
          <article className="item">
            <div>
              <div className="actions">
                <span className="edit">icon</span>
              </div>
              <div className="profile-picture">
                <span style={{ backgroundImage: `url()` }}></span>
              </div>
              <div className="name-created-at">
                <span className="name">A Name</span>
                <span className="created-at">2021-01-01</span>
              </div>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </article>
          <article className="item">
            <div>
              <div className="actions">
                <span className="edit">icon</span>
              </div>
              <div className="profile-picture">
                <span style={{ backgroundImage: `url()` }}></span>
              </div>
              <div className="name-created-at">
                <span className="name">A Name</span>
                <span className="created-at">2021-01-01</span>
              </div>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </article>
        </section>
      </div>
    </Container>
  );
};

export const UserProfiles = Component;
