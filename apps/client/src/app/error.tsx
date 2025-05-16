"use client";

import Button from "@/components/Button";
import clsx from "clsx";
import sendDiscordMessageAction from "./actions/webhook/sendDiscordMessage";
import { toast } from "react-toastify";

export default function KnockServerError() {
  const handleKnockClick = async () => {
    try {
      await sendDiscordMessageAction("🚀 A server open request has been received! 🏃‍♂️");
      toast("Request successfully sent!");
    } catch {
      toast.error("An error occurred while sending the request. Please try again.");
    }
  };

  return (
    <main className={clsx("mt-[var(--header-height)]", "mx-auto p-6 pt-[200px] text-center")}>
      <h2 className="text-2xl font-bold mb-4">🌙 Server is Sleeping...</h2>
      <p className="text-gray-700 mb-6">
        The server is currently offline.
        <br />
        Knock to wake it up! 🔔
      </p>
      <Button onClick={handleKnockClick}>🚪 Knock 🚪</Button>
    </main>
  );
}
