import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAboutUser } from "@/config/redux/action/authAction";
import { reset } from "@/config/redux/reducer/authReducer";
const Navbar = () => {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <div className={styles.container}>
        <nav className={styles.navBar}>
          <h1
            onClick={() => {
              if (authState?.user) {
                router.push("/dashboard");
              } else {
                router.push("/");
              }
            }}
            style={{ cursor: "pointer", fontSize: "2rem" }}
          >
            Pro Connect
          </h1>
          <div className={styles.menuItems}>
            {authState?.profileFetced ? (
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <p
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  Profile
                </p>
                <div
                  onClick={() => {
                    localStorage.removeItem("token");
                    dispatch(reset());
                    router.push("/");
                  }}
                  className={styles.LogoutBtn}
                >
                  <p>Logout</p>
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  router.push("/login");
                }}
                className={styles.buttonJoin}
              >
                <p>Be a Part</p>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
