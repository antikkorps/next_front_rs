import SignupForm from "@/components/auth/SignupForm";
import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function Signup() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider
        messages={pick(messages, ["Register", "Input", "Button"])}
      >
        <div className="min-h-screen flex items-center justify-center">
          <SignupForm />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
