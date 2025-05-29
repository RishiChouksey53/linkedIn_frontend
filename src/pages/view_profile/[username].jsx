import { BASE_URL, clientServer } from "@/config";
import React, { use, useEffect, useState } from "react";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction";
import {
  getAboutUser,
  getConnectionRequestsSend,
  sendConnectionRequest,
} from "@/config/redux/action/authAction";
import UserLayout from "@/layout/UserLayout";

export default function ViewUserProfile({ userProfile }) {
  const postState = useSelector((state) => state.post);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const [isCurrentUserInConnection, setIsCurrentUserInConnection] =
    useState(false);
  const [isConnectionNull, setIsConnectionNull] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAboutUser({ token: localStorage.getItem("token") }));
      await dispatch(getAllPosts());
      await dispatch(
        getConnectionRequestsSend({ token: localStorage.getItem("token") })
      );
    };
    fetchData();
  }, []);

  const filterUserPosts = () => {
    const filterPosts = postState.posts.filter(
      (post) => post.userId._id == userProfile.userId._id
    );
    setUserPosts(filterPosts);
  };

  useEffect(() => {
    if (postState.postFetched) {
      filterUserPosts();
    }
  }, [postState.postFetched, postState.posts]);

  useEffect(() => {
    if (Array.isArray(authState.connections)) {
      const connection = authState.connections.find(
        (user) => user.connectionId._id === userProfile.userId._id
      );
      if (connection) {
        setIsCurrentUserInConnection(true);
        if (connection.status_accepted === true) {
          setIsConnectionNull(false);
        }
      }
    }
  }, [authState.connections, isConnectionNull]);

  return (
    <UserLayout>
      {authState.user ? (
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            {userProfile.userId.profilePicture && (
              <img
                src={`${BASE_URL}/${userProfile.userId.profilePicture}`}
                alt="Profile"
                className={styles.profilePic}
              />
            )}
            <div>
              <h2 className={styles.name}>{userProfile.userId.name}</h2>
              <p className={styles.username}>@{userProfile.userId.username}</p>
              <p className={styles.email}>{userProfile.userId.email}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {isCurrentUserInConnection ? (
              <div className={styles.connection}>
                {isConnectionNull ? <p>Pending</p> : <p>Connected</p>}
              </div>
            ) : (
              <div
                className={styles.connection}
                onClick={async () => {
                  await dispatch(
                    sendConnectionRequest({
                      token: localStorage.getItem("token"),
                      connectionId: userProfile.userId._id,
                    })
                  );
                  dispatch(
                    getConnectionRequestsSend({
                      token: localStorage.getItem("token"),
                    })
                  );
                }}
              >
                <p>Connect</p>
              </div>
            )}

            <div
              className={styles.downloadIcon}
              onClick={async () => {
                const response = await clientServer.get(
                  `/user/download_profile?id=${userProfile.userId._id}`
                );
                window.open(`${BASE_URL}/${response.data.message}`, "_blank");
              }}
            >
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
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </div>
          </div>

          {/* Bio */}
          <div className={styles.section} style={{ marginBottom: "1rem" }}>
            <h3 className={styles.heading}>Bio</h3>
            <p className={styles.text}>{userProfile.bio}</p>
          </div>

          {/* Current Post */}
          {userProfile.currentPost && (
            <div className={styles.section}>
              <h3 className={styles.heading}>Current Post</h3>
              <p className={styles.text}>{userProfile.currentPost}</p>
            </div>
          )}

          <div className={styles.profileDetails}>
            <div>
              {/* Past Work */}

              <div className={styles.section}>
                <h3 className={styles.heading}>Past Work</h3>
                <ul className={styles.list}>
                  {userProfile.pastWork.map((work) => (
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
                  {userProfile.education.map((edu) => (
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
            <div className={styles.recentActivity}>
              <h3 className={styles.recentActivityTitle}>Recent Activity</h3>
              <ul className={styles.recentActivityList}>
                {userPosts.map((post) => (
                  <li key={post._id} className={styles.recentActivityItem}>
                    <p className={styles.postBody}>{post.body}</p>
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
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
            alignItems: "center",
          }}
        >
          <div className={styles.spinner}></div>
        </div>
      )}
    </UserLayout>
  );
}

export async function getServerSideProps(context) {
  const username = context.params.username;
  const request = await clientServer.get(
    `/user/get_profile_based_on_username`,
    {
      params: { username },
    }
  );
  return { props: { userProfile: request.data.userProfile } };
}
