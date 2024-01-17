import jsCookie from "js-cookie";
import { useEffect, useState } from "react";

export const useLogin = () => {
  const token = jsCookie.get("token");
  const [status, setStatus] = useState(Boolean(token));

  useEffect(() => {
    if (token) {
      setStatus(true);
    }
  }, [token]);

  return { status };
};
