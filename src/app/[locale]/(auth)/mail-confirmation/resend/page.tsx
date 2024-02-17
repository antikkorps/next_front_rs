import ResendConfMailForm from '@/components/auth/confirmation/ResendConfMailForm'
import { pick } from 'lodash'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import React from 'react'

function page() {
    const messages = useMessages();
  return (
    <NextIntlClientProvider
    messages={pick(messages, ["Resend_Confirmation_Mail", "Input", "Button"])}
    >
        <ResendConfMailForm />
    </NextIntlClientProvider>
  )
}

export default page