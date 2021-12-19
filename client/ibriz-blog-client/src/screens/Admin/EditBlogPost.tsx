/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from "formik";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackBar } from "../../context/SnackbarContext";
import * as Yup from "yup";
import { BlogForm } from "./AddNewBlogs";
import { stateFromHTML } from "draft-js-import-html";
import { ArrowLeft24 } from "@carbon/icons-react";
import {
  GetAllBlogsDocument,
  useEditBlogPostMutation,
  useGetOneBlogPostLazyQuery,
} from "../../queries/autogenerate/hooks";

const EditBlogPost = () => {
  const { setSnackBarState } = useSnackBar();
  const navigate = useNavigate();
  const params = useParams();

  const [
    editBlogPost,
    { data: editBlogData, loading: editBlogLoading, error: editBlogError },
  ] = useEditBlogPostMutation({ refetchQueries: [GetAllBlogsDocument] });

  const [getSingleBlogPost, { error: selectedBlogError, data: selectedBlog }] =
    useGetOneBlogPostLazyQuery();

  const initialFormValues = useMemo(() => {
    if (selectedBlog) {
      const blog = selectedBlog.getOneBlogPost;
      return {
        title: blog?.title || "",
        subtitle: blog?.subtitle || "",
        content: blog?.content || "",
        category: blog?.category || "",
        published: blog?.published,
      };
    } else {
      return {
        title: "",
        subtitle: "",
        content: "",
        category: "",
        published: false,
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
        navigate("/admin/dashboard");
      }, 1000);
    }
  }, [selectedBlogError]);

  return (
    <>
      <Formik
        initialValues={initialFormValues}
        enableReinitialize={true}
        onSubmit={(values, errors) => {
          //@ts-ignore
          editBlogPost({ variables: { blog: { ...values, id: params.id } } });
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
            <div className="form-header">
              <ArrowLeft24 onClick={() => navigate(-1)} />
              <span>Edit Blog Post</span>
            </div>
            <BlogForm formik={formik} loading={editBlogLoading} />
          </div>
        )}
      </Formik>
    </>
  );
};

export default EditBlogPost;
