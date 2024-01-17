import { loginSchema } from "@/types";
import { z } from "zod";
import { API_BASE_URL } from "@/lib/constants";
import jsCookie from "js-cookie";

const login = async (data: z.infer<typeof loginSchema>) => {
  const response = await fetch(`${API_BASE_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const res = await response.json();
    jsCookie.set("token", res.token, { expires: 7 });
    return res;
  }

  const error = await response.json();
  throw new Error(error.message);
};

export { login };
