import ResetPassForm from '@/components/auth/password/ResetPassForm';
import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import React from 'react'

export default function ResetPassword() {
  const messages = useMessages();
  return (
    <NextIntlClientProvider
    messages={
      pick(messages, ["Reset_Password", "Forgotten_Password", "Input", "Button"])
    }
    >
      <ResetPassForm />
    </NextIntlClientProvider>
  )
}
