import { Add24 } from "@carbon/icons-react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/button";
import Navbar from "../../components/Navbar/Navbar";
import "./AdminDashboard.scss";
import BlogPostTable from "./BlogPostTable";

const AdminPage = () => {
  return (
    <div className="d-flex flex-column">
      <Navbar />
      <BlogPostTable />
    </div>
  );
};

export default AdminPage;
