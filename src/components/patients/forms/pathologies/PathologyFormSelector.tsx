import { FormSectionProps } from "../types";
import { AsthmaForm } from "./asthma";
import { BPCOForm } from "./bpco";
import { DDBForm } from "./ddb";
import { PIDForm } from "./pid";
import { PleuralEffusionForm } from "./pleuralEffusion";
import { SleepPathologyForm } from "./sleep";
import TBKForm from "./tbk";

interface PathologyFormSelectorProps extends FormSectionProps {
  selectedPathologies: string[];
}

export function PathologyFormSelector(props: PathologyFormSelectorProps) {
  // Render different forms based on selected pathologies
  if (props.selectedPathologies.includes("asthma")) {
    return <AsthmaForm {...props} />;
  } else if (props.selectedPathologies.includes("bpco")) {
    return <BPCOForm {...props} />;
  } else if (props.selectedPathologies.includes("ddb")) {
    return <DDBForm {...props} />;
  } else if (props.selectedPathologies.includes("pid")) {
    return <PIDForm {...props} />;
  } else if (props.selectedPathologies.includes("pleuralEffusion")) {
    return <PleuralEffusionForm {...props} />;
  } else if (props.selectedPathologies.includes("tbk")) {
    return <TBKForm {...props} />;
  } else {
    // Default to sleep pathology form
    return <SleepPathologyForm {...props} />;
  }
}
