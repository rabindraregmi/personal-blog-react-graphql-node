import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import _ from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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

const GET_FILTERED_BLOGS = gql`
  query GetFilteredBlogPost($search: String) {
    getAllBlogPost(search: $search) {
      title
      created_at
      id
    }
  }
`;

const RecentPostSection = () => {
  const [getFilteredBlogs, { loading, data: allBlogs, error }] =
    useLazyQuery(GET_FILTERED_BLOGS);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getFilteredBlogs({ variables: { search: searchInput } });
  }, [searchInput]);

  //delays the api call otherwise api will be hit on each keystroke
  const debounceFunction = _.debounce((searchText: any) => {
    setSearchInput(searchText);
  }, 1000);

  return (
    <>
      <div className="blog-search-bar">
        <div className="form-group">
          <input
            type="text"
            name="blog-search-input"
            className="form-control"
            placeholder="Type to search for Blogs"
            defaultValue=""
            onChange={(e) => debounceFunction(e.target.value)}
          />
        </div>
      </div>
      <div className="sidebar-item recent-posts">
        <div className="sidebar-heading">
          <h2>Recent Posts</h2>
        </div>
        <div className="content">
          {loading ? (
            <CircularProgress />
          ) : (
            <ul>
              {allBlogs?.getAllBlogPost
                ?.slice(0, 4)
                .map((blog: any, index: any) => {
                  return (
                    <li key={index}>
                      <NavLink to={`/view_blog/${blog.id}`}>
                        <h5>{blog.title}</h5>
                        <span>
                          {moment(Number(blog.created_at)).format("LL")}
                        </span>
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default UserRightBar;
