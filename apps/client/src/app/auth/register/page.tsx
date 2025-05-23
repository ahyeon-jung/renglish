"use client";

import Button from "@/components/Button";
import { PATHS } from "@/constants/path";
import Link from "next/link";
import { useState } from "react";
import AuthContainer from "../_components/AuthContainer";
import SocialButtons from "../_components/SocialButtons";
import EmailRegisterForm from "./_components/EmailRegisterForm";

export default function Register() {
  const [isEmailRegisterFormOpen, setIsEmailRegisterFormOpen] = useState(false);

  return (
    <AuthContainer title="Register">
      {isEmailRegisterFormOpen ? (
        <EmailRegisterForm />
      ) : (
        <div className="flex flex-col gap-4">
          <SocialButtons type="register" />
          <div className="flex items-center gap-2">
            <div className="border-t border-gray-300 w-full" />
            <div className="text-gray-400">or</div>
            <div className="border-t border-gray-300 w-full" />
          </div>
          <Button onClick={() => setIsEmailRegisterFormOpen(true)}>Email Register</Button>
          <div className="text-center">
            Already have an account?{" "}
            <Link href={PATHS.AUTH.LOGIN} className="underline">
              Login
            </Link>
          </div>
        </div>
      )}
    </AuthContainer>
  );
}
