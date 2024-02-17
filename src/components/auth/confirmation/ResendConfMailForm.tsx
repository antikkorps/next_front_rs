"use client"
import { useState } from 'react'
import ConfirmationMessage from '../ConfirmationMessage';
import { Waves } from 'lucide-react';
import SingleErrorMessage from '@/components/errors/SingleError';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { resendMailSchema } from '@/zod/auth/signUp';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';


function ResendConfMailForm() {

    const tInput = useTranslations("Input");
    const tButton = useTranslations("Button");
    const tResend = useTranslations("Resend_Confirmation_Mail");

    const [mailSent, setMailSent] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof resendMailSchema>>({
        resolver: zodResolver(resendMailSchema),
        defaultValues: {
          email: ""
        },
        mode: "onChange"
      })

      async function onSubmit(values: z.infer<typeof resendMailSchema>) {
        setLoading(true);
        console.log(values)
        setMailSent(true);
        setLoading(false);
      }

    return (
        <>
            {mailSent ? (
                <ConfirmationMessage
                className='py-4'
                >
                    <h2 className="font-bold">{tResend('confirmation_message.title')}</h2>
                    <p>{tResend('confirmation_message.message')}</p>
                </ConfirmationMessage>
            ) : (
                <>
                    <Waves className="justify-center mx-auto text-center h-16 w-16" />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    {tResend('title')}
                    </h2>
                    {error && <SingleErrorMessage message={error} />}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{tInput('Email.name')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                autoComplete="email"
                                                placeholder={tInput('Email.placeholder')}
                                                {...field}
                                                className="input"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6">
                                <Button
                                    disabled={form.formState.isLoading || loading || !form.formState.isValid}
                                    className="w-full"
                                    type="submit"
                                >{tButton('resend')}</Button>
                            </div>
                        </form>
                    </Form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        
                        <Link
                            href="/dashboard"
                            className="classicLink"
                        >
                            {tResend('back')}{" "}
                        </Link>
                    </p>
                </>
            )}
        </>
    )
}

export default ResendConfMailForm