import { User24, UserProfile24, Blog24 } from "@carbon/icons-react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import AddNewBlogs from "../screens/Admin/AddNewBlogs";
import NotFoundPage from "../screens/NotFoundPage/NotFoundPage";
import UserLandingPage from "../screens/User/UserLandingPage";

const UserDashboardHOC = ({ children }: any) => {
  const view = "co";
  const sideBarRoutes = [
    {
      title: "User",
      name: "users",
      renderIcon: () => {
        return <User24 data-view={view} />;
      },
    },

    {
      title: "Profile",
      name: "profile",
      renderIcon: () => {
        return <UserProfile24 data-view={view} />;
      },
    },
    {
      title: "Posts",
      name: "posts",
      renderIcon: () => {
        return <Blog24 data-view={view} />;
      },
    },
  ];

  return (
    <div className="container-fluid">
      <Navbar />
      <Sidebar routes={sideBarRoutes} />
      <Sidebar routes = {sideBarRoutes} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<UserLandingPage />} />
          <Route
            path="/view_blog"
            element={<AddNewBlogs />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboardHOC;
