export type FlowStore = {
  feedback: Feedback;
  setFeedback: (value: Feedback) => void;
};

export type Feedback = {
  mustHaveComponents: string[];
  goodToHaveComponents: string[];
  prohibitedConnections: string[];
  goodToHaveConnections: string[];
};
