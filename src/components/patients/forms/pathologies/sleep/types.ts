import { z } from "zod";
import { FormSectionProps as BaseFormSectionProps } from "../../types";
import { sleepPathologySchema } from "./schema";

type SleepPathologyFormData = z.infer<typeof sleepPathologySchema>;

export type FormSectionProps = BaseFormSectionProps<SleepPathologyFormData>;
