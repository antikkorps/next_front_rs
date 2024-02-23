"use client"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react";
import { checkTokenEmailVerification } from "../../../../auth/auth";
import { GlobalFormSuccess } from "@/components/errors/GlobalFormSuccess";
import { GlobalFormError } from "@/components/errors/GlobalFormError";

export default function CheckConfirmationMailToken() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const params = useSearchParams();
  const token = params.get('token');
  
  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    checkTokenEmailVerification(token)
      .then((data) => {
        if(data.success) {
          setSuccess(data.message);
        }
        if(data.error) {
          setError(data.message);
        }
        
      })
      .catch(() => {
        setError("Something went wrong!");
      })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);


  return (
    <>
      {/* {error && <SingleErrorMessage message={error} />} */}
      {token}

      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          // <BeatLoader />
          <></>
        )}
        <GlobalFormSuccess message={success} />
        {!success && (
          <GlobalFormError message={error} />
        )}
      </div>
    </>
  )
}

