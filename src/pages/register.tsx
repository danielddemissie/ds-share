import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function register() {
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
      <h1>Register</h1>
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
        <button className="btn-register" type="submit">
          Register
        </button>
      </form>
    </>
  );
}
