import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  helperText?: string;
}

export const Input = ({ label, required, helperText, ...props }: InputProps) => {
  return (
    <div className="form-group">
      <label className="block text-white font-medium text-[0.7rem] md:text-base lg:text-lg mb-1">
        {label} {required && <span className="text-red-500">*</span>}
        {helperText && (
          <span className="text-white/70  text-[0.7rem]"> ({helperText})</span>
        )}
      </label>
      <div className="form relative">
        <input
          className="input-form w-full bg-white hover:bg-white text-black text-[0.7rem] md:text-sm focus:outline-none transition-all"
          required={required}
          {...props}
        />
        <div className="input-border" />
      </div>
    </div>
  );
};
