"use client";

import logoutAction from "@/app/actions/auth/logout";
import { PATHS } from "@/constants/path";
import { useUserStore } from "@/stores/userStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const redirect = useSearchParams().get('redirect') || PATHS.HOME;
  const { clearUser } = useUserStore();

  useEffect(() => {
    logoutAction();
    clearUser();
    router.push(redirect);
  }, [clearUser, redirect, router]);

  return <div>Logging out...</div>;
}
