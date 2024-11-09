"use server";

import { auth } from "@clerk/nextjs/server";

export async function getSignedURL() {
  const { userId } = auth();

  if (!userId)
    return {
      failure: "Unauthorized",
    };
  return {
    success: { url: "" },
  };
}
