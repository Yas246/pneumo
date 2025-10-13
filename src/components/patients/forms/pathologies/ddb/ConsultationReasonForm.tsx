"use client";

import { FormSectionProps } from "../../types";

export function ConsultationReasonForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-soft rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        II. Motif de consultation
      </h3>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="ddbConsultationReason.consultationReason"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Motif de consultation
          </label>
          <textarea
            {...register("ddbConsultationReason.consultationReason")}
            rows={3}
            placeholder="Décrivez le motif de consultation..."
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
