import { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  type OnConnect,
  useNodesState,
  useReactFlow,
  XYPosition,
  ConnectionLineType,
  Panel,
  ReactFlowInstance,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { nanoid } from "nanoid";
import { icons } from "../constants";
import { nodeTypes } from "../components/nodes";
import { edgeTypes } from "../components/edges";
import { createFlow } from "../services/apiService";
import useAuthStore from "../store/authStore";

const Flow = ({
  initialNodes = [],
  initialEdges = [],
  isEdit = false,
}: {
  initialNodes?: any[];
  initialEdges?: any[];
  isEdit?: boolean;
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [reactFlowRef, setReactFlowRef] = useState<ReactFlowInstance | null>(
    null
  );
  const { isLoading } = useAuthStore();

  const onConnect: OnConnect = useCallback(
    (connection) =>
      setEdges((edges) =>
        addEdge(
          {
            ...connection,
            type: "labelled",
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
          edges
        )
      ),
    [setEdges]
  );

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position: XYPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const nodeID: string = nanoid();

      const newNode: any = {
        id: nodeID,
        type: icons.includes(type) ? "icon" : "shape",
        position,
        data: { label: type, type: type },
      };

      setNodes((nodes) => nodes.concat(newNode));
    },
    [screenToFlowPosition]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleSubmit = async () => {
    const flow = reactFlowRef && reactFlowRef.toObject();
    await createFlow({ flow });
  };

  return (
    <div className="flex-1 w-full h-[90vh]">
      <ReactFlow
        onInit={setReactFlowRef}
        id="react-flow"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange as any} // TODO: Fix this type
        onEdgesChange={onEdgesChange as any} // TODO: Fix this type
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        connectionLineType={ConnectionLineType.Straight}
        nodeTypes={nodeTypes as any} // TODO: Fix this type
        edgeTypes={edgeTypes}
        fitView
        colorMode="dark"
        connectionMode={"loose" as any}
      >
        <Panel className="w-full flex justify-end items-center gap-4 pr-12">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium cursor-pointer"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </Panel>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
