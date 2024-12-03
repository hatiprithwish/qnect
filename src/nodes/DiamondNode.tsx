import { Handle, Position } from "@xyflow/react";

const DiamondNode = () => {
  return (
    <>
      <svg
        width="100px"
        height="100px"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shadow-glow-blue rounded-xl rotate-45"
      >
        <rect
          x="0"
          y="0"
          width="16"
          height="16"
          rx="2"
          fill="white"
          stroke-width="0"
          stroke-linecap="round"
          stroke-linejoin="round"
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

export default DiamondNode;
