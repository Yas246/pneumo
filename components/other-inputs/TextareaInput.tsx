import React from 'react';
import { Controller } from 'react-hook-form';
import { BaseInputProps, PatientFormData } from '../types'; // Adjust path as necessary

interface TextareaInputProps extends BaseInputProps {}

export const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  name,
  control,
  disabled = false,
  helperText,
  required = false,
  description,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4">
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <textarea
            {...field}
            id={name}
            rows={3} // Default, can be customized
            disabled={disabled}
            aria-describedby={helperText || description ? `${name}-help` : undefined}
            className={`mt-1 block w-full px-3 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {helperText && <p id={`${name}-help`} className="mt-2 text-sm text-gray-500">{helperText}</p>}
          {description && <p id={`${name}-description`} className="mt-2 text-sm text-gray-400">{description}</p>}
          {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  );
};
