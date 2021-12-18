import { User24, UserProfile24, Blog24 } from "@carbon/icons-react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import UserRightBar from "../components/UserRightBar/UserRightBar";
import AddNewBlogs from "../screens/Admin/AddNewBlogs";
import NotFoundPage from "../screens/NotFoundPage/NotFoundPage";
import BlogPostDetailPage from "../screens/User/BlogPostDetailPage";
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
      <div className="main-content">
        <div className="row">
          <div className="col-sm-7">
            <Routes>
              <Route path="/" element={<UserLandingPage />} />
              <Route path="/view_blog/:id" element={<BlogPostDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <div className="col-sm-4">
            <UserRightBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHOC;
