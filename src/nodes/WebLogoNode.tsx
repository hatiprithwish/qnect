import { Handle, Position } from "@xyflow/react";

const WebLogoNode = ({ type }: { type: string }) => {
  return (
    <>
      <img
        src={`/shapes/${type}.svg`}
        width={50}
        height={50}
        className="p-1 border-2 border-black rounded-full"
      />
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

export default WebLogoNode;
