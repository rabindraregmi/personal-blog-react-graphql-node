import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./components/Button/button";
import Enzyme, { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import NotFoundPage from "./screens/NotFoundPage/NotFoundPage";
import App from "./App";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import AuthorizedRouting from "./routes/routes";
import { SnackbarProvider } from "./context/SnackbarContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import LoginPage from "./screens/Login/LoginPage";
import AdminDashboardHOC from "./hoc/AdminDashboard";
import AdminPage from "./screens/Admin/AdminDashboardPage";
import UserLandingPage from "./screens/User/UserLandingPage";
import BlogPostCard from "./components/SingleBlogPost/BlogPostCard";

Enzyme.configure({ adapter: new Adapter() });

test("invalid path should redirect to 404", () => {
  const wrapper = Enzyme.mount(
    <MemoryRouter initialEntries={["/random"]}>
      <SnackbarProvider>
        <ApolloProvider client={client}>
          <AuthorizedRouting />
        </ApolloProvider>
      </SnackbarProvider>
    </MemoryRouter>
  );
  expect(wrapper.find(NotFoundPage)).toHaveLength(1);
});

it('calls "handleClick" prop on button click', () => {
  // Render new instance in every test to prevent leaking state
  const onClick = jest.fn();
  render(<Button handleClick={onClick} label="click me nao" />);

  fireEvent.click(screen.getByText(/click me nao/i));
  expect(onClick).toHaveBeenCalled();
});

it("renders blog correctly", () => {
  // Render new instance in every test to prevent leaking state
  render(
    <MemoryRouter>
      <BlogPostCard blog={{ title: "this is title of blog" }} />
    </MemoryRouter>
  );

  const linkElement = screen.getByText(/this is title of blog/i);

  expect(linkElement).toBeInTheDocument();
});
