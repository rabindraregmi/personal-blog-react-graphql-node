import {
  ArrowLeft20,
  Close20,
  Crossroads20,
  Edit20,
  Email16,
  LogoGithub16,
  LogoInstagram16,
  LogoTwitter16,
  Phone16,
  Save20,
} from "@carbon/icons-react";
import { Avatar, CircularProgress } from "@material-ui/core";
import clsx from "clsx";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useSnackBar } from "../../context/SnackbarContext";
import {
  GetUserProfileDocument,
  useEditUserProfileMutation,
  useGetUserProfileQuery,
} from "../../queries/autogenerate/hooks";
import Button from "../Button/button";
import "./UserLeftBar.scss";
import * as Yup from "yup";

interface UserLeftBarProps {
  viewAsAdmin?: boolean;
}

interface IUser {
  email: string;
  profile: {
    full_name?: string;
    mobile_number?: string;
    address?: string;
    intro?: string;
    social?: {
      github?: string;
      twitter?: string;
      linkedin?: string;
      instagram?: string;
    };
  };
}

const UserLeftBar = ({ viewAsAdmin = false }: UserLeftBarProps) => {
  const { loading, error, data } = useGetUserProfileQuery();
  const [
    editUserProfile,
    {
      loading: editProfileLoading,
      error: editProfileError,
      data: editProfileData,
    },
  ] = useEditUserProfileMutation({
    refetchQueries: [GetUserProfileDocument, "GetUserProfile"],
  });
  const { setSnackBarState } = useSnackBar();
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState({
    email: "",
    profile: {
      full_name: "",
      mobile_number: "",
      address: "",
      intro: "",
      social: {
        github: "",
        instagram: "",
        twitter: "",
        linkedin: "",
      },
    },
  });

  const userProfile = useMemo(() => {
    if (data && data.getUserProfile && data.getUserProfile.length > 0) {
      return data.getUserProfile[0];
    } else {
      return null;
    }
  }, [data]);

  const formik = useFormik<IUser>({
    enableReinitialize: true,
    initialValues: initialFormValues,
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required."),
      profile: Yup.object({
        full_name: Yup.string().required("Full Name is required"),
      }),
    }),

    onSubmit: (values, action) => {
      editUserProfile({ variables: { user: values } });
    },
  });

  useEffect(() => {
    if (userProfile) {
      setInitialFormValues({
        email: userProfile?.email || "",
        profile: {
          full_name: userProfile?.profile?.full_name || "",
          mobile_number: userProfile?.profile?.mobile_number || "",
          address: userProfile?.profile?.address || "",
          intro: userProfile?.profile?.intro || "",
          social: {
            github: userProfile?.profile?.social?.github || "",
            instagram: userProfile?.profile?.social?.instagram || "",
            twitter: userProfile?.profile?.social?.twitter || "",
            linkedin: userProfile?.profile?.social?.linkedin || "",
          },
        },
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (error) {
      setSnackBarState({
        display: true,
        type: "error",
        message: "User Profile doesn't exist",
      });
    }
    if (editProfileError) {
      setSnackBarState({
        display: true,
        type: "error",
        message: "User Profile Edit Error",
      });
    }
    if (editProfileData) {
      setSnackBarState({
        display: true,
        type: "success",
        message: "Successfully Edited User Profile",
      });
      toggleEditMode();
    }
  }, [error, editProfileError, editProfileData]);

  const toggleEditMode = () => setIsEditMode((curr) => !curr);

  return (
    <nav className="sidebar user-left-bar toggled" id="wrapped">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <section
            className={clsx("profile-section", isEditMode ? "edit" : "")}
          >
            <div className="user-photo">
              <Avatar
                alt="Cristiano Ronaldo"
                src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
                style={{ width: 100, height: 100, marginBottom: "20px" }}
              />
            </div>
            {isEditMode ? (
              <ProfileForm formik={formik} toggleEditMode={toggleEditMode} />
            ) : (
              <>
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
                    <span>{userProfile?.profile?.social?.twitter}</span>
                  </div>
                  <div className="user-link">
                    <LogoInstagram16 /> &nbsp;
                    <span>{userProfile?.profile?.social?.instagram}</span>
                  </div>
                </section>
              </>
            )}

            {viewAsAdmin && data && !isEditMode && (
              <div className="profile-edit-button">
                <Button
                  label={"Edit"}
                  Icon={<Edit20 />}
                  bgColor={"white"}
                  borderColor={"wheat"}
                  color={"wheat"}
                  handleClick={() => toggleEditMode()}
                />
              </div>
            )}
          </section>
        </>
      )}
    </nav>
  );
};

const ProfileForm = ({ formik, toggleEditMode }: any) => {
  const { values, handleSubmit, handleChange, handleBlur } = formik;
  return (
    <>
      <span className="user-name">
        <div className="form-group">
          <input
            className="form-control-sm"
            type={"text"}
            placeholder="Name"
            name="profile.full_name"
            value={values?.profile?.full_name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </span>
      <section className="user-intro-form">
        <textarea
          className="form-control-sm"
          rows={5}
          placeholder="Introduction"
          value={values?.profile?.intro}
          onChange={handleChange}
          onBlur={handleBlur}
          name="profile.intro"
        />
      </section>
      <section className="user-contact-info">
        <div className="user-email">
          <Email16 /> &nbsp;
          <input
            className="form-control-sm"
            type={"text"}
            placeholder="Email"
            value={values?.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
          />
        </div>
        <div className="user-contact">
          <Phone16 /> &nbsp;
          <input
            className="form-control-sm"
            type={"text"}
            placeholder="Phone"
            value={values?.profile?.mobile_number}
            onChange={handleChange}
            onBlur={handleBlur}
            name="profile.mobile_number"
          />
        </div>
        <div className="user-link">
          <LogoGithub16 /> &nbsp;
          <input
            className="form-control-sm"
            type={"text"}
            placeholder="Github"
            value={values?.profile?.social?.github}
            onChange={handleChange}
            onBlur={handleBlur}
            name="profile.social.github"
          />
        </div>
        <div className="user-link">
          <LogoTwitter16 /> &nbsp;
          <input
            className="form-control-sm"
            type={"text"}
            placeholder="Twitter"
            value={values?.profile?.social?.twitter}
            onChange={handleChange}
            onBlur={handleBlur}
            name="profile.social.twitter"
          />
        </div>
        <div className="user-link">
          <LogoInstagram16 /> &nbsp;
          <input
            className="form-control-sm"
            type={"text"}
            placeholder="Instagram"
            value={values?.profile?.social?.instagram}
            onChange={handleChange}
            onBlur={handleBlur}
            name="profile.social.instagram"
          />
        </div>
      </section>

      <div className="profile-edit-button">
        <Button
          label={"Cancel"}
          Icon={<Close20 />}
          bgColor={"white"}
          borderColor={"wheat"}
          color={"wheat"}
          handleClick={() => toggleEditMode()}
        />
        &nbsp;
        <Button
          label={"Save"}
          Icon={<Save20 />}
          bgColor={"white"}
          borderColor={"wheat"}
          color={"wheat"}
          handleClick={() => formik?.handleSubmit()}
        />
      </div>
    </>
  );
};

export default UserLeftBar;
