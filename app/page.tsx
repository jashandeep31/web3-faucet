"use client";
import { sendAirDropAsync } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

const Page = () => {
  const [state, action] = useFormState(sendAirDropAsync, {
    status: "pending",
    message: "",
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "failed") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={""}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Devnet wallet
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Recharge your solana devnet wallet with the amount of 0.01 sol in
            free of cost.
          </p>
          <form action={action}>
            <div className="flex items-end gap-2 md:min-w-[25vw]">
              <div className="flex-1 text-left">
                <Label>Wallet address:</Label>
                <Input name="publicKey" className="" />
              </div>
              <SubmitButton />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

const SubmitButton = () => {
  const status = useFormStatus();
  return (
    <Button disabled={status.pending}>
      {status.pending ? "sending.." : "Recharge"}{" "}
    </Button>
  );
};
export default Page;
