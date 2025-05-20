import React from 'react';
import { Controller } from 'react-hook-form';
import { BaseInputProps, PatientFormData } from '../types'; // Adjust path as necessary

interface SwitchInputProps extends BaseInputProps {}

export const SwitchInput: React.FC<SwitchInputProps> = ({
  label,
  name,
  control,
  disabled = false,
  helperText,
  required = false, // Similar to CheckboxInput, "required" needs careful consideration for boolean toggles
  description,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4">
          <div className="flex items-center">
            <button
              {...field}
              type="button"
              role="switch"
              aria-checked={field.value}
              aria-labelledby={`${name}-label`}
              aria-describedby={helperText || description ? `${name}-help` : undefined}
              onClick={() => field.onChange(!field.value)}
              disabled={disabled}
              className={`${
                field.value ? 'bg-indigo-600' : 'bg-gray-200'
              } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              <span
                aria-hidden="true"
                className={`${
                  field.value ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
              />
            </button>
            <span className="ml-3">
              <label id={`${name}-label`} className="text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
            </span>
          </div>
          {helperText && <p id={`${name}-help`} className="mt-2 text-sm text-gray-500">{helperText}</p>}
          {description && <p id={`${name}-description`} className="mt-2 text-sm text-gray-400">{description}</p>}
          {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  );
};
