import React from 'react';
import { Controller } from 'react-hook-form';
import { OptionsInputProps, PatientFormData } from '../types'; // Adjust path as necessary

interface SelectInputProps extends OptionsInputProps {}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  control,
  options,
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
          <select
            {...field}
            id={name}
            disabled={disabled}
            aria-describedby={helperText || description ? `${name}-help` : undefined}
            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${
              error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md`}
          >
            <option value="" disabled={required}>Select an option</option>
            {options.map((option) => (
              <option key={option.value.toString()} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {helperText && <p id={`${name}-help`} className="mt-2 text-sm text-gray-500">{helperText}</p>}
          {description && <p id={`${name}-description`} className="mt-2 text-sm text-gray-400">{description}</p>}
          {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  );
};
