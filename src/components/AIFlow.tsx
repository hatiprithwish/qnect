import Dagre from "@dagrejs/dagre";
import {
  ConnectionLineType,
  Edge,
  Node,
  Panel,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import useFlowStore from "../store/flowStore";
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";
import { useCallback } from "react";

enum Direction {
  TopToBottom = "TB",
  LeftToRight = "LR",
  RightToLeft = "RL",
  BottomToTop = "BT",
}

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = Direction.TopToBottom
) => {
  const dagreGraph = new Dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal =
    direction === Direction.LeftToRight || direction === Direction.RightToLeft;
  dagreGraph.setGraph({ rankdir: direction });

  // Add nodes to the graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: 150,
      height: 50,
    });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Layout the graph
  Dagre.layout(dagreGraph);

  // Update node positions based on layout
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWithPosition.width / 2,
        y: nodeWithPosition.y - nodeWithPosition.height / 2,
      },
      sourcePosition: isHorizontal ? Position.Left : Position.Top,
      targetPosition: isHorizontal ? Position.Right : Position.Bottom,
    };
  });

  return { nodes: layoutedNodes, edges };
};

const AIFlow = () => {
  const { fitView } = useReactFlow();
  const { aiFlow } = useFlowStore();
  const [nodes, setNodes] = useNodesState(aiFlow?.nodes || []);
  const [edges, setEdges] = useEdgesState(aiFlow?.edges || []);

  const onLayout = useCallback(
    (direction: Direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges, fitView]
  );

  return (
    <div className="w-full mx-auto h-[90vh]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        // onDragOver={onDragOver}
        snapToGrid={true}
        snapGrid={[15, 15]}
        connectionLineType={ConnectionLineType.Step}
        nodeTypes={nodeTypes as any} // TODO: Fix this type
        edgeTypes={edgeTypes}
        fitView
        colorMode="dark"
        connectionMode={"loose" as any}
        draggable={true}
        attributionPosition="bottom-left"
      >
        <Panel position="top-right">
          <button
            onClick={() => onLayout(Direction.TopToBottom)}
            className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
          >
            Vertical Layout
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default AIFlow;
