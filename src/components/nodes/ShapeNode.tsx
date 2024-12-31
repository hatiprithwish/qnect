import {
  Handle,
  NodeResizer,
  NodeToolbar,
  Position,
  useReactFlow,
} from "@xyflow/react";
import { cn } from "../../lib/utils";
import { memo, useState } from "react";
import { SHAPES } from "../Shapes";
import { useDebouncedCallback } from "use-debounce";

const colors = [
  "transparent",
  "#cf4c2c",
  "#ea9c41",
  "#ebc347",
  "#438d57",
  "#3f8ae2",
  "#803dec",
];

const ShapeNode = ({
  id,
  data,
  selected,
}: {
  id: string;
  data: any;
  selected: boolean;
}) => {
  const { setNodes } = useReactFlow();
  const [size, setSize] = useState({
    width: data?.size?.width || 76,
    height: data?.size?.height || 76,
  });
  const [color, setColor] = useState(data?.color);
  const [label, setLabel] = useState(data.label || "");

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

  const Component = SHAPES[data?.type].component;
  return (
    <>
      <NodeToolbar
        isVisible={selected}
        position={Position.Top}
        className="flex gap-2 bg-gray-50 shadow-xl rounded-lg p-2"
      >
        {colors.map((col, i) => (
          <button
            key={i}
            className={cn(
              "w-7 h-7 rounded-full cursor-pointer border-2",
              color === col ? "border-gray-700" : "border-gray-200"
            )}
            style={{ backgroundColor: col }}
            onClick={() => setColor(col)}
          ></button>
        ))}
      </NodeToolbar>

      <NodeResizer
        onResize={onResize}
        color={color}
        isVisible={selected}
        minWidth={10}
        minHeight={10}
      />

      <Component width={size.width} height={size.height} color={color} />

      {[Position.Top, Position.Left, Position.Right, Position.Bottom].map(
        (position) => {
          return (
            <Handle
              key={`source-${position}`}
              id={`source-${position}`}
              type="source"
              className={cn("z-50 w-1.5 h-1.5", !selected ? "invisible" : "")}
              style={{ backgroundColor: color }}
              position={position}
            />
          );
        }
      )}
      {[Position.Top, Position.Left, Position.Right, Position.Bottom].map(
        (position) => {
          return (
            <Handle
              key={`target-${position}`}
              id={`target-${position}`}
              type="target"
              className={cn("z-50 w-1.5 h-1.5", !selected ? "invisible" : "")}
              style={{ backgroundColor: color }}
              position={position}
            />
          );
        }
      )}

      <input
        type="text"
        value={label}
        placeholder={data?.type}
        onChange={(e) => setLabel(e.target.value)}
        className="w-full absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center text-[0.5rem] bg-transparent focus:outline-none"
      />
    </>
  );
};

export default memo(ShapeNode);
