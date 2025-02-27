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
import { useCallback } from "react";

const AIFlow = () => {
  const { aiFlow } = useFlowStore();
  const [nodes] = useNodesState(aiFlow?.nodes || []);
  const [edges] = useEdgesState(aiFlow?.edges || []);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);
  return (
    <div className="w-full mx-auto h-[90vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onDragOver={onDragOver}
        connectionLineType={ConnectionLineType.Step}
        nodeTypes={nodeTypes as any} // TODO: Fix this type
        edgeTypes={edgeTypes}
        fitView
        colorMode="dark"
        connectionMode={"loose" as any}
        draggable={true}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default AIFlow;
