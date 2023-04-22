import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Forms.module.css";

export default function signup() {
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
      const res = await axios.post("/api/users/register", user);
      const { token, message } = res.data;
      setMessage(message);
      if (token) {
        localStorage.setItem("token", token);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <span className="text-center text-green-600 font-medium">{message}</span>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.title}>Signup</h1>
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
            Signup
          </button>
        </form>
      </div>
    </>
  );
}
