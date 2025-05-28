import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { BASE_URL, clientServer } from "@/config";
import { useDispatch } from "react-redux";
import UserLayout from "@/layout/UserLayout";
import { getAboutUser } from "@/config/redux/action/authAction";
export default function Profile() {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const UpdateProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profile_picture", file);
    formData.append("token", localStorage.getItem("token"));
    const response = await clientServer.post(
      "/user/update_profile_picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(getAboutUser({ token: localStorage.getItem("token") }));
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getAboutUser({ token: token }));
    }
  },[]);

  if (!authState.user) {
    return <div style={{padding: "2rem"}}>Loading...</div>;
  } else {
    return (
      <UserLayout>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.editImg}>
              <label
                htmlFor="uploadProfilePicture"
                style={{ cursor: "pointer" }}
              >
                <p>Edit</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </label>
              <input
                onChange={(e) => {
                  UpdateProfilePicture(e.target.files[0]);
                }}
                type="file"
                hidden
                id="uploadProfilePicture"
              />
            </div>
            {authState?.user?.userId?.profilePicture && (
              <img
                src={`${BASE_URL}/${authState?.user?.userId?.profilePicture}`}
                alt="Profile"
              />
            )}
            <div>
              <h2 className={styles.name}>{authState.user.userId.name}</h2>
              <p className={styles.username}>
                @{authState.user.userId.username}
              </p>
              <p className={styles.email}>{authState.user.userId.email}</p>
            </div>
          </div>

          {/* Bio */}
          <div className={styles.section} style={{ marginBottom: "1rem" }}>
            <h3 className={styles.heading}>Bio</h3>
            <p className={styles.text}>{authState.user.bio}</p>
          </div>

          {/* Current Post */}
          {authState.user.currentPost && (
            <div className={styles.section}>
              <h3 className={styles.heading}>Current Post</h3>
              <p className={styles.text}>{authState.user.currentPost}</p>
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: "1rem",
              width: "100%",
              justifyContent: "space-between",
              borderTop: "1px solid #ccc",
            }}
          >
            <div>
              {/* Past Work */}

              <div className={styles.section}>
                <h3 className={styles.heading}>Past Work</h3>
                <ul className={styles.list}>
                  {authState.user.pastWork.map((work) => (
                    <li key={work._id} className={styles.listItem}>
                      <p className={styles.position}>{work.position}</p>
                      <p className={styles.details}>
                        {work.company} | {work.years} years
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}

              <div className={styles.section}>
                <h3 className={styles.heading}>Education</h3>
                <ul className={styles.list}>
                  {authState.user.education.map((edu) => (
                    <li key={edu._id} className={styles.listItem}>
                      <p className={styles.position}>
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                      <p className={styles.details}>{edu.school}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <div className={styles.recentActivity}>
            <h3 className={styles.recentActivityTitle}>Recent Activity</h3>
            <ul className={styles.recentActivityList}>
              {userPosts.map((post) => (
                <li key={post._id} className={styles.recentActivityItem}>
                  <div className={styles.postHeader}>
                    <img
                      src={`${BASE_URL}/${authState.user.userId.profilePicture}`}
                      alt="User Profile"
                      className={styles.profilePic}
                    />
                    <p className={styles.postBody}>{post.body}</p>
                  </div>
                  {post.media && (
                    <img
                      src={`${BASE_URL}/${post.media}`}
                      alt="Post Media"
                      className={styles.recentActivityMedia}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div> */}
          </div>
        </div>
      </UserLayout>
    );
  }
}
