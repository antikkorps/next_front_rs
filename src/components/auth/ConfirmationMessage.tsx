import { Check } from 'lucide-react'
import React from 'react'

interface ConfirmationMessageProps {
    children: React.ReactNode
}
const ConfirmationMessage = (props: ConfirmationMessageProps) => {
    const { children } = props
    return (
        <div className="text-center flex flex-col items-center justify-center min-h-full">
            <Check className="w-20 h-20 text-green-400" />
            {children}
        </div>
    )
}

export default ConfirmationMessage