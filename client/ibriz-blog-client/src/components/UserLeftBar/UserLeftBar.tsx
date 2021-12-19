import {
  Email16,
  Link16,
  LogoGithub16,
  LogoInstagram16,
  LogoTwitter16,
  Phone16,
} from "@carbon/icons-react";
import { Avatar, CircularProgress } from "@material-ui/core";
import { useEffect, useMemo } from "react";
import { useSnackBar } from "../../context/SnackbarContext";
import { useGetUserProfileQuery } from "../../queries/autogenerate/hooks";
import "./UserLeftBar.scss";
const UserLeftBar = () => {
  const { loading, error, data } = useGetUserProfileQuery();
  const { setSnackBarState } = useSnackBar();

  const userProfile = useMemo(() => {
    if (data && data.getUserProfile && data.getUserProfile.length > 0) {
      return data.getUserProfile[0];
    } else {
      return null;
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setSnackBarState({
        display: true,
        type: "error",
        message: "User Profile doesn't exist",
      });
    }
  }, [error]);

  return (
    <nav className="sidebar user-left-bar" id="sidebar">
      {loading ? (
        <CircularProgress />
      ) : (
        <section className="profile-section">
          <div className="user-photo">
            <Avatar
              alt="Cristiano Ronaldo"
              src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
              style={{ width: 100, height: 100, marginBottom: "20px" }}
            />
          </div>
          <span className="user-name">
            <h4>{userProfile?.profile?.full_name}</h4>
          </span>
          <section className="user-intro">
            <span>{userProfile?.profile?.intro}</span>
          </section>
          <section className="user-contact-info">
            <div className="user-email">
              <Email16 /> &nbsp;
              <span>{userProfile?.email}</span>
            </div>
            <div className="user-contact">
              <Phone16 /> &nbsp;
              <span>{userProfile?.profile?.mobile_number}</span>
            </div>
            <div className="user-link">
              <LogoGithub16 /> &nbsp;
              <span>{userProfile?.profile?.social?.github}</span>
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
      )}
    </nav>
  );
};

export default UserLeftBar;
