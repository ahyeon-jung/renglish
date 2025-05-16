"use server";

import { fetchAPI } from "@/libs/api";

export default async function getVisitorCount() {
  const response = await fetchAPI<number>(`/statistics/visitor/count`, {
    method: "GET",
  });

  return {
    status: 200,
    success: true,
    message: "Fetch scenes successfully",
    data: response.data,
  };
}
