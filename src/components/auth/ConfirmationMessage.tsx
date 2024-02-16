import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import React from 'react'

interface ConfirmationMessageProps {
    children: React.ReactNode,
    className?: string
}
const ConfirmationMessage = (props: ConfirmationMessageProps) => {
    const { children, className } = props
    return (
        <div className={cn("text-center flex flex-col items-center justify-center min-h-full", className)}>
            <Check className="w-20 h-20 text-green-400" />
            {children}
        </div>
    )
}

export default ConfirmationMessage