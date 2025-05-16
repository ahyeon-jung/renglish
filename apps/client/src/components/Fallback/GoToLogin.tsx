import clsx from "clsx";
import Link from "next/link";
import { PATHS } from "@/constants/path";

export default function GoToLogin() {
  return (
    <main className={clsx("mt-[200px] py-4", "flex flex-col items-center text-gray-800")}>
      <section className="text-center">
        <h1 className="text-2xl font-bold text-orange-600 mb-2">🎓 Unlock Premium Benefits!</h1>
        <p className="text-md leading-relaxed">
          Log in now to explore all the benefits of your Premium Membership.
        </p>
        <div className="flex flex-col gap-1">
          <Link
            rel="noopener noreferrer"
            href={PATHS.AUTH.REGISTER}
            className="mt-3 inline-block bg-orange-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
          >
            Go to Register
          </Link>
          <Link
            rel="noopener noreferrer"
            href={PATHS.NOTICES.MEMBER}
            className="mt-3 inline-block bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
          >
            View Membership Benefits
          </Link>
        </div>
      </section>
    </main>
  );
}
