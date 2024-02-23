"use client"
import { useState } from 'react'
import SingleErrorMessage from '@/components/errors/SingleFieldError';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { resendEmailVerification } from '../../../../auth/auth';
import { toast } from 'sonner';


function ResendConfMailButton() {
    const tButton = useTranslations("Button");
    const tResend = useTranslations("Resend_Confirmation_Mail");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function resend() {
        setLoading(true);
        const response = await resendEmailVerification();
        console.log(response);
        if (response.statusCode === 401) {
            setError(response.message)
            toast.error(tResend('toast.error'))
            setLoading(false);
            return;
        }
        if (response.error && response.statusCode === 403) {
            setError(response.message)
            toast.error(tResend('toast.error'))
            setLoading(false);
            return;
        } else if (response.error && response.statusCode !== 403) {
            toast.error(tResend('toast.error'))
            return;
        }
        toast.success(tResend('toast.success'))
        setLoading(false);
    }

    return (
        <Button
            onClick={resend}
            disabled={loading}
        >
            {tButton('resend')}
        </Button>
    )
}

export default ResendConfMailButton