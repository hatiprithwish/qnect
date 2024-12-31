import type { Edge, EdgeTypes } from "@xyflow/react";
import LabelledNode from "./LabelledNode";

export const initialEdges: Edge[] = [];

export const edgeTypes = {
  labelled: LabelledNode,
} satisfies EdgeTypes;
