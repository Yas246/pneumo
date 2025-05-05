import { FormSectionProps } from "../types";
import { SleepPathologyForm } from "./sleep";

interface PathologyFormSelectorProps extends FormSectionProps {
  selectedPathologies: string[];
}

export function PathologyFormSelector(props: PathologyFormSelectorProps) {
  return <SleepPathologyForm {...props} />;
}
