import {
  acceptConnectionRequest,
  getConnectionRequestsReceived,
} from "@/config/redux/action/authAction";
import DashboardLayout from "@/layout/DashboardLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { BASE_URL } from "@/config";
import { useRouter } from "next/router";

export default function MyConnections() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(
      getConnectionRequestsReceived({ token: localStorage.getItem("token") })
    );
  }, []);

  useEffect(() => {
    if (authState.connectionRequest.length > 0) {
      console.log(
        "Connection Requests Received: ",
        authState.connectionRequest
      );
    }
  }, [authState.connectionRequest]);

  return (
    <DashboardLayout>
      {authState.connectionRequest.length === 0 && (
        <h2 className={styles.heading}>No Connection Request.</h2>
      )}
      {authState.connectionRequest.length > 0 && (
        <div className={styles.card}>
          {authState.connectionRequest
            .filter((connection) => connection.status_accepted === null)
            .map((user) => (
              <div
                className={styles.messageCard}
                onClick={() =>
                  router.push(`/view_profile/${user.userId.username}`)
                }
                key={user._id}
              >
                <div className={styles.userDetails}>
                  <img
                    src={`${BASE_URL}/${user.userId.profilePicture}`}
                    alt="Profile"
                    className={styles.profilePic}
                  />
                  <div className={styles.userInfo}>
                    <div className={styles.username}>{user.userId.name}</div>
                    <div className={styles.handle}>@{user.userId.username}</div>
                  </div>
                </div>

                <div className={styles.action}>
                  <div
                    onClick={async (e) => {
                      e.stopPropagation();
                      await dispatch(
                        acceptConnectionRequest({
                          token: localStorage.getItem("token"),
                          connectionId: user.userId._id,
                          action: "accept",
                        })
                      );
                      dispatch(
                        getConnectionRequestsReceived({
                          token: localStorage.getItem("token"),
                        })
                      );
                    }}
                    className={styles.acceptBtn}
                  >
                    <p>Accept</p>
                  </div>
                  <svg
                    onClick={(e) => e.stopPropagation()}
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            ))}
          <h2 className={styles.heading}>My Connections.</h2>
          {authState.connectionRequest
            .filter((connection) => connection.status_accepted !== null)
            .map((user) => (
              <div
                className={styles.messageCard}
                onClick={() =>
                  router.push(`/view_profile/${user.userId.username}`)
                }
                key={user._id}
              >
                <div className={styles.userDetails}>
                  <img
                    src={`${BASE_URL}/${user.userId.profilePicture}`}
                    alt="Profile"
                    className={styles.profilePic}
                  />
                  <div className={styles.userInfo}>
                    <div className={styles.username}>{user.userId.name}</div>
                    <div className={styles.handle}>@{user.userId.username}</div>
                  </div>
                </div>

                <div className={styles.action}>
                  <svg
                    onClick={(e) => e.stopPropagation()}
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            ))}
        </div>
      )}
    </DashboardLayout>
  );
}
