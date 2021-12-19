import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackBar } from "../../context/SnackbarContext";
import BlogPostCard from "../../components/SingleBlogPost/BlogPostCard";
import { useGetOneBlogPostLazyQuery } from "../../queries/autogenerate/hooks";

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
      <BlogPostCard blog={blog?.getOneBlogPost} size="lg" />
    </div>
  );
};

export default BlogPostDetailPage;
