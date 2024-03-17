"use client";

import { Check, CheckCheck, Eye, EyeOff, Waves } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Link } from "@/i18n/navigation";
import { signUpFormSchemaValidation } from "@/zod/auth/signUp";
import { register } from "../../../auth/auth";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import SingleErrorMessage from "../errors/SingleFieldError";
import ConfirmationMessage from "./ConfirmationMessage";
import { cn } from "@/lib/utils";
import WrapperCard from "./WrapperCard";

interface SignUpFormProps {
  inModal?: boolean;
  setFormConfirm?: (value: boolean) => void;
  formConfirm?: boolean;
}

export default function SignupForm(props: SignUpFormProps) {
  const { inModal = false, formConfirm, setFormConfirm } = props;

  const tRegister = useTranslations("Register");
  const tInput = useTranslations("Input");
  const tButton = useTranslations("Button");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchemaValidation>) {
    setLoading(true);
    const { cpassword, ...withoutCPassword } = values;
    try {
      const response = await register(withoutCPassword);
      if (response.error) {
        setError(response.message);
        toast.error(tRegister("toast.error"));
        return;
      }
      setRegistered(true);
      toast.success(tRegister("toast.success"));
      form.reset();
    } catch (error) {
      // console.log(error, "signupform.tsx")
    } finally {
      setLoading(false);
    }
  }

  return (
    <WrapperCard
      headerLabel={tRegister("title")}
      inModal={inModal}
      backButtonHref={(registered || inModal) ? null : "/login"}
      backButtonLabel={(registered || inModal) ? null : tRegister("sign_in")}
      beforeButtonText={(registered || inModal) ? null : tRegister("already_have_account")}
    >
      {registered ? (
        <ConfirmationMessage>
          <h2>{tRegister("Messages.register_success")}</h2>
          <p>{tRegister("Messages.thank_you_register")}</p>
          <p>
            {tRegister("Messages.no_link_received")}{" "}
            {tRegister("Messages.send_again")}
          </p>
        </ConfirmationMessage>
      ) : (
        <>
          <SingleErrorMessage message={error} />
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
                        className={cn(inModal ? "" : "input")}
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
                    <FormLabel>{tInput("Password.name")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={visible ? "text" : "password"}
                          placeholder={tInput("Password.placeholder")}
                          {...field}
                          className={cn(inModal ? "" : "input w-full relative")}
                        />
                        <div
                          onClick={() => setVisible(!visible)}
                          className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-1.5 "
                        >
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
                    <FormLabel>{tInput("CPassword.name")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={visibleCpass ? "text" : "password"}
                          placeholder={tInput("CPassword.placeholder")}
                          {...field}
                          className={cn(inModal ? "" : "input w-full relative")}
                        />
                        <div
                          onClick={() => setVisibleCpass(!visibleCpass)}
                          className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-1.5 "
                        >
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

              <div className={cn(inModal ? "pt-3" : "pt-6")}>
                <Button
                  disabled={
                    form.formState.isLoading ||
                    !form.formState.isValid ||
                    loading
                  }
                  className="w-full"
                  type="submit"
                >
                  {tButton("register")}
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </WrapperCard>
  );
}
