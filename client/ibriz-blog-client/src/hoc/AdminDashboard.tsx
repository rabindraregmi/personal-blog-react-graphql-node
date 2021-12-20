import { User24, UserProfile24, Blog24 } from "@carbon/icons-react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import UserLeftBar from "../components/UserLeftBar/UserLeftBar";
import AddNewBlogs from "../screens/Admin/AddNewBlogs";
import AdminPage from "../screens/Admin/AdminDashboardPage";
import EditBlogPost from "../screens/Admin/EditBlogPost";
import NotFoundPage from "../screens/NotFoundPage/NotFoundPage";

const AdminDashboardHOC = ({ children }: any) => {
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
      {/* <Navbar /> */}
      <UserLeftBar viewAsAdmin={true} />
      <div className="main-content main-admin-content">
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/add_blog" element={<AddNewBlogs />} />
          <Route path="/edit_blog/:id" element={<EditBlogPost />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboardHOC;
