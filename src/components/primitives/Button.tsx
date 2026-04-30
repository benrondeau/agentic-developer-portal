import type { ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from './Icon.tsx'
import { cn } from '../../utils/cn.ts'

type ButtonVariant = 'default' | 'primary' | 'danger'

type ButtonProps = {
  variant?: ButtonVariant
  small?: boolean
  icon?: IconName
  iconColor?: string
  label: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

const variantClasses: Record<ButtonVariant, string> = {
  default: 'border-border bg-surface text-text hover:bg-surface-2',
  primary: 'border-accent bg-accent text-white hover:opacity-90',
  danger: 'border-red bg-red-bg text-red hover:bg-red/10',
}

export function Button({
  variant = 'default',
  small = false,
  icon,
  iconColor,
  label,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex flex-shrink-0 cursor-pointer items-center gap-1.5 rounded-[4px] border-[1.5px] font-mono whitespace-nowrap select-none transition-colors',
        small ? 'px-2.5 py-1 text-[12px]' : 'px-4 py-1.5 text-[15px]',
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {icon && <Icon name={icon} size={small ? 11 : 12} color={iconColor ?? 'currentColor'} />}
      <span>{label}</span>
    </button>
  )
}
