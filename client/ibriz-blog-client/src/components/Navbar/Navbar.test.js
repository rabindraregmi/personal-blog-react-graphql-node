import {
  render,
  screen,
  fireEvent,
  queryByTestId,
} from "@testing-library/react";
import Enzyme, { mount } from "enzyme";
import { MemoryRouter } from "react-router";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Navbar from "./Navbar";

Enzyme.configure({ adapter: new Adapter() });

test("localstorage removeItem should be called in logout", () => {
    jest.spyOn(window.localStorage.__proto__, 'removeItem');
    window.localStorage.__proto__.setItem = jest.fn();
  render(
    <MemoryRouter>

    <Navbar />
    </MemoryRouter>
  );
  //expect(wrapper.find('#nav-item-logout')).toHaveLength(1);
  fireEvent.click(screen.getByTestId("nav-item-logout"));
  expect(localStorage.removeItem).toHaveBeenCalled();
});
