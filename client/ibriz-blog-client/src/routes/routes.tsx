import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import AdminDashboardHOC from "../hoc/AdminDashboard";
import UserDashboardHOC from "../hoc/UserDashboard";
import AddNewBlogs from "../screens/Admin/AddNewBlogs";
import AdminPage from "../screens/Admin/AdminDashboardPage";
import NotFoundPage from "../screens/NotFoundPage/NotFoundPage";

const AuthorizedRouting = () => {
  // const access = useSelector(
  //   (state: ReturnType<typeof rootReducer>) => state.access.access[0]
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element = {<UserDashboardHOC/>}/>
        <Route path="/admin/dashboard/*" element = {<AdminDashboardHOC/>}/>
       
            {/* <PrivateRoute path="/codashboard">
            {Array.isArray(permissions) &&
          permissions?.includes(RBAC_AUTH.CO_VIEW_ACCESS) ? (
              <CODashboard />
              ):(<span>Unauthorized!</span>)}
            </PrivateRoute>
          
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute> */}
        <Route path="*" element = {
          <NotFoundPage />
        }/>
      </Routes>
    </BrowserRouter>
  );
};

// //TODO add private routes
// function PrivateRoute({ children, ...rest }:any) {
//   const location:any = useLocation();
//   const auth = useSelector((state: RootState) => state.loginReducer);
//   const { from } = location.state || { from: { pathname: "/" } };
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         auth.isLoggedIn ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/",
//               state: from?.pathname === 'profile' ? undefined :{ from: location}
//             }}
//           />
//         )
//       }
//     />
//   );
// }
export default AuthorizedRouting;
