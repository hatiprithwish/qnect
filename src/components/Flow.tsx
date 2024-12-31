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
import { edgeTypes } from "./edges";
import { nanoid } from "nanoid";
import { icons } from "../constants";
import axios from "axios";
import { nodeTypes } from "./nodes";

const Flow = ({
  initialNodes = [],
  initialEdges = [],
}: {
  initialNodes: any[];
  initialEdges: any[];
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [reactFlowRef, setReactFlowRef] = useState<ReactFlowInstance | null>(
    null
  );
  const { setViewport } = useReactFlow();
  const [flowId, setFlowId] = useState<number | null>(null);

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

  const handleSave = useCallback(() => {
    const saveFlow = async () => {
      try {
        if (reactFlowRef) {
          const flow = reactFlowRef.toObject();
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}flow`,
            { flow: JSON.stringify(flow) }
          );
          setFlowId(response.data.data);
        }
      } catch (error: any) {
        console.error(`Can't save flowchart: ${error.message}`);
      }
    };
    saveFlow();
  }, [reactFlowRef]);

  const handleRestore = useCallback(() => {
    const restoreFlow = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}flow?id=${flowId}`
        );

        if (response) {
          const flow = JSON.parse(response.data.data);
          const { x = 0, y = 0, zoom = 0 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
      } catch (error: any) {
        `Error in getting flowchart: ${error.message}`;
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  return (
    <div className="flex-1 w-full h-[91vh]">
      <ReactFlow
        onInit={setReactFlowRef}
        id="react-flow"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange as any}
        onEdgesChange={onEdgesChange as any}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        connectionLineType={ConnectionLineType.Straight}
        nodeTypes={nodeTypes as any}
        edgeTypes={edgeTypes}
        fitView
        connectionMode={"loose" as any}
      >
        <Panel className="w-full flex justify-end items-center gap-4 pr-12">
          <button
            onClick={handleSave}
            className="border-2 border-blue-500 bg-white rounded-lg px-3 py-1"
          >
            Save
          </button>
          <button
            onClick={handleRestore}
            className="border-2 border-blue-500 bg-white rounded-lg px-3 py-1"
          >
            Restore
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
