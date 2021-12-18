import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import BlogPostCard from "../../components/SingleBlogPost/BlogPostCard";
import useCustomPagination from "../../utils/Pagination";
import { GET_ALL_BLOGS } from "../Admin/BlogPostTable";
import "./UserLandingPage.scss";

const UserLandingPage = () => {
  const { loading, error, data: blogs } = useQuery(GET_ALL_BLOGS);
  const pageSize = 5;
  const { paginate, pageIndex, goToNext, goToPrev, canNext, canPrev } =
    useCustomPagination({ pageSize });

  useEffect(() => {
    if (blogs) {
      paginate(blogs.getAllBlogPost.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogs]);
  return loading ? (
    <CircularProgress></CircularProgress>
  ) : (
    <>
      <div className="user-landing-page d-flex flex-column align-content-flex-end">
        <div className="pagination">
          <button
            className="btn shadow-none"
            onClick={() => goToPrev()}
            disabled={!canPrev}
          >
            Newer
          </button>
          &nbsp;
          <button
            className="btn shadow-none"
            onClick={() => goToNext()}
            disabled={!canNext}
          >
            Older
          </button>
        </div>
        <div className="blog-posts">
          {blogs?.getAllBlogPost
            ?.slice(pageIndex * pageSize, pageSize * (pageIndex + 1))
            .map((blog: any, index: any) => {
              return <BlogPostCard key={index} blog={blog} />;
            })}
        </div>
      </div>
    </>
  );
};

export default UserLandingPage;
