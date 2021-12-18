import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import { GET_ALL_BLOGS } from "../../screens/Admin/BlogPostTable";
import "./UserRightBar.scss";

const GET_ALL_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      name
      id
      description
    }
  }
`;

const UserRightBar = () => {
  return (
    <nav className="user-right-bar" id="right-bar">
      <div className="blog-search-bar">
        <div className="form-group">
          <input
            type={"text"}
            name="blog-search-input"
            className="form-control"
            placeholder="Type to search for Blogs"
          />
        </div>
      </div>
      <RecentPostSection />
      <CategoriesSection />
    </nav>
  );
};

const CategoriesSection = () => {
  const { data: allCategories } = useQuery(GET_ALL_CATEGORIES);
  return (
    <div className="sidebar-item categories">
      <div className="sidebar-heading">
        <h2>Categories</h2>
      </div>
      <div className="content">
        <ul>
          {allCategories?.getCategories?.map((category: any, index: any) => {
            return (
              <li key={index}>
                <span>{category.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const RecentPostSection = () => {
  const { data: allBlogs } = useQuery(GET_ALL_BLOGS);
  return (
    <div className="sidebar-item recent-posts">
      <div className="sidebar-heading">
        <h2>Recent Posts</h2>
      </div>
      <div className="content">
        <ul>
          {allBlogs?.getAllBlogPost
            ?.slice(0, 4)
            .map((blog: any, index: any) => {
              return (
                <li key={index}>
                  <h5>{blog.title}</h5>
                  <span>{moment(Number(blog.created_at)).format("LL")}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default UserRightBar;
