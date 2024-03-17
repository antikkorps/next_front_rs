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
        <div className="min-h-screen flex items-center justify-center">
          <LoginForm />
        </div>
      </NextIntlClientProvider>
      
    </>
  )
}
