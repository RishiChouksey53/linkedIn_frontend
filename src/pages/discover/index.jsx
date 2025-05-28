import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  getAboutUser,
  getAllUsersProfile,
} from "@/config/redux/action/authAction";
import styles from "./styles.module.css";
import { BASE_URL } from "@/config";
import { useRouter } from "next/router";

export default function Discover() {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  const [searchUser, setSearchUser] = useState("");
  const [filterProfile, setFilterProfile] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authState.all_profiles_fetched) {
      dispatch(getAllUsersProfile());
    }
  }, []);

  useEffect(() => {
    const filter = () => {
      if (!authState.all_profiles) return;
      const result = authState.all_profiles.filter(
        (user) =>
          user.userId.name.toLowerCase().includes(searchUser.toLowerCase()) &&
          user.userId._id != authState?.user?.userId._id
      );
      setFilterProfile(result);
    };
    filter();
  }, [searchUser, authState.all_profiles]);

  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "1rem",
        }}
      >
        <input
          className={styles.input}
          placeholder="Search User"
          type="text"
          value={searchUser}
          onChange={(e) => {
            setSearchUser(e.target.value);
          }}
        />
      </div>
      <div className={styles.card}>
        {filterProfile.map((user) => (
          <div
            className={styles.userCard}
            onClick={() => {
              router.push(`/view_profile/${user.userId.username}`);
            }}
            key={user._id}
          >
            <div className={styles.messageCard} key={user._id}>
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
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
