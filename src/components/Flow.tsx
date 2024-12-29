import { useCallback } from "react";
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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { edgeTypes } from "../edges";
import { nanoid } from "nanoid";
import ShapeNode from "./ShapeNode";
import IconNode from "./IconNode";
import { icons } from "../constants";

const nodeTypes = {
  shape: ShapeNode,
  icon: IconNode,
};

const Flow = ({ initialNodes = [], initialEdges = [] }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      console.log(type);
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

  return (
    <div className="flex-1 w-full h-[91vh]">
      <ReactFlow
        id="react-flow"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        connectionLineType={ConnectionLineType.Straight}
        nodeTypes={nodeTypes as any}
        edgeTypes={edgeTypes}
        fitView
        //@ts-ignore
        connectionMode="loose"
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
