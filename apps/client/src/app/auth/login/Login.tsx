import { PATHS } from "@/constants/path";
import Link from "next/link";
import AuthContainer from "../_components/AuthContainer";
import SocialButtons from "../_components/SocialButtons";
import EmailLoginForm from "./_components/EmailLoginForm";

export default function LoginPage() {
  return (
    <AuthContainer title="Login">
      <div className="flex flex-col gap-4">
        <SocialButtons type="login" />
        <div className="flex items-center gap-2">
          <div className="border-t border-gray-300 w-full" />
          <div className="text-gray-400">or</div>
          <div className="border-t border-gray-300 w-full" />
        </div>
        <EmailLoginForm />
        <div className="flex flex-col gap-2">
          <div className="text-center">
            Don&apos;t have an account?{" "}
            <Link href={PATHS.AUTH.REGISTER} className="underline">
              Register
            </Link>
          </div>
          <div className="text-center">
            Forgot your password?{" "}
            <Link href={PATHS.AUTH.RESET_PASSWORD} className="underline">
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}
