import React, { useEffect } from "react";
import UserLayout from "../UserLayout";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { setTokenIsThere } from "@/config/redux/reducer/authReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAboutUser,
  getAllUsersProfile,
} from "@/config/redux/action/authAction";

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/login");
    }
    if (!authState.all_profiles_fetched) {
      dispatch(getAllUsersProfile());
      dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }
    dispatch(setTokenIsThere());
  }, []);

  return (
    <UserLayout>
      {authState.user ? (
        <>
          <div className={styles.container}>
            <div className={styles.homeContainer_left}>
              <div
                onClick={() => {
                  router.push("/dashboard");
                }}
                className={styles.sideBarOptions}
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
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <p>Home</p>
              </div>
              <div
                onClick={() => {
                  router.push("/discover");
                }}
                className={styles.sideBarOptions}
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
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>

                <p>Discover</p>
              </div>
              <div
                onClick={() => {
                  router.push("/my_connections");
                }}
                className={styles.sideBarOptions}
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
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <p>My&nbsp;Connections</p>
              </div>
            </div>

            {/* dashboard dynamic  */}
            <div className={styles.feedContainer}>{children}</div>

            <div className={styles.extraContainer}>
              <h3>Top Profiles</h3>
              {!authState.all_profiles_fetched ? (
                <div className={styles.topProfileLoader}></div>
              ) : (
                <div style={{ marginTop: ".5rem" }}>
                  {authState.all_profiles.map((profile) => (
                    <p>{profile.userId.name}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.mobileNavBar}>
            <div
              className={styles.singleNavItemHolder}
              onClick={() => {
                router.push("/dashboard");
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
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </div>
            <div
              className={styles.singleNavItemHolder}
              onClick={() => {
                router.push("/discover");
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <div
              className={styles.singleNavItemHolder}
              onClick={() => {
                router.push("/my_connections");
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <div style={{display: "flex", justifyContent: "center", marginTop: "5rem", alignItems: "center"}}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </UserLayout>
  );
};

export default DashboardLayout;
