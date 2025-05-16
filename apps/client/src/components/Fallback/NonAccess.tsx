"use client";

import { useRouter } from "next/navigation";
import Button from "../Button";

export default function NonAccess() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">NonAccess</h1>
      <p className="text-gray-500">You do not have access to this page.</p>
      <Button onClick={() => router.push("/")}>Go to Home</Button>
    </div>
  );
}
