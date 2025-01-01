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
import Modal from "./ui/Modal";
import { CopyIcon } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Flow = ({
  initialNodes = [],
  initialEdges = [],
}: {
  initialNodes?: any[];
  initialEdges?: any[];
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [reactFlowRef, setReactFlowRef] = useState<ReactFlowInstance | null>(
    null
  );
  const { setViewport } = useReactFlow();
  const [flowId, setFlowId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState({
    save: false,
    restore: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSave = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, save: true }));
      if (reactFlowRef) {
        const flow = reactFlowRef.toObject();
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}flow`,
          { flow: JSON.stringify(flow) }
        );
        setFlowId(response.data.data);
      }
    } catch (error: any) {
      setIsLoading((prev) => ({ ...prev, save: false }));
      console.error(`Can't save flowchart: ${error.message}`);
    } finally {
      setIsLoading((prev) => ({ ...prev, save: false }));
    }
  };

  const handleRestore = async () => {
    setIsLoading((prev) => ({ ...prev, restore: true }));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}flow?id=${flowId}`
      );

      if (response) {
        const flow = JSON.parse(response.data.data.content);
        const { x = 0, y = 0, zoom = 0 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    } catch (error: any) {
      setIsLoading((prev) => ({ ...prev, restore: false }));
      `Error in getting flowchart: ${error.message}`;
    } finally {
      setIsLoading((prev) => ({ ...prev, restore: false }));
    }
  };

  const handleShare = async () => {
    try {
      if (!flowId) {
        await handleSave();
      }

      setIsModalOpen(true);
    } catch (error: any) {
      `Error in generating sharing link: ${error.message}`;
    }
  };

  const handleCopyLink = () => {
    const link = `http://localhost:5173/${flowId}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy link: ", error);
      });
  };

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
            disabled={isLoading.save}
            className="border-2 border-blue-500 bg-white rounded-lg px-3 py-1"
          >
            {isLoading.save ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleRestore}
            disabled={isLoading.restore}
            className="border-2 border-blue-500 bg-white rounded-lg px-3 py-1"
          >
            {isLoading.restore ? "Restoring..." : "Restore"}
          </button>
          <button
            onClick={handleShare}
            disabled={isLoading.restore}
            className="border-2 border-blue-500 bg-white rounded-lg px-3 py-1"
          >
            Share
          </button>
        </Panel>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex gap-2 items-center justify-center">
          <Link
            to={`${flowId}`}
            className="underline hover:text-blue-500 transition-colors"
          >
            {`${import.meta.env.VITE_CLIENT_URL}${flowId}`}
          </Link>
          <button
            onClick={handleCopyLink}
            className="ml-2 p-2 bg-gray-100 text-gray-500 rounded-lg"
          >
            <CopyIcon />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Flow;
