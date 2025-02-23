export type FlowStore = {
  feedback: Feedback;
  setFeedback: (value: Feedback) => void;
  aiFlow: {
    nodes: any[];
    edges: any[];
    viewport: {
      x: number;
      y: number;
      zoom: number;
    };
  } | null;
  setAIFlow: (value: any) => void;
};

export type Feedback = {
  requiredNodes: string[];
  goodNodes: string[];
  faultyEdges: string[];
  missingEdges: string[];
};
