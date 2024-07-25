"use server";

import { createAndTransferCrytpo } from "@/utils/web3-connection";

export async function sendAirDropAsync(
  prevState: { message: string },
  formData: FormData
): Promise<{
  status: "failed" | "pending" | "success";
  message: string;
}> {
  const publicKey = formData.get("publicKey");
  if (typeof publicKey !== "string") {
    return {
      status: "failed",
      message: "Public key is required and must be a string",
    };
  }
  const res = await createAndTransferCrytpo(publicKey);
  if (res) {
    return {
      status: res.type,
      message: res.res,
    };
  }
  return {
    status: "failed",
    message: "This is working",
  };
}
