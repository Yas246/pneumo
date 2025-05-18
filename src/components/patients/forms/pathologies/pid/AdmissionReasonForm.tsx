import { FormSectionProps } from "../../types";

export function AdmissionReasonForm({ register }: FormSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Motif d&apos;Admission
      </h3>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="admissionReason"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Motif d&apos;admission
          </label>
          <textarea
            id="admissionReason"
            {...register("pidAdmissionReason")}
            rows={4}
            className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm py-2 px-4"
          />
        </div>
      </div>
    </div>
  );
}
