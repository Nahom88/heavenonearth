import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes } from 'react';

const sectionVariants = cva('py-16 md:py-24', {
  variants: {
    variant: {
      default: 'bg-background',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      accent: 'bg-accent text-accent-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  id?: string;
  innerClassName?: string;
}

export function Section({
  id,
  className,
  innerClassName,
  children,
  variant = 'default',
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(sectionVariants({ variant, className }))}
      {...props}
    >
      <div className={cn('container mx-auto px-4', innerClassName)}>
        {children}
      </div>
    </section>
  );
}
