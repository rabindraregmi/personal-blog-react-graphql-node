import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import BlogPostCard from "../../components/SingleBlogPost/BlogPostCard";
import { GET_ALL_BLOGS } from "../Admin/BlogPostTable";

const UserLandingPage = () => {
  const { loading, error, data: blogs } = useQuery(GET_ALL_BLOGS);
  return loading ? (
    <CircularProgress></CircularProgress>
  ) : (
    <>
      <div className="blog-posts">
        {blogs?.getAllBlogPost?.slice(0, 5).map((blog: any, index: any) => {
          return <BlogPostCard key={index} blog={blog} />;
        })}
      </div>
    </>
  );
};

export default UserLandingPage;
