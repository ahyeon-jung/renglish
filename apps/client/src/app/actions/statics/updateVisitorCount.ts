"use server";

import { fetchAPI } from "@/libs/api";

export default async function updateVisitorCount() {
  await fetchAPI(`/statistics/visitor/count`, {
    method: "POST",
  });

  return {
    status: 200,
    success: true,
    message: "Upload Scene successfully",
    data: null,
  };
}
