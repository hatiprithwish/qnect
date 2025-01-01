import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { nodeTypes } from "../components/nodes";
import { edgeTypes } from "../components/edges";

const SingleFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { setViewport } = useReactFlow();

  useEffect(() => {
    const getFlowChart = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}flow?id=${pathname.slice(1)}`
        );

        if (response) {
          const flow = JSON.parse(response.data.data.content);
          const { x = 0, y = 0, zoom = 0 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
      } catch (error: any) {
        setIsLoading(false);
        `Error in getting flowchart: ${error.message}`;
      } finally {
        setIsLoading(false);
      }
    };

    getFlowChart();
  }, [pathname]);
  return (
    <div className="flex-1 w-full h-[100vh]">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange as any}
          onEdgesChange={onEdgesChange as any}
          nodeTypes={nodeTypes as any}
          edgeTypes={edgeTypes}
          fitView
          connectionMode={"loose" as any}
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      )}
    </div>
  );
};

export default SingleFlow;
