import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import AdminDashboardHOC from "../hoc/AdminDashboard";
import UserDashboardHOC from "../hoc/UserDashboard";
import LoginPage from "../screens/Login/LoginPage";
import NotFoundPage from "../screens/NotFoundPage/NotFoundPage";

const AuthorizedRouting = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserDashboardHOC />} />
      <Route path="/admin/*" element={<LoginPage />} />

      <Route
        path="/admin/dashboard/*"
        element={<PrivateRoute element={<AdminDashboardHOC />} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const AUTHORIZE_TOKEN = gql`
  query AuthorizeToken($token: String!) {
    authorize(token: $token)
  }
`;

function PrivateRoute({ element }: any) {
  const [authorize, { called, data, error, loading }] =
    useLazyQuery(AUTHORIZE_TOKEN);
  const [isRedirect, setIsRedirect] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    authorize({ variables: { token: token || "" } });
  }, [token]);

  useEffect(() => {
    if (error || (data && !data.authorize)) {
      localStorage.removeItem("token");
      setIsRedirect(true);
    }
  }, [data, error]);

  return !called || loading ? (
    <div>Loading....</div>
  ) : !isRedirect ? (
    element
  ) : (
    <Routes>
      <Route
        path="*"
        element={
          <Navigate
            to={{
              pathname: "/admin",
            }}
          />
        }
      />
    </Routes>
  );
}
export default AuthorizedRouting;
