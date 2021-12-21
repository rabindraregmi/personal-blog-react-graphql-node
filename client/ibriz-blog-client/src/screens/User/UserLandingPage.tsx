import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import BlogPostCard from "../../components/SingleBlogPost/BlogPostCard";
import UserRightBar from "../../components/UserRightBar/UserRightBar";
import { useGetAllPublishedBlogsQuery } from "../../queries/autogenerate/hooks";
import useCustomPagination from "../../utils/Pagination";
import "./UserLandingPage.scss";

const UserLandingPage = () => {
  const { loading, error, data: blogs } = useGetAllPublishedBlogsQuery();
  const pageSize = 5;
  const { paginate, pageIndex, goToNext, goToPrev, canNext, canPrev } =
    useCustomPagination({ pageSize });

  useEffect(() => {
    if (blogs && blogs.getPublishedBlogPost) {
      paginate(blogs.getPublishedBlogPost.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogs]);
  return loading ? (
    <CircularProgress></CircularProgress>
  ) : (
    <>
      <div className="row">
        <div className="col-sm-7 col-12 col-md-7 col-lg-7">
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
              {blogs?.getPublishedBlogPost
                ?.slice(pageIndex * pageSize, pageSize * (pageIndex + 1))
                .map((blog: any, index: any) => {
                  return <BlogPostCard key={index} blog={blog} />;
                })}
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <UserRightBar />
        </div>
      </div>
    </>
  );
};

export default UserLandingPage;
