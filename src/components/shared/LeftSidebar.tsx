import { DragEvent, useRef } from "react";
import { SHAPES } from "../nodes/Shapes";

const LeftSidebar = () => {
  const onDragStart = (
    event: DragEvent,
    type: string,
    ref: React.RefObject<HTMLDivElement>
  ) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
    if (ref.current) {
      event.dataTransfer.setDragImage(ref.current, 0, 0);
    }
  };
  return (
    <div className="absolute top-[20%] left-4 z-10 p-4 h-fit bg-gray-900 rounded-lg border border-gray-500">
      <div className="flex flex-col gap-4">
        {Object.keys(SHAPES).map((shape_type) => {
          const Icon = SHAPES[shape_type].icon;
          const Component = SHAPES[shape_type].component;
          const ref = useRef<HTMLDivElement>(null);
          return (
            <div
              key={shape_type}
              onDragStart={(event) => onDragStart(event, shape_type, ref)}
              draggable
              className="hover:cursor-grab"
            >
              <Icon />
              <div
                ref={ref}
                key={shape_type}
                className="translate-x-0 translate-y-0 absolute -top-96 -left-96"
              >
                <Component />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebar;
