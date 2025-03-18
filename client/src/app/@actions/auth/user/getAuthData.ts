"use server";

import { ENV } from "@/constants/env";
import { cookies } from "next/headers";

export default async function getAuthDataAction(): Promise<{
  id: string;
  email: string;
}> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(`${ENV.SERVER_HOST}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Fetch data failed");
  }

  const { data } = await response.json();

  return data;
}
