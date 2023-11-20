import { cva, VariantProps } from 'class-variance-authority';
import { InputHTMLAttributes } from 'react';

import { cn } from '../utils/libs.ts';

export const inputVariants = cva(
  'block transition-colors  border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500',
  {
    variants: {
      variant: {
        default: ''
      },
      inputSize: {
        large: 'p-4',
        default: 'p-2.5 text-sm',
        small: 'p-2 text-xs'
      }
    }
  }
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {

}

export const Input = ({
  className,
  variant,
  inputSize,
  ...props
}: InputProps) => {
  return <input className={cn(inputVariants({
    variant,
    inputSize,
    className
  }))} {...props} />;
};

