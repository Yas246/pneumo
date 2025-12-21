"use client";

import { SectionProps } from "../types";

export function PathologySection({
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <div
      className={`px-6 py-5 border-b border-gray-200 dark:border-gray-700 ${className}`}
    >
      {title && (
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
      )}
      <div className="space-y-6">{children}</div>
    </div>
  );
}
