"use client";

import SingleErrorMessage from "@/components/errors/SingleFieldError";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { forgotPassFormSchemaValidation } from "@/zod/auth/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Waves } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPassword } from "../../../../auth/auth";
import { toast } from "sonner";
import ConfirmationMessage from "../ConfirmationMessage";
import WrapperCard from "../WrapperCard";

export default function ForgottenPassForm() {
  const tForgot = useTranslations("Forgotten_Password");
  const tInput = useTranslations("Input");
  const tButton = useTranslations("Button");

  const [loading, setLoading] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof forgotPassFormSchemaValidation>>({
    resolver: zodResolver(forgotPassFormSchemaValidation),
    defaultValues: {
      email: "",
      cemail: "",
    },
    mode: "onChange",
  });

  async function onSubmit(
    values: z.infer<typeof forgotPassFormSchemaValidation>
  ) {
    setLoading(true);
    const response = await forgotPassword(values);
    if (response.error && response.statusCode === 403) {
      setError(response.message);
      toast.error(tForgot("toast.error"));
      setLoading(false);
      return;
    } else if (response.error && response.statusCode !== 403) {
      toast.error(tForgot("toast.error"));
      return;
    }
    console.log({response})
    setMailSent(true);
    toast.success(tForgot("toast.success"));
    form.reset();
    setLoading(false);
  }
  return (
    <WrapperCard
      headerLabel={mailSent ? tForgot("confirmation_message.title") : tForgot("title")}
      backButtonHref={mailSent ? null : "/login"}
      backButtonLabel={mailSent ? null : tForgot("signin")}
      beforeButtonText={mailSent ? null : tForgot("back")}
    >
      {mailSent ? (
        <ConfirmationMessage>
          <h2 className="font-bold">{tForgot("confirmation_message.title")}</h2>
          <p>{tForgot("confirmation_message.message")}</p>
        </ConfirmationMessage>
      ) : (
        <>
          {error && <SingleErrorMessage message={error} />}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tInput("Email.name")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder={tInput("Email.placeholder")}
                        {...field}
                        className="input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cemail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tInput("CEmail.name")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder={tInput("CEmail.placeholder")}
                        {...field}
                        className="input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6">
                <Button
                  disabled={
                    form.formState.isLoading ||
                    loading ||
                    !form.formState.isValid
                  }
                  className="w-full"
                  type="submit"
                >
                  {tButton("confirm")}
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </WrapperCard>
  );
}
