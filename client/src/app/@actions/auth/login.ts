"use server";

import { ENV } from "@/constants/env";
import { cookies } from "next/headers";

type LoginAction = { email: string; password: string };

export default async function loginAction({ email, password }: LoginAction) {
  const response = await fetch(`${ENV.SERVER_HOST}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const {
    data: { token },
  } = await response.json();

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return token;
}
