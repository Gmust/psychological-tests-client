import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

import { cn } from '../utils/libs.ts';

export const buttonVariants = cva(
  'active:scale-95 inline-flex justify-center items-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-amber-500 text-white hover:bg-amber-600',
        ghost: 'bg-transparent hover:border-purple-700 hover:text-slate-900 hover:bg-slate-200',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 py-1 rounded-md text-xl',
        lg: 'text-2xl h-12, px-8 py-2',
      },
    },
  },
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = ({ className, isLoading, children, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
      {children}
    </button>
  );
};
