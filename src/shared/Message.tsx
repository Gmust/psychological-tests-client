import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '../utils/libs.ts';

export const messageVariants = cva(
  'transition-colors text-xl',
  {
    variants: {
      variant: {
        warning: 'bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2',
        error: 'bg-red-100 border-l-4 border-red-500 text-red-700 p-2',
        success: 'bg-green-100 border-l-4 border-green-500 text-green-700 p-2'
      },
      size: {
        small: 'p-1',
        default: 'p-2',
        large: 'p-4'
      }
    }
  }
);

interface MessageProps extends VariantProps<typeof messageVariants> {
  heading?: string | undefined,
  message: string,
  className?: string,
  variant: 'warning' | 'error' | 'success'
}

export const Message = ({
  message,
  heading,
  className,
  variant,
  size
}: MessageProps) => {
  return (
    <div className={cn(messageVariants({
      variant,
      className,
      size
    }))}
    >
         {heading && <p className='font-bold'>{heading}</p>}
      {message}
    </div>
  );
};

