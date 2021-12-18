import { Add20, Add24 } from "@carbon/icons-react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/button";
import BlogPostCard from "../../components/SingleBlogPost/BlogPostCard";
import "./AdminDashboard.scss";
import BlogPostTable from "./BlogPostTable";

const AdminPage = () => {
  return (
    <div className="d-flex flex-column">
      <div className = "add-blog-button">

   
        <Link to="add_blog">
          <Button label="Add New Blog Post" Icon={<Add24 />} />
        </Link>
      </div>
    

      <BlogPostTable />
      
    </div>
  );
};

export default AdminPage;
