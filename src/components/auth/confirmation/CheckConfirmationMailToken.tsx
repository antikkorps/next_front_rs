"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { checkTokenEmailVerification } from "../../../../auth/auth";
import { GlobalFormSuccess } from "@/components/errors/GlobalFormSuccess";
import { GlobalFormError } from "@/components/errors/GlobalFormError";
import { ClipLoader } from "react-spinners";
import WrapperCard from "../WrapperCard";
import { useTranslations } from "next-intl";
export default function CheckConfirmationMailToken() {
  const tCheckConfirmation = useTranslations('Resend_Confirmation_Mail')
  const tGlobal = useTranslations('Global_Message')
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const params = useSearchParams();
  const token = params.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }
    checkTokenEmailVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success.message);
        }
        if (data.error) {
          setError(data.error.message);
        }
      })
      .catch(() => {
        setError(tGlobal('error.something_wrong'));
      });
  }, [token, success, error])

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <WrapperCard
    headerLabel={tCheckConfirmation('check.verification_email')}
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <ClipLoader color="#36d7b7" />}
        <GlobalFormSuccess message={success} />
        {!success && <GlobalFormError message={error} />}
      </div>
    </WrapperCard>
  );
}
