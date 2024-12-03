import { Handle, Position } from "@xyflow/react";

const OctagonNode = () => {
  return (
    <>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <polygon
          points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30"
          style={{
            fill: "white",
            stroke: "#3b82f6",
            strokeWidth: 1,
            boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.5)",
          }}
        />
      </svg>
      <Handle
        type="target"
        position={Position.Top}
        className="border-[1px] border-blue-500 bg-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="border-[1px] border-blue-500 bg-white"
      />
    </>
  );
};

export default OctagonNode;
