import { Blog24,User24, UserProfile24 } from "@carbon/icons-react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const AdminPage = () => {
 
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
  ]
    return (
        <div className = "container-fluid">
          <Navbar/>
          <Sidebar
            routes = {sideBarRoutes}
            />
            <div className = "main-content">
              
              

            </div>
        </div>
    )
}

export default AdminPage;