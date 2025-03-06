import Dagre from "@dagrejs/dagre";
import {
  ConnectionLineType,
  Edge,
  MarkerType,
  Node,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import useFlowStore from "../store/flowStore";
import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";
import { useEffect } from "react";

enum Direction {
  TopToBottom = "TB",
  LeftToRight = "LR",
  RightToLeft = "RL",
  BottomToTop = "BT",
}

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = Direction.LeftToRight
) => {
  const dagreGraph = new Dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal =
    direction === Direction.LeftToRight || direction === Direction.RightToLeft;
  dagreGraph.setGraph({ rankdir: direction });

  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 100, // Horizontal spacing between nodes in the same rank
    ranksep: 120, // Vertical spacing between ranks
    edgesep: 80, // Minimum separation between adjacent edges
    marginx: 50,
    marginy: 50,
  });

  // Add nodes to the graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: 180,
      height: 60,
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
  const { aiFlow } = useFlowStore();
  const [nodes, setNodes] = useNodesState(aiFlow?.nodes || []);
  const [edges, setEdges] = useEdgesState(aiFlow?.edges || []);

  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      // Small delay to ensure ReactFlow is fully mounted
      const timer = setTimeout(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } =
          getLayoutedElements(nodes, edges);

        setNodes([...layoutedNodes]);
        setEdges([...layoutedEdges]);
      }, 10);

      return () => clearTimeout(timer);
    }
  }, []);

  console.log("edges: ", edges);
  return (
    <div
      className="w-full mx-auto h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          connectionLineType={ConnectionLineType.SmoothStep}
          nodeTypes={nodeTypes as any} // TODO: Fix this type
          edgeTypes={edgeTypes}
          colorMode="dark"
          connectionMode={"loose" as any}
          defaultEdgeOptions={{
            type: "smoothstep",
            markerEnd: { type: MarkerType.Arrow },
          }}
          defaultViewport={{ x: 0, y: 200, zoom: 0.75 }}
        ></ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default AIFlow;
