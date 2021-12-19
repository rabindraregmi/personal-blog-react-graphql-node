import {
  Email16,
  Link16,
  LogoGithub16,
  LogoInstagram16,
  LogoTwitter16,
  Phone16,
} from "@carbon/icons-react";
import { Avatar } from "@material-ui/core";
import "./UserLeftBar.scss";
const UserLeftBar = () => {
  return (
    <nav className="sidebar user-left-bar" id="sidebar">
      <section className="profile-section">
        <div className="user-photo">
          <Avatar
            alt="Remy Sharp"
            src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
            style={{ width: 100, height: 100, marginBottom: "20px" }}
          />
        </div>
        <span className="user-name">
          <h4>Rabindra Regmi</h4>
        </span>
        <section className="user-intro">
          <span>I am software Engineer with speciality in FE</span>
        </section>
        <section className="user-contact-info">
          <div className="user-email">
            <Email16 /> &nbsp;
            <span>regmirabindra2014@gmail.com</span>
          </div>
          <div className="user-contact">
            <Phone16 /> &nbsp;
            <span>38438242</span>
          </div>
          <div className="user-link">
            <LogoGithub16 /> &nbsp;
            <span>Github</span>
          </div>
          <div className="user-link">
            <LogoTwitter16 /> &nbsp;
            <span>Twitter</span>
          </div>
          <div className="user-link">
            <LogoInstagram16 /> &nbsp;
            <span>Instagram</span>
          </div>
        </section>
      </section>
    </nav>
  );
};

export default UserLeftBar;
