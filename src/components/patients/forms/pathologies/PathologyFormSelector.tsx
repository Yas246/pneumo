import { FormSectionProps } from "../types";
import { BPCOForm } from "./bpco";
import { PIDForm } from "./pid";
import { PleuralEffusionForm } from "./pleuralEffusion";
import { SleepPathologyForm } from "./sleep";

interface PathologyFormSelectorProps extends FormSectionProps {
  selectedPathologies: string[];
}

export function PathologyFormSelector(props: PathologyFormSelectorProps) {
  // Render different forms based on selected pathologies
  if (props.selectedPathologies.includes("bpco")) {
    return <BPCOForm {...props} />;
  } else if (props.selectedPathologies.includes("pid")) {
    return <PIDForm {...props} />;
  } else if (props.selectedPathologies.includes("pleuralEffusion")) {
    return <PleuralEffusionForm {...props} />;
  } else {
    // Default to sleep pathology form
    return <SleepPathologyForm {...props} />;
  }
}
