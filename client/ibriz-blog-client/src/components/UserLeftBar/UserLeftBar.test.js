import { MockedProvider } from "@apollo/client/testing";
import {
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { SnackbarProvider } from "../../context/SnackbarContext";

import UserLeftBar from "./UserLeftBar";
import { client } from "../../client";
import Button from "../Button/button";
import { GetUserProfileDocument, useGetUserProfileQuery } from "../../queries/autogenerate/hooks";

test("no edit button in user view", () => {
  render(
    <MemoryRouter>
      <SnackbarProvider>
        <MockedProvider client={client}>
          <UserLeftBar viewAsAdmin={false} />
        </MockedProvider>
      </SnackbarProvider>
    </MemoryRouter>
  );
  expect(screen.queryByText("Edit")).toBeFalsy();
});

