"use client"

import { Check, CheckCheck, Eye, EyeOff, Waves } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Link } from "@/i18n/navigation"
import { signUpFormSchemaValidation } from "@/zod/auth/signUp"
import { register } from "../../auth/auth"
import { useState } from "react"



export default function SignupForm() {
  const [registered, setRegistered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleCpass, setVisibleCpass] = useState(false);
  const form = useForm<z.infer<typeof signUpFormSchemaValidation>>({
    resolver: zodResolver(signUpFormSchemaValidation),
    defaultValues: {
      email: "",
      password: "",
      cpassword: "",
    },
    mode: "onChange"
  })

  async function onSubmit(values: z.infer<typeof signUpFormSchemaValidation>) {
    console.log(values)
    const { cpassword, ...withoutCPassword } = values;
    try {
      const res = await register(withoutCPassword);
      console.log({ res })
      // sonner
      // reset le form
      // redirect ? login ? auth ? 
      setRegistered(true)
    } catch (error) {
      console.log(error)
    } finally {
      // loading
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
        {registered ? (
          <div className="text-center px-4 max-w-2xl mx-auto flex flex-col items-center justify-center min-h-full">
            <Check className="w-20 h-20 text-green-400" />
            <h2>Inscription réussie !</h2>
            <p>Merci de votre inscription. Nous vous avons envoyé un mail de confirmation. Celui-ci peut mettre quelques minutes à arriver.</p>
            <p>Pas de lien reçu?</p>
          </div>
        ) : (
          <div className="sm:mx-auto sm:w-full sm:max-w-sm border px-10 py-4 rounded-md">
            <Waves className="justify-center mx-auto text-center h-16 w-16" />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
              Inscrivez-vous
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="email"
                          placeholder="email" {...field}
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={visible ? 'text' : 'password'}
                            placeholder="password" {...field}
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
                      <FormLabel>Confirm your password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={visibleCpass ? 'text' : 'password'}
                            placeholder="password" {...field}
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
                    disabled={form.formState.isLoading || !form.formState.isValid}
                    className="w-full"
                    type="submit"
                  >S'inscrire</Button>
                </div>
              </form>
            </Form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Déjà inscrit ?{" "}
              <Link
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Connectez-vous
              </Link>
            </p>
          </div>
        )}

      </div>
    </>
  )
}
