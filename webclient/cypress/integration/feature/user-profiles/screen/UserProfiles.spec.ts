/// <reference types="cypress" />
import createUser from "../../../../fixtures/createUser.json";
import getUsers from "../../../../fixtures/getUsers.json";

context("Actions", () => {
  before(() => {
    cy.intercept("POST", "**/graphql", (req) => {
      if (req.body?.query.includes("query GetUsersQuery")) {
        req.alias = "getUsersQuery";
        req.reply((res) => {
          res.send({
            body: getUsers,
            statusCode: 200,
          });
        });
      }

      if (req.body?.query.includes("mutation CreateUserMutation")) {
        req.alias = "createUserMutation";
        req.reply((res) => {
          res.send({
            body: createUser,
            statusCode: 200,
          });
        });
      }
    });

    cy.intercept(
      {
        method: "GET",
        url: "https://api.unsplash.com/photos/random",
      },
      {
        statusCode: 200,
        fixture: "unsplash.json",
      }
    );

    cy.intercept(
      {
        method: "GET",
        url: "https://api.mapbox.com/",
      },
      {
        statusCode: 200,
      }
    );

    cy.visit("http://localhost:3000");
  });

  it("create a new user", () => {
    const name = "Porfirio Jimenez";
    const address = "An address";
    const description = "A description";
    const dob = "2021-01-01";

    cy.get("#create-user-card button").click();
    cy.get("#create-user-modal-name-input").type(name).should("have.value", name);
    cy.get("#create-user-modal-address-input").type(address).should("have.value", address);
    cy.get("#create-user-modal-description-input")
      .type(description)
      .should("have.value", description);
    cy.get("#create-user-modal-dob-input").type(dob).should("have.value", dob);

    const response = {
      id: "123",
      name,
      address,
      description,
      dob,
      updatedAt: "2021-01-15T19:53:08.529Z",
      createdAt: "2021-01-13T05:01:03.492Z",
    };

    cy.intercept("POST", "**/graphql", (req) => {
      if (req.body?.query.includes("query GetUsersQuery")) {
        const body = getUsers.data.getUsers.items.push(response);
        req.reply((res) => {
          res.send({
            body,
            statusCode: 200,
          });
        });
      }

      if (req.body?.query.includes("mutation CreateUserMutation")) {
        const body = (createUser.data.createUser = response);
        req.reply((res) => {
          res.send({
            body,
            statusCode: 200,
          });
        });
      }
    });

    cy.get("#create-user-card-on-submit-button").click();

    cy.wait("@createUserMutation").then((interception) => {
      const body = JSON.parse(interception.response.body);
      expect(body.data.createUser.name).to.equal(name);
    });
  });
});
