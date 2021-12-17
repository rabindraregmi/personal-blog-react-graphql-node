import { Link } from "react-router-dom";
import "./AdminDashboard.scss";
import BlogPostTable from "./BlogPostTable";

const AdminPage = () => {

  return (
    <div className="d-flex flex-column">
      <div>
        <Link
        to="add_blog"
        >
        <button
          className="btn btn-success"
          >
          + Add New Post
        </button>
          </Link>
      </div>

      <BlogPostTable />
    </div>
  );
};

export default AdminPage;
