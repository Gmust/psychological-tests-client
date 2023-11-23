import { cva, VariantProps } from 'class-variance-authority';
import React, { InputHTMLAttributes } from 'react';

import { cn } from '../utils/libs.ts';

export const inputVariants = cva(
  'block transition-colors text-lg  border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500',
  {
    variants: {
      variant: {
        default: ''
      },
      inputSize: {
        large: 'p-4',
        default: 'p-1.5 text-2xl',
        small: 'p-2 text-xl'
      }
    }
  }
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {

}
//
// export const Input = ({
//   className,
//   variant,
//   inputSize,
//   ...props
// }: InputProps) => {
//   return <input className={cn(inputVariants({
//     variant,
//     inputSize,
//     className
//   }))} {...props} />;
// };

export const Input = React.forwardRef<HTMLInputElement, Omit<InputProps, 'ref'>>(({
  variant,
  inputSize,
  className,
  ...props
}, ref) => (
  <input className={cn(inputVariants({
    variant,
    inputSize,
    className
  }))} ref={ref} {...props} />
));
