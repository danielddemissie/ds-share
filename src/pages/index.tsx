import { useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";

export default function Home({ images }: { images: string[] }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function getUserDetail() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        const resp = await axios.get(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (resp.data.data) {
          localStorage.setItem("user-detail", JSON.stringify(resp.data.data));
          setIsLoggedIn(true);
        }
      } else {
      }
    }

    getUserDetail();
  }, []);
  return <>{isLoggedIn ? <Dashboard /> : <Landing />}</>;
}
