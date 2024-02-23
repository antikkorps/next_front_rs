"use client"

import { Eye, EyeOff, Waves } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpWithoutConfirmPassword } from "@/zod/auth/signUp"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { login } from "../../../auth/auth"
import { Link, useRouter } from "@/i18n/navigation"
import SingleErrorMessage from "../errors/SingleFieldError"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
interface LoginFormProps {
  inModal?: boolean;
  setFormConfirm?: (value: boolean) => void;
  formConfirm?: boolean;
}
export default function LoginForm(props: LoginFormProps) {
  const { inModal = false, formConfirm, setFormConfirm } = props;


  const tLogin = useTranslations('Login');
  const tInput = useTranslations('Input');
  const tButton = useTranslations('Button');

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  

 
  const form = useForm<z.infer<typeof SignUpWithoutConfirmPassword>>({
    resolver: zodResolver(SignUpWithoutConfirmPassword),
    defaultValues: {
      email: "",
      password: ""
    }
  })


  async function onSubmit(values: z.infer<typeof SignUpWithoutConfirmPassword>) {
    setLoading(true);
    const response = await login(values);

    if (response.error && response.statusCode === 403) {
      setError(response.message)
      toast.error(tLogin('toast.error'))
      setLoading(false);
      return;
    } else if (response.error && response.statusCode !== 403) {
      toast.error(tLogin('toast.error'))
      return;
    }
    if(inModal) {
     
      if (setFormConfirm) {
        setFormConfirm(!formConfirm)
      }
      router.refresh()
    } else {
      router.push('/dashboard');
    }
    toast.success(tLogin('toast.success'))
    form.reset();
    setLoading(false);
  }

  return (
    <>
      <div className={cn('flex flex-1 flex-col justify-center items-center ', inModal ? 'py-4' : 'min-h-screen px-6 lg:px-8')}>
        <div className={cn('border px-10 py-4 rounded-xl shadow-sm ', inModal ? "bg-secondary w-full" : "bg-white/90 dark:bg-background sm:mx-auto sm:w-full sm:max-w-sm ")}>
          <Waves className="justify-center mx-auto text-center h-16 w-16" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            {tLogin('title')}
          </h2>
          {error && <SingleErrorMessage message={error} />}

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mb-5">
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
                        className={cn(inModal ? '' : "input")}
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
                          className={cn(inModal ? '' : "input w-full relative")}
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
                    <FormDescription className="text-sm text-muted-foreground pt-3">
                      {tLogin('password_forgotten')} {" "}
                      <Link
                        className="classicLink"
                        href="/forgotten-password">
                        {tLogin('password_forgotten_link')}
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className={cn(inModal ? "pt-3" : "pt-6")}>
                <Button
                  disabled={form.formState.isLoading || loading}
                  className="w-full"
                  type="submit"
                >{tButton('login')}</Button>
              </div>
            </form>
          </Form>
          {!inModal && (
            <p className="text-center text-sm text-muted-foreground">
              {tLogin('not_registered_yet')}{" "}
              <Link
                href="/signup"
                className="classicLink"
              >
                {tLogin('join_us')}
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  )
}
