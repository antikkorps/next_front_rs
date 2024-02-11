import ResetPassForm from "@/components/auth/password/ResetPassForm";
import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";
export default function ForgottenPassword() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider
    messages={
      pick(messages, ["Forgotten_Password", "Input", "Button"])
    }
    >
      <ResetPassForm />
    </NextIntlClientProvider>
  )
}
