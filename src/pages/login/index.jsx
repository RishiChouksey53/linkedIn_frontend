import UserLayout from "@/layout/UserLayout";
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { loginUser, registerUser } from "@/config/redux/action/authAction";
import { emptyMessage } from "@/config/redux/reducer/authReducer";

const Login = () => {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedMethod, setIsLoggedMethod] = useState(true);

  useEffect(() => {
    if (authState.isLoggedIn) {
      router.push("/dashboard");
    }
  }, [authState.isLoggedIn]);

  useEffect(() => {
    dispatch(emptyMessage());
  }, []);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    dispatch(emptyMessage());
  }, [isLoggedMethod]);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
    setEmail("");
    setPassword("");
    console.log("Login");
  };

  const handleRegister = () => {
    dispatch(registerUser({ email, password, name, username }));
    setEmail("");
    setUsername("");
    setName("");
    setPassword("");
    console.log("Register");
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer_left}>
            <p className={styles.heading_left}>
              {isLoggedMethod ? "Sign In" : "Sign Up"}
            </p>
            {authState.message && (
              <p style={{ color: authState.isError ? "red" : "green" }}>
                {authState.message}
              </p>
            )}
            <div className={styles.inputContainer}>
              {!isLoggedMethod ? (
                <div className={styles.inputRow}>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              ) : null}
              <input
                type="text"
                className={styles.inputField}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className={styles.inputField}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => {
                  if (isLoggedMethod) {
                    handleLogin();
                  } else {
                    handleRegister();
                  }
                }}
                className={styles.btn}
              >
                {isLoggedMethod ? "Sign In" : "Sign Up"}
              </div>
            </div>
          </div>
          <div className={styles.cardContainer_right}>
            <p className={styles.heading_right}>
              {isLoggedMethod
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <div
              onClick={() => {
                setIsLoggedMethod(!isLoggedMethod);
              }}
              className={styles.btn}
            >
              {isLoggedMethod ? "Sign Up" : "Sign In"}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Login;
