import { Handle, Position } from "@xyflow/react";
import { cn } from "../../utils/cn";

type FeedbackNodeProps = {
  id: string;
  data: {
    label: string;
    feedback?: string;
    type: string;
  };
};

const FeedbackNode = ({ id, data }: FeedbackNodeProps) => {
  return (
    <div className="max-w-56 text-white bg-slate-900 p-2 rounded-lg">
      <div className="flex items-center justify-center gap-3">
        <img
          src={`/icons/${data?.label.split(" ").join("-").toLowerCase()}.webp`}
          width={25}
          height="auto"
          className="rounded"
        />
        <p className="capitalize font-semibold">{data.label}</p>
      </div>
      {data?.feedback && data?.feedback?.length > 0 && (
        <p className="text-xs">{data.feedback}</p>
      )}

      {[Position.Right].map((position) => {
        return (
          <Handle
            key={`${id}-${position}`}
            id={`${id}-${position}`}
            type="source"
            className={cn("z-50 w-1.5 h-1.5 bg-slate-800")}
            position={position}
          />
        );
      })}
      {[Position.Left].map((position) => {
        return (
          <Handle
            key={`${id}-${position}`}
            id={`${id}-${position}`}
            type="target"
            className={cn("z-50 w-1.5 h-1.5 bg-slate-800")}
            position={position}
          />
        );
      })}
    </div>
  );
};

export default FeedbackNode;
