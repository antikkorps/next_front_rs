"use client"
import React from "react"
import { Button } from "../ui/button"
import { logout as fLogout } from "../../../auth/auth"
import { toast } from "sonner"
import { useRouter } from "@/i18n/navigation"
import { useTranslations } from "next-intl"

export default function LogoutButton() {
  const tLogout = useTranslations("Logout")
  const router = useRouter()
  const logout = async () => {
    const response = await fLogout()
    if (!response.success) {
      toast.error(tLogout("toast.error"))
    }
    router.push("/login")
    toast.success(tLogout("toast.success"))
  }
  return (
    <div>
      <Button onClick={logout}>{tLogout("logout")}</Button>
    </div>
  )
}
