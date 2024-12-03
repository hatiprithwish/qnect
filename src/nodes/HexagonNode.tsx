import { Handle, Position } from "@xyflow/react";

const HexagonNode = () => {
  return (
    <>
      <svg
        width="100px"
        height="100px"
        viewBox="-1 -1 18 18"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="20" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g id="SVGRepo_bgCarrier" strokeWidth="0" />

        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g id="SVGRepo_iconCarrier">
          <path
            fill="#ffffff"
            stroke="#3b82f6"
            strokeWidth="0.1"
            filter="url(#glow)"
            d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
          />
        </g>
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

export default HexagonNode;
