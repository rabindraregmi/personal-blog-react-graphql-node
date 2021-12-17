import { Blog24,User24, UserProfile24 } from "@carbon/icons-react";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import AddNewBlogs from "./AddNewBlogs";
import './AdminDashboard.scss'
import BlogPostTable from "./BlogPostTable";

const AdminPage = () => {
 
    const view = "co";
    const [formEnabled,setFormEnabled] = useState(false);

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

    const toggleFormEnabled = () => setFormEnabled(prevState=> !prevState)
    
    return (
        <div className = "container-fluid">
          <Navbar/>
          <Sidebar
            routes = {sideBarRoutes}
            />
            <div className = "main-content">

              <div className = "d-flex flex-column">
                <div>

                <button className = "btn btn-success" onClick={toggleFormEnabled}>
                  + Add New Post
                </button>
                </div>
                {
                  formEnabled ? <AddNewBlogs/> :
              <BlogPostTable />
                }


              </div>
              

            </div>
        </div>
    )
}

export default AdminPage;