import {
  Background,
  ConnectionLineType,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import useFlowStore from "../store/flowStore";
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";

const AIFlow = () => {
  const { aiFlow } = useFlowStore();
  const [nodes] = useNodesState(aiFlow?.nodes || []);
  const [edges] = useEdgesState(aiFlow?.edges || []);
  return (
    <div className="w-full mx-auto h-[70vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        connectionLineType={ConnectionLineType.Step}
        nodeTypes={nodeTypes as any} // TODO: Fix this type
        edgeTypes={edgeTypes}
        fitView
        colorMode="dark"
        connectionMode={"loose" as any}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default AIFlow;
