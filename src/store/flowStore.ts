import { create } from "zustand";
import { FlowStore } from "qnect-types";

const useFlowStore = create<FlowStore>()(
  // persist(
  (set) => ({
    feedback: {
      requiredNodes: [],
      goodNodes: [],
      faultyEdges: [],
      missingEdges: [],
    },
    setFeedback: (value) => set({ feedback: value }),
    aiFlow: null,
    setAIFlow: (value) => set({ aiFlow: value }),
  })
  // { name: "flow-storage" }
  // )
);

export default useFlowStore;
