import React from 'react';
import { Controller } from 'react-hook-form';
import { OptionsInputProps, PatientFormData } from '../types'; // Adjust path as necessary

interface RadioGroupInputProps extends OptionsInputProps {}

export const RadioGroupInput: React.FC<RadioGroupInputProps> = ({
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
          <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <fieldset className="mt-2">
            <legend className="sr-only">{label}</legend>
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option.value.toString()} className="flex items-center">
                  <input
                    {...field}
                    id={`${name}-${option.value}`}
                    type="radio"
                    value={option.value}
                    checked={field.value === option.value}
                    disabled={disabled}
                    aria-describedby={helperText || description ? `${name}-help` : undefined}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    onChange={(e) => field.onChange(option.value)} // Ensure correct value type is passed
                  />
                  <label htmlFor={`${name}-${option.value}`} className="ml-3 block text-sm font-medium text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          {helperText && <p id={`${name}-help`} className="mt-2 text-sm text-gray-500">{helperText}</p>}
          {description && <p id={`${name}-description`} className="mt-2 text-sm text-gray-400">{description}</p>}
          {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  );
};
