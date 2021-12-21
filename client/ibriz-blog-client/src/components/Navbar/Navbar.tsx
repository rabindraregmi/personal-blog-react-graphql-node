import {
  ArrowsHorizontal24,
  Logout20,
  Logout24,
  Logout32,
  Rotate20,
  Switcher20,
} from "@carbon/icons-react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Switch to User View
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  onClick={() => handleLogout()}
                  data-testid="nav-item-logout"
                >
                  <span className="nav-link">Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
