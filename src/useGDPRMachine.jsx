import { createGDPRMachine } from "./gdpr-machine";
import { useMachine } from "@xstate/react";
import { useDIContainer } from "./useDIContainer";

let gdprMachine;

const useGDPRMachine = () => {
  const { analyticsService } = useDIContainer();

  if (!gdprMachine) {
    gdprMachine = createGDPRMachine(analyticsService);
  }

  return useMachine(gdprMachine);
};

export { useGDPRMachine };
