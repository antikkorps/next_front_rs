"use client"
import Link from "next/link"
import { Eye, EyeOff, Waves } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpWithoutConfirmPassword } from "@/zod/auth/signUp"
import { useState } from "react"
import { useTranslations } from "next-intl"

export default function LoginForm() {
  const tLogin = useTranslations('Login');
  const tInput = useTranslations('Input');
  const tButton = useTranslations('Button');
  const [visible, setVisible] = useState(false);
  const form = useForm<z.infer<typeof SignUpWithoutConfirmPassword>>({
    resolver: zodResolver(SignUpWithoutConfirmPassword),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit(values: z.infer<typeof SignUpWithoutConfirmPassword>) {
    console.log(values)
  }
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 items-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm border px-10 py-4 rounded-md">
          <Waves className="justify-center mx-auto text-center h-16 w-16" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            {tLogin('title')}
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6">
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{tInput('Password.name')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={visible ? 'text' : 'password'}
                          placeholder={tInput('Password.placeholder')} {...field}
                          className="input w-full relative"
                        />
                        <div
                        onClick={()=>setVisible(!visible)}
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

              <div className="pt-6">
                <Button
                  disabled={form.formState.isLoading}
                  className="w-full"
                  type="submit"
                >{tButton('login')}</Button>
              </div>
            </form>
          </Form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {tLogin('not_registered_yet')}{" "}
            <Link
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              {tLogin('join_us')}
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
