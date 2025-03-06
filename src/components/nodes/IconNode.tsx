import { Handle, NodeResizer, Position, useReactFlow } from "@xyflow/react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "../../utils/cn";

const IconNode = ({
  id,
  data,
  selected,
  ...other
}: {
  id: string;
  data: any;
  selected: boolean;
  other: any;
}) => {
  const { setNodes } = useReactFlow();
  const [size, setSize] = useState({
    // @ts-ignore
    width: other?.style?.width || data?.size?.width || 76,
    // @ts-ignore
    height: other?.style?.height || data?.size?.height || 76,
  });

  const onResize = useDebouncedCallback((_, payload) => {
    const { width, height } = payload;
    setNodes((nodes) => {
      return nodes.map((node) => {
        if (node.id === id) {
          node.data.size = { width, height };
        }
        return node;
      });
    });
    setSize({ width, height });
  }, 15);
  return (
    <>
      <NodeResizer
        onResize={onResize}
        isVisible={selected}
        minWidth={10}
        minHeight={10}
      />

      <img
        src={`/icons/${data?.type.split(" ").join("-").toLowerCase()}.webp`}
        width={size.width}
        height={size.height}
      />

      {[Position.Top, Position.Left, Position.Right, Position.Bottom].map(
        (position) => {
          return (
            <Handle
              key={`${id}-${position}`}
              id={`${id}-${position}`}
              type="source"
              className={cn(
                "z-50 w-1.5 h-1.5 bg-slate-800",
                selected ? "visible" : "invisible"
              )}
              position={position}
            />
          );
        }
      )}
    </>
  );
};

export default IconNode;
