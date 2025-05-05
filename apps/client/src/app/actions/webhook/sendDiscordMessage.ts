"use server";

import { ENV } from "@/constants/env";

export default async function sendDiscordMessageAction(message: string) {
  const payload = {
    content: message,
  };

  try {
    const response = await fetch(ENV.WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return {
        status: 200,
        success: true,
        message: "Fetch scenes successfully",
        data: null,
      };
    } else {
      return {
        status: 500,
        success: false,
        message: "Fetch scenes successfully",
        data: null,
      };
    }
  } catch {
    return {
      status: 500,
      success: false,
      message: "Fetch scenes successfully",
      data: null,
    };
  }
}
