import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function login() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  if (token) router.push("/");

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
      const { token, message } = res.data;
      setMessage(message);
      if (token) {
        localStorage.setItem("token", token);
        router.push("/");
      }
    } catch (error: any) {
      setMessage(error.message);
      console.log(error);
    }
  };

  //TODO: login logic
  //TODO: redirect to home page if logged in
  return (
    <>
      <span className="text-center text-green-600 font-medium">{message}</span>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            id="name"
            onChange={onChangeHandler}
            placeholder="Give yourself unique name"
          />
        </div>
        <div>
          <label htmlFor="name">password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            id="password"
            onChange={onChangeHandler}
            placeholder="enter your password"
          />
        </div>
        <button className="btn-login" type="submit">
          Login
        </button>
      </form>
    </>
  );
}
