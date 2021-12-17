import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Formik } from "formik";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackBar } from "../../context/SnackbarContext";
import { GET_ALL_BLOGS } from "./BlogPostTable";
import * as Yup from "yup";
import { BlogForm } from "./AddNewBlogs";
import { stateFromHTML } from "draft-js-import-html";

const EDIT_BLOG_POST = gql`
  mutation EditBlogPost($blog: BlogInput!) {
    editBlogPost(blog: $blog) {
      title
      subtitle
      content
      published
    }
  }
`;

const GET_SINGLE_BLOG_POST = gql`
query GetOneBlogPost($getOneBlogPostId: ID!) {
  getOneBlogPost(id: $getOneBlogPostId) {
    title,
    subtitle,
    content
    published
    created_at
    id
  }
}

`

const EditBlogPost = () => {
  const { setSnackBarState } = useSnackBar();
  const navigate = useNavigate();
  const params = useParams();

  const [
    editBlogPost,
    { data: editBlogData, loading: editBlogLoading, error: editBlogError },
  ] = useMutation(EDIT_BLOG_POST, {
    refetchQueries: [GET_ALL_BLOGS, "GetAllBlogs"],
  });

  const [getSingleBlogPost,{called:isSelectedBlogCalled, error:selectedBlogError, data:selectedBlog}] = useLazyQuery(GET_SINGLE_BLOG_POST)

  const initialFormValues = useMemo(() => {
      if(selectedBlog){
          const blog = selectedBlog.getOneBlogPost
          return {
            title: blog?.title || "",
            subtitle: blog?.subtitle ||"",
            content: blog?.content ||"",
            category: blog?.category || "",
          };
      }
      else {
          return {
            title: "",
            subtitle: "",
            content: "",
            category: "",
          };
      }
  }, [selectedBlog]);

  useEffect(() => {
    if (editBlogError)
      setSnackBarState({
        display: true,
        type: "error",
        message: "Error while editing  blog post",
      });
    if (editBlogData) {
      setSnackBarState({
        display: true,
        type: "success",
        message: "Successfully Edited Blog Post",
      });
      //if success, navigate to previous page
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  }, [editBlogError, editBlogData]);

  useEffect (()=>{
    if(params && params.id){
        getSingleBlogPost({variables: {getOneBlogPostId: params.id}})
    }
  }, [params])

  useEffect(()=>{
    if(selectedBlogError){
        setSnackBarState({
        display: true,
        type: "error",
        message: "Blog Record didn't match",
      })

      setTimeout(()=>{
        navigate("/admin/dashboard");
      }, 1000)
    }
  }, [selectedBlogError])

  return (
    <>
      <Formik
        initialValues={initialFormValues}
        enableReinitialize = {true}
        onSubmit={(values, errors) => {
          editBlogPost({ variables: { blog: {...values, id: params.id} } });
        }}
        validationSchema={Yup.object({
            title: Yup.string().trim().required("Blog Title is required"),
            content: Yup.mixed().test(
              "checkContent",
              "Content is required",
              function (value: any) {
                const state = stateFromHTML(value);
    
                return state.hasText() && value;
              }
            ),
          })}
      >
        {(formik) => (
          <div className="form-container" style={{ paddingTop: "20px" }}>
            <span>Add New Blog Post</span>
            <BlogForm formik={formik} loading={editBlogLoading} />
          </div>
        )}
      </Formik>
    </>
  );
};

export default EditBlogPost;
