"use client"

import SingleErrorMessage from "@/components/errors/SingleError";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { forgotPassFormSchemaValidation } from "@/zod/auth/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Waves } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPassword } from "../../../../auth/auth";
import { toast } from "sonner";
import ConfirmationMessage from "../ConfirmationMessage";
import { set } from "lodash";

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
      cemail: ""
    },
    mode: "onChange"
  })

  async function onSubmit(values: z.infer<typeof forgotPassFormSchemaValidation>) {
    setLoading(true);
    
    const response = await forgotPassword(values);
    
    console.log(response, "response")
    if (response.error && response.statusCode === 403) {
      setError(response.message)
      toast.error(tForgot('toast.error'))
      setLoading(false);
      return;
    } else if (response.error && response.statusCode !== 403) {
      toast.error(tForgot('toast.error'))
      return;
    }
    setMailSent(true);
    toast.success(tForgot('toast.success'))
    form.reset();
    setLoading(false);
  }
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm border px-10 py-4 rounded-xl shadow-sm bg-white/90 dark:bg-background">
          {mailSent ? (
            <ConfirmationMessage>
              <h2>Un mail vous ait envoyé</h2>
              <p>Cliquer sur le lien de cleui ci</p>
            </ConfirmationMessage>
          ) : (
          <>
          <Waves className="justify-center mx-auto text-center h-16 w-16" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            {tForgot("title")}
          </h2>
          {error && <SingleErrorMessage message={error} />}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tInput('Email.name')}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder={tInput('Email.placeholder')}
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
                    <FormLabel>{tInput('CEmail.name')}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder={tInput('CEmail.placeholder')}
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
                  disabled={form.formState.isLoading || loading || !form.formState.isValid}
                  className="w-full"
                  type="submit"
                >{tButton('login')}</Button>
              </div>
            </form>
          </Form>
          <p className="mt-10 text-center text-sm text-gray-500">
            {tForgot('back')}{" "}
            <Link
              href="/login"
              className="classicLink"
            >
              {tForgot("signin")}
            </Link>
          </p>
          </>
          )}
        </div>

      </div>
    </>
  )
}
