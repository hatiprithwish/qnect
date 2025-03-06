import { DragEvent, useRef } from "react";
import { SHAPES } from "../nodes/Shapes";
import { icons } from "../../constants";

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
    <div className="w-64 p-4 md:px-8 max-h-screen bg-gray-800 border-r border-gray-700">
      <h4 className="text-xl font-semibold pb-0.5 border-b-[1px] border-b-slate-300">
        Drag and Drop
      </h4>
      <div className="flex flex-wrap gap-2 mt-2">
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

      <div className="mt-8">
        <h4 className="text-xl font-semibold pb-0.5 border-b-[1px] border-b-slate-300 !mt-10">
          Icons
        </h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {icons.map((item) => {
            const ref = useRef<HTMLDivElement>(null);
            return (
              <div
                key={item}
                onDragStart={(event) => onDragStart(event, item, ref)}
                draggable
              >
                <img
                  src={`/icons/${item.split(" ").join("-").toLowerCase()}.webp`}
                  width={30}
                  height={30}
                  alt={item}
                />
                <div
                  ref={ref}
                  key={item}
                  className="translate-x-0 translate-y-0 absolute -top-96 -left-96"
                >
                  <img
                    src={`/icons/${item
                      .split(" ")
                      .join("-")
                      .toLowerCase()}.webp`}
                    width={100}
                    height={100}
                    alt={item}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
