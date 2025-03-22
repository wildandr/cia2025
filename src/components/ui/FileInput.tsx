import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type FileInputVariant = 'sbc' | 'fcec' | 'cic' | 'craft';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  helperText?: string;
  variant?: FileInputVariant;
  fileName?: string; // Add this line to include fileName in the props
}

export const FileInput = ({ 
  label, 
  required, 
  helperText, 
  variant = 'sbc',
  className,
  fileName, // Add this to the destructured props
  ...props 
}: FileInputProps) => {
  const variantStyles: Record<FileInputVariant, string> = {
    'sbc': 'file:bg-sbc-primary hover:file:bg-sbc-secondary',
    'fcec': 'file:bg-fcec-primary hover:file:bg-fcec-secondary',
    'cic': 'file:bg-cic-primary hover:file:bg-cic-secondary',
    'craft': 'file:bg-craft-primary hover:file:bg-craft-secondary'
  };

  return (
    <div className="form-group">
      <label className="block text-white font-medium text-[0.7rem] md:text-base lg:text-lg mb-1">
        {label} {required && <span className="text-red-500">*</span>}
        {helperText && (
          <span className="text-white/70 text-[0.7rem]"> ({helperText})</span>
        )}
      </label>
      <div className="form relative">
        <input
          type="file"
          className={twMerge(
            "input-form w-full bg-white hover:bg-white text-black text-[0.7rem] md:text-sm focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-white",
            variantStyles[variant],
            className
          )}
          required={required}
          {...props}
        />
      </div>
     
    </div>
  );
};
