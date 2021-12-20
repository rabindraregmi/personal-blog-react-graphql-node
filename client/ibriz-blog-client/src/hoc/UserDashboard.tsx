import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import UserLeftBar from "../components/UserLeftBar/UserLeftBar";
import UserRightBar from "../components/UserRightBar/UserRightBar";
import NotFoundPage from "../screens/NotFoundPage/NotFoundPage";
import BlogPostDetailPage from "../screens/User/BlogPostDetailPage";
import UserLandingPage from "../screens/User/UserLandingPage";

const UserDashboardHOC = ({ children }: any) => {
  return (
    <div className="container-fluid">
      {/* <Navbar /> */}
      <UserLeftBar />
      <div className="main-content main-user-content">
        <div className="row">
          <div className="col-sm-12 col-xs-12 col-md-12">
            <Routes>
              <Route path="/" element={<UserLandingPage />} />
              <Route path="/view_blog/:id" element={<BlogPostDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHOC;
