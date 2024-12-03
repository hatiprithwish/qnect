import { create } from "zustand";
import { AppNode } from "./nodes/types";
import { Edge } from "@xyflow/react";

interface Store {
  nodes: AppNode[];
  edges: Edge[];
  addNode: (node: AppNode) => void;
}

const useStore = create<Store>((set) => ({
  nodes: [],
  edges: [],
  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),
}));

export default useStore;

//🧠 set function returns a new state object
