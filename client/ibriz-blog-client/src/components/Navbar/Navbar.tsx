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
      {/* <Snackbar
        open={snackBar.display}
        autoHideDuration={3000}
        onClose={() => dispatch(resetSnackBarAction())}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          onClose={() => dispatch(resetSnackBarAction())}
          severity={
            snackBar.type === SNACKBAR_TYPE.SUCCESS
              ? "success"
              : snackBar.type === SNACKBAR_TYPE.ERROR
              ? "error"
              : snackBar.type === SNACKBAR_TYPE.INFO
              ? "info"
              : "warning"
          }
        >
          {snackBar.message}
        </Alert>
      </Snackbar> */}
      <nav
        className="navbar navbar-expand"
        style={{ backgroundColor: "#214869" }}
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


