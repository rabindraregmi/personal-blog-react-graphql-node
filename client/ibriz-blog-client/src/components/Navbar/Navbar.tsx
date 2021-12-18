import './Navbar.scss'

// interface NavbarComponents {
//   toggle: Function;
//   navs: Array<NavbarProps>;
//   themeColor?: string;
//   avatarColor?: string;
// }

export interface NavbarProps {
  name: string;
  renderIcon: Function;
}

const Navbar = ({
  toggle,
  navs,
  themeColor,
  avatarColor,
}:any) => {

  return (
    <>
      <nav
        className="navbar navbar-expand"
      >
        <div className="navbar-brand">
          {/* <img className="logo" src={logo} alt="logo" /> */}
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li>Home</li>
            {/* {navs.map((nav:any) => (
              <li
                key={nav.name}
                className="action"
                onClick={() => toggle(nav.name)}
              >
                {nav.renderIcon()}
              </li>
            ))} */}
            
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


