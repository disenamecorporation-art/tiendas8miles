import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ShineButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  fullWidth?: boolean;
}

export const ShineButton: React.FC<ShineButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'left',
  className = '',
  fullWidth = false,
  onClick,
  disabled,
  type = 'button',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold tracking-wider uppercase gap-1.5',
    md: 'px-6 py-3 text-sm font-bold tracking-wide uppercase gap-2',
    lg: 'px-8 py-4 text-base font-bold tracking-wide uppercase gap-2.5',
  };

  const variantBaseClasses = {
    primary:
      'bg-[#df0024] text-white shadow-md hover:shadow-orange-500/25 border border-orange-500',
    secondary:
      'bg-slate-900 text-white shadow-md hover:shadow-slate-900/30 border border-slate-800',
    outline:
      'bg-transparent text-slate-900 border-2 border-slate-900 hover:text-white',
    dark:
      'bg-slate-950 text-white shadow-lg border border-slate-800 hover:border-slate-700',
    whatsapp:
      'bg-[#25D366] text-white shadow-md hover:shadow-green-500/30 border border-[#25D366]',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl font-sans transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${
        sizeClasses[size]
      } ${variantBaseClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {/* Sliding Shine Backdrop Effect */}
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full hover:animate-none group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
      )}

      {variant === 'outline' && (
        <span className="absolute inset-0 w-full h-full bg-slate-900 -translate-y-full hover:translate-y-0 transition-transform duration-300 ease-out -z-10 pointer-events-none" />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </span>
    </motion.button>
  );
};
