import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonVariant = 'sbc-primary' | 'sbc-secondary' | 'sbc-third' | 
                    'fcec-primary' | 'fcec-secondary' | 'fcec-third' |
                    'cic-primary' | 'cic-secondary' | 'cic-third' |
                    'craft-primary' | 'craft-secondary' | 'craft-third';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({ 
  children, 
  className,
  variant = 'sbc-primary',
  ...props 
}: ButtonProps) => {
  const variantStyles: Record<ButtonVariant, string> = {
    'sbc-primary': 'button-form bg-sbc-primary hover:bg-sbc-secondary',
    'sbc-secondary': 'button-form bg-sbc-secondary hover:bg-sbc-primary',
    'sbc-third': 'button-form bg-sbc-third hover:bg-sbc-primary',
    'fcec-primary': 'button-form bg-fcec-primary hover:bg-fcec-secondary',
    'fcec-secondary': 'button-form bg-fcec-secondary hover:bg-fcec-primary',
    'fcec-third': 'button-form bg-fcec-third hover:bg-fcec-primary',
    'cic-primary': 'button-form bg-cic-primary hover:bg-cic-secondary',
    'cic-secondary': 'button-form bg-cic-secondary hover:bg-cic-primary',
    'cic-third': 'button-form bg-cic-third hover:bg-cic-primary',
    'craft-primary': 'button-form bg-craft-primary hover:bg-craft-secondary',
    'craft-secondary': 'button-form bg-craft-secondary hover:bg-craft-primary',
    'craft-third': 'button-form bg-craft-third hover:bg-craft-primary'
  };

  return (
    <button 
      className={twMerge(variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
