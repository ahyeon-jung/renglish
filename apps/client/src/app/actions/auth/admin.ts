"use server";

import { ENV } from "@/constants/env";
import { cookies } from "next/headers";
import { authApi } from "@/libs/api";

export default async function adminAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ENV.COOKIE_ACCESS_TOKEN_KEY)?.value;
    if (!token) {
      return false;
    }

    const isAdmin = authApi.authControllerCheckIsAdmin();

    return isAdmin;
  } catch {
    return false;
  }
}
