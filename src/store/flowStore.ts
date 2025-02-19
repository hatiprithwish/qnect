import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FlowStore } from "../types/flow.type";

const useFlowStore = create<FlowStore>()(
  // persist(
  (set) => ({
    feedback: {
      mustHaveComponents: [],
      goodToHaveComponents: [],
      prohibitedConnections: [],
      goodToHaveConnections: [],
    },
    setFeedback: (value) => set({ feedback: value }),
  })
  // { name: "flow-storage" }
  // )
);

export default useFlowStore;
