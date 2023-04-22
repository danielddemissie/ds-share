import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/Forms.module.css";

export default function signin() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", user);
      const { token, message, user: signedUser } = res.data;
      console.log(signedUser);
      setMessage(message);
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", signedUser._id);
        router.push("/");
      }
    } catch (error: any) {
      setMessage(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <span className="text-center text-green-600 font-medium">{message}</span>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Signin</h1>
          <div>
            <label htmlFor="name" className={styles.label}>
              username
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              id="name"
              onChange={onChangeHandler}
              placeholder="username"
            />
          </div>
          <div>
            <label htmlFor="name" className={styles.label}>
              password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              id="password"
              onChange={onChangeHandler}
              placeholder="password"
            />
          </div>
          <button className={styles.btnForm} type="submit">
            Signin
          </button>
        </form>
      </div>
    </>
  );
}
