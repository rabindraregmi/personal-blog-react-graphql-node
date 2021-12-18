import { Home24 } from "@carbon/icons-react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

// interface SidebarComponents {
//   sidebarOpen: boolean;
//   toggleSidebar: (sidebarOpen: boolean) => void;
//   routes?: Array<SidebarProps>;
//   themeColor: string;
//   isDrawerClose?: boolean;
//   homeAllowed: boolean;
// }

export interface SidebarProps {
  category?: string;
  title: string;
  name: string;
  renderIcon: Function;
}

const Sidebar = ({ routes, themeColor }: any) => {
  const view = "co";
  return (
    <nav className="sidebar" id="sidebar">
      <ul>
        <NavLink
          className="sidebar-link"
          to={`/admin/dashboard`}
          style={{ textDecoration: "none" }}
          // isActive={(match, location) => {
          //   return match?.url === location.pathname;
          // }}
        >
          <li key="home">
            <Home24 data-view={view} />
            <span className="link-text" data-view={view}>
              Home
            </span>
          </li>
        </NavLink>

        {routes?.map((route: SidebarProps) => (
          <>
            {route.category && <div className="category">{route.category}</div>}

            <a className="sidebar-link">
              <li key={route.name}>
                {route.renderIcon()}
                <span className="link-text" data-view={view}>
                  {route.title}
                </span>
              </li>
            </a>
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
