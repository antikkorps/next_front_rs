"use client";
import { Button } from "@/components/ui/button";
import { pathnames } from "@/i18n/intlConfig";
import { Link } from "@/i18n/navigation";

interface BackButtonProps {
  href: keyof typeof pathnames;
  label: string;
};

export const BackButton = ({
  href,
  label,
}: BackButtonProps) => {

    const link = href as any
  return (
      <Link href={link} className="classicLink">
        {label}
      </Link>
  );
};
