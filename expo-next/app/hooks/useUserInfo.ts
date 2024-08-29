import { useEffect, useState } from "react";
import { getUserInfo } from "../utils/getUserInfo";

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserInfo() {
      const user = await getUserInfo();
      const data = await user?.json();
      setUserInfo(data);
      setLoading(false);
    }

    fetchUserInfo();
  }, []);

  return { userInfo, loading };
}
