import React from 'react'
import { Button, ButtonProps } from './ui/button'

type Props = Partial<ButtonProps> & {
    children: React.ReactNode
}
function ActionIcon({children, ...buttonProps}: Props) {
  return (
    <Button
    type='submit'
    variant={'ghost'}
    size={'icon'}
    className='w-9 h-9 hover:bg-transparent'
    {...buttonProps}
    >
        {children}
    </Button>
  )
}

export default ActionIcon