import { gql, useMutation } from "@apollo/client";
import { Save24 } from "@carbon/icons-react";
import { Formik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";
import { useSnackBar } from "../../context/SnackbarContext";
import { GET_ALL_BLOGS } from "./BlogPostTable";

const AddNewBlogs = () => {
  const ADD_NEW_BLOG_POST = gql`
    mutation CreateNewBlogPost($blog: BlogInput!) {
      createBlogPost(blog: $blog) {
        title
        subtitle
        content
        published
      }
    }
  `;

  const [addNewBlogPost, { data, loading, error }] = useMutation(
    ADD_NEW_BLOG_POST,
    {
      refetchQueries: [GET_ALL_BLOGS, "GetAllBlogs"],
    }
  );

  const initialValues = {
    title: "",
    subtitle: "",
    content: "",
    category: "",
  };

  const {setSnackBarState} = useSnackBar()

  useEffect(()=>{
      if(error) setSnackBarState({display: true, type: "error", message: "Error while creating new blog post"})
      if(data) setSnackBarState({display: true, type: "success", message: "Successfully Created New Blog Post"})
  }, [error, data])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, errors) => {
        alert(JSON.stringify(values));
        addNewBlogPost({ variables: { blog: values } });
        if (error) {
          alert("Oh no error happend");
        }
      }}
    >
      {(formik) => (
        <div className="form-container" style={{ paddingTop: "20px" }}>
          <div className="form-body">
            <div className="d-flex flex-column">
              <div className="form-group">
                <label>Title</label>
                <input
                  name="title"
                  type="text"
                  className="form-control"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="form-group">
                <label>Subtitle</label>
                <textarea
                  rows={3}
                  name="subtitle"
                  className="form-control"
                  value={formik.values.subtitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <input
                  name="content"
                  type="text"
                  className="form-control"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="form-group">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    name="published"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckChecked"
                  >
                    Published
                  </label>
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={() => formik.handleSubmit()}
                >
                  <div className="d-flex">
                    <Save24 /> &nbsp;
                    <span>Save</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddNewBlogs;
