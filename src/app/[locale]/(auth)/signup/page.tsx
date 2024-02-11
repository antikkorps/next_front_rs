import SignupForm from "@/components/auth/SignupForm"
import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl"

export default function Signup() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider
        messages={
          pick(messages, ["Register", "Input", "Button"])
        }
      >
        <SignupForm />
      </NextIntlClientProvider>
    </>
  )
}
