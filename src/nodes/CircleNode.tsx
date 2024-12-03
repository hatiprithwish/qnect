import { Handle, NodeResizer, Position } from "@xyflow/react";
import { CircleIcon } from "hugeicons-react";
import { memo } from "react";

const CircleNode = ({ data, selected }) => {
  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={100}
        lineStyle={{ objectFit: "contain" }}
        handleStyle={{ objectFit: "contain" }}
      />
      <CircleIcon
        fill="white"
        stroke="#3b82f6"
        className="w-full h-full object-contain min-w-[100px]"
      />
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default memo(CircleNode);
