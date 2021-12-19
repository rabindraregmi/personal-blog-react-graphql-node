import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackBar } from "../../context/SnackbarContext";
import BlogPostCard from "../../components/SingleBlogPost/BlogPostCard";
import { useGetOneBlogPostLazyQuery } from "../../queries/autogenerate/hooks";
import { ArrowLeft32 } from "@carbon/icons-react";

const BlogPostDetailPage = () => {
  const navigate = useNavigate();
  const { setSnackBarState } = useSnackBar();
  const params = useParams();
  const [getSingleBlogPost, { error: selectedBlogError, data: blog }] =
    useGetOneBlogPostLazyQuery();
  useEffect(() => {
    if (params && params.id) {
      getSingleBlogPost({ variables: { getOneBlogPostId: params.id } });
    }
  }, [params]);

  useEffect(() => {
    if (selectedBlogError) {
      setSnackBarState({
        display: true,
        type: "error",
        message: "Blog Record didn't match",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [selectedBlogError]);
  return (
    <div className="blog-detail-page blog-posts">
      <div className="left-arrow">
        <ArrowLeft32
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
      </div>
      <BlogPostCard blog={blog?.getOneBlogPost} size="lg" />
    </div>
  );
};

export default BlogPostDetailPage;
