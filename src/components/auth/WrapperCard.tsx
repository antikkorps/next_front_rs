import { cn } from "@/lib/utils";
import { Waves } from "lucide-react";
import React, { useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { AppPathnames } from "@/i18n/intlConfig";

export default function WrapperCard({
  headerLabel,
  children,
  backButtonHref,
  backButtonLabel,
  inModal,
  beforeButtonText,
}: {
  headerLabel: string;
  backButtonLabel?: string | null;
  backButtonHref?: AppPathnames | null;
  children: React.ReactNode;
  inModal?: boolean | false;
  beforeButtonText?: string | null;
}) {
  useEffect(() => {
  }, [backButtonHref]);
  return (
    <Card className={cn(inModal ? 'w-full' : 'w-[400px]', 'shadow-md')}>
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className="text-3xl font-semibold">🔐 {process.env.NEXT_PUBLIC_APP_NAME}</h1>
          <p className="text-muted-foreground text-sm">{headerLabel}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {backButtonHref != null && backButtonLabel != null && (
        <CardFooter>
          <div className="text-center w-full font-normal text-sm">
            <span>{beforeButtonText} {" "}</span>
            <BackButton 
            label={backButtonLabel} href={backButtonHref} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
