import { Locked24, User24 } from "@carbon/icons-react";
import Button from "../../components/Button/button";
import "./LoginPage.scss";

import { Route, Routes, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";

import * as Yup from "yup";
import clsx from "clsx";
import { useEffect } from "react";
import { useLoginLazyQuery } from "../../queries/autogenerate/hooks";
import { CircularProgress } from "@material-ui/core";

interface LoginFormPayload {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [loginUser, { data, loading, error }] = useLoginLazyQuery();
  const navigate = useNavigate();

  const initialFormValues: LoginFormPayload = {
    email: "",
    password: "",
  };

  const handleFormSubmit = (values: LoginFormPayload) => {
    if (values) {
      loginUser({ variables: values });
    }
  };

  useEffect(() => {
    if (data && data.login) {
      localStorage.setItem("token", data.login.token);
      navigate("/admin/dashboard");
    }
  }, [data]);

  let token = localStorage.getItem("token");
  if (token) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to={"/admin/dashboard"} />} />
      </Routes>
    );
  }

  return (
    <div className="login-page">
      <Formik
        initialValues={initialFormValues}
        onSubmit={(values) => handleFormSubmit(values)}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid Email")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
      >
        {(formik) => (
          <div className="login-form">
            <h2 className="login-form-heading">Login</h2>
            <div className="login-wrap">
              {error && (
                <span className="error-message">Invalid email or password</span>
              )}
              <div className="input-group">
                <span className="input-group-addon">
                  <User24 />
                </span>
                <input
                  type="text"
                  className={clsx(
                    "form-control",
                    formik.errors.email && formik.touched.email
                      ? "is-invalid"
                      : ""
                  )}
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="invalid-feedback">
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div className="input-group">
                <span className="input-group-addon">
                  <Locked24 />
                </span>
                <input
                  type="password"
                  className={clsx(
                    "form-control",
                    formik.errors.password && formik.touched.password
                      ? "is-invalid"
                      : ""
                  )}
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="invalid-feedback">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div className="login-button">
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    label="Login"
                    style={{ width: "100%", justifyContent: "center" }}
                    handleClick={() => formik.handleSubmit()}
                    type={"submit"}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
