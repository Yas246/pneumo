import React from 'react';
import { Controller } from 'react-hook-form';
import { BaseInputProps, PatientFormData } from '../types'; // Adjust path as necessary

interface CheckboxInputProps extends BaseInputProps {}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  name,
  control,
  disabled = false,
  helperText,
  required = false, // Note: "required" for a single checkbox might need specific handling depending on desired UX
  description,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                {...field}
                id={name}
                type="checkbox"
                checked={field.value}
                disabled={disabled}
                aria-describedby={helperText || description ? `${name}-help` : undefined}
                className={`focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded ${
                  error ? 'border-red-500' : ''
                }`}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={name} className="font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              {helperText && <p id={`${name}-help`} className="text-gray-500">{helperText}</p>}
              {description && <p id={`${name}-description`} className="text-gray-400">{description}</p>}
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  );
};
