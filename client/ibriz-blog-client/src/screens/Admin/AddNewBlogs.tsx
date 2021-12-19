import { ArrowLeft24, Save24 } from "@carbon/icons-react";
import { CircularProgress } from "@material-ui/core";
import { ErrorMessage, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useSnackBar } from "../../context/SnackbarContext";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import {
  GetAllBlogsDocument,
  useCreateNewBlogPostMutation,
} from "../../queries/autogenerate/hooks";

const AddNewBlogs = () => {
  const { setSnackBarState } = useSnackBar();
  const navigate = useNavigate();
  const [addNewBlogPost, { data, loading, error }] =
    useCreateNewBlogPostMutation({
      refetchQueries: [GetAllBlogsDocument, "GetAllBlogs"],
    });

  const initialFormValues = {
    title: "",
    subtitle: "",
    content: "",
    category: "",
    published: false,
  };

  useEffect(() => {
    if (error)
      setSnackBarState({
        display: true,
        type: "error",
        message: "Error while creating new blog post",
      });
    if (data) {
      setSnackBarState({
        display: true,
        type: "success",
        message: "Successfully Created New Blog Post",
      });
      //if success, navigate to previous page
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }
  }, [error, data]);

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={(values) => {
        addNewBlogPost({ variables: { blog: values } });
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
            <span>Add New Blog Post</span>
          </div>
          <BlogForm formik={formik} loading={loading} />
        </div>
      )}
    </Formik>
  );
};

export default AddNewBlogs;

export const BlogForm = ({ formik, loading }: any) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (formik && formik.initialValues && !formik.dirty) {
      setEditorState(
        EditorState.createWithContent(
          stateFromHTML(formik.initialValues.content)
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.initialValues.content]);

  const handleEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const htmlText = stateToHTML(newEditorState.getCurrentContent());
    formik.setFieldValue("content", htmlText);
  };
  return (
    <div className="form-body">
      <div className="d-flex flex-column">
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            type="text"
            className={clsx(
              "form-control",
              formik.errors.title && formik.touched.title ? "is-invalid" : ""
            )}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <span className="invalid-feedback">
            <ErrorMessage name="title" />
          </span>
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
          <span className="invalid-feedback">
            <ErrorMessage name="subtitle" />
          </span>
        </div>
        <div className="form-group d-flex flex-column align-items-start">
          <label>Content</label>
          <div>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={handleEditorStateChange}
              onBlur={() => formik.setFieldTouched("content", true)}
            />
          </div>
          {formik.errors?.content && formik.touched?.content && (
            <span className="invalid-feedback-text" style={{ color: "red" }}>
              {formik.errors?.content}{" "}
            </span>
          )}
        </div>
        <div className="form-group">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              name="published"
              checked={formik.values.published === true}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
          {loading ? (
            <CircularProgress />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};
