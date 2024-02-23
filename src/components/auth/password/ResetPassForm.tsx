"use client"

import SingleErrorMessage from "@/components/errors/SingleFieldError";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useRouter } from "@/i18n/navigation";
import { resetPasswordSchemaValidation } from "@/zod/auth/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Waves } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPassword } from "../../../../auth/auth";
import { toast } from "sonner";

export default function ResetPassForm() {
  const tReset = useTranslations("Reset_Password");
  const tForgot = useTranslations("Forgotten_Password");
  const tInput = useTranslations("Input");
  const tButton = useTranslations("Button");

  const [visible, setVisible] = useState(false);
  const [visibleCpass, setVisibleCpass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { token } = useParams()
  const tokenValue = Array.isArray(token) ? token[0] || "" : token || "";


  const form = useForm<z.infer<typeof resetPasswordSchemaValidation>>({
    resolver: zodResolver(resetPasswordSchemaValidation),
    defaultValues: {
      password: "",
      cpassword: "",
      token: tokenValue
    },
    mode: "onChange"
  })

  async function onSubmit(values: z.infer<typeof resetPasswordSchemaValidation>) {
    setLoading(true);
    const response = await resetPassword(values);

    if (response.error && response.statusCode === 403) {
      setError(response.message)
      toast.error(tReset('toast.error'))
      setLoading(false);
      return;
    } else if (response.error && response.statusCode !== 403) {
      toast.error(tReset('toast.error'))
      return;
    }
    toast.success(tReset('toast.success'))
    form.reset();
    router.push('/login')
    setLoading(false);
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm border px-10 py-4 rounded-xl shadow-sm bg-white/90 dark:bg-background">
          <Waves className="justify-center mx-auto text-center h-16 w-16" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            {tReset("title")}
          </h2>
          {error && <SingleErrorMessage message={error} />}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >

              <div className="hidden">
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>T</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="hidden"
                            {...field}
                            className="input w-full relative"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tInput('Reset_Password.name')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={visible ? 'text' : 'password'}
                          placeholder={tInput('Reset_Password.placeholder')}
                          {...field}
                          className="input w-full relative"
                        />
                        <div
                          onClick={() => setVisible(!visible)}
                          className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-1.5 ">
                          {visible ? (
                            <EyeOff className="w-[15px] h-[15px] text-secondary-foreground" />
                          ) : (
                            <Eye className="w-[15px] h-[15px] text-secondary-foreground" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tInput('Reset_CPassword.name')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={visibleCpass ? 'text' : 'password'}
                          placeholder={tInput('Reset_CPassword.placeholder')}
                          {...field}
                          className="input w-full relative"
                        />
                        <div
                          onClick={() => setVisibleCpass(!visibleCpass)}
                          className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-1.5 ">
                          {visibleCpass ? (
                            <EyeOff className="w-[15px] h-[15px] text-secondary-foreground" />
                          ) : (
                            <Eye className="w-[15px] h-[15px] text-secondary-foreground" />
                          )}
                        </div>
                      </div>
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
                >{tButton('reset_password')}</Button>
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
        </div>

      </div>
    </>
  )
}
