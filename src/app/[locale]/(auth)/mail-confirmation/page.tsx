import CheckConfirmationMailToken from "@/components/auth/confirmation/CheckConfirmationMailToken";
import { pick } from "lodash";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function Page() {
    const messages = useMessages();
    return (
        <NextIntlClientProvider
        messages={pick(messages, ["Resend_Confirmation_Mail", "Input", "Button", "Global_Message"])}
        >
            <div className="min-h-screen flex items-center justify-center ">
                <CheckConfirmationMailToken />
            </div>
        </NextIntlClientProvider>
    )
}
