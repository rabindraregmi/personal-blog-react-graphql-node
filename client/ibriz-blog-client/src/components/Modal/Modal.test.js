import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import Enzyme, { mount } from "enzyme";
import { MemoryRouter } from "react-router";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";



Enzyme.configure({ adapter: new Adapter() });

// test("onClose shoudl path should redirect to 404", () => {
//   const wrapper = Enzyme.mount(
//     <MemoryRouter initialEntries={["/random"]}>
//       <SnackbarProvider>
//         <ApolloProvider client={client}>
//           <AuthorizedRouting />
//         </ApolloProvider>
//       </SnackbarProvider>
//     </MemoryRouter>
//   );
//   expect(wrapper.find(NotFoundPage)).toHaveLength(1);
// });

it('calls "handleClick" prop on modal delete click', () => {
  // Render new instance in every test to prevent leaking state
  const onClick = jest.fn();
  render(
  <Modal handleOnSubmit={onClick}/>);

  fireEvent.click(screen.getByText(/delete/i));
  expect(onClick).toHaveBeenCalled();
});  

it("renders Modal correctly", () => {
  // Render new instance in every test to prevent leaking state
  render(
    <MemoryRouter>
      <Modal modalTitle={"this is title of modal"} />
    </MemoryRouter>
  );

  const linkElement = screen.getByText(/this is title of modal/i);

  expect(linkElement).toBeInTheDocument();
});
