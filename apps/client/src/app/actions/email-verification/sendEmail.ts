"use server";

import { FetchError, handleFetchError } from "@/utils/error";

import { EMAIL_REGEX } from "@/constants/regex";
import { emailVerificationApi } from "@/libs/api";
import type { ActionResponse } from "@/types/action";
import { getUserByEmailAction } from "../users/getUser";

type SendEmailParams = { email: string };

export default async function sendEmail({ email }: SendEmailParams): Promise<ActionResponse<null>> {
  if (!email) {
    return { status: 400, success: false, message: "no required data", data: null };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { status: 400, success: false, message: "Enter a valid email format.", data: null };
  }

  try {
    const { data: user } = await getUserByEmailAction({ email });
    if (user) {
      return { status: 409, success: false, message: "Already exists email", data: null };
    }

    await emailVerificationApi.emailVerificationControllerSendEmailWithOTP({
      sendEmailDto: { email },
    });

    return { status: 200, success: true, message: "Send email successfully", data: null };
  } catch (e) {
    if (e instanceof FetchError) {
      const error = await handleFetchError(e);
      return { status: error.statusCode, success: false, message: error.message, data: null };
    }
    throw new Error();
  }
}
