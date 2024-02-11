import LoginForm from "@/components/auth/LoginForm"
import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl"

export default function Login() {

  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider
      messages={
        pick(messages, ["Login", "Input", "Button"])
      }
      >
        <LoginForm />
      </NextIntlClientProvider>
      
    </>
  )
}
