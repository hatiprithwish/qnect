import { CircleX, TriangleAlert } from "lucide-react";
import useFlowStore from "../../store/flowStore";

const Feedbacks = () => {
  const { feedback } = useFlowStore();
  return (
    <aside className="w-72 p-2 max-h-[90vh] overflow-y-auto bg-gray-800 border-r border-gray-700">
      <h2 className="text-xl font-bold text-center">Feedbacks</h2>

      {feedback.mustHaveComponents.length > 0 && (
        <div className="mt-2">
          <h3 className="border-b-[1px] border-gray-200">
            Missing Must Have Components
          </h3>
          <div className="flex items-center flex-wrap gap-2 mt-1.5">
            {feedback.mustHaveComponents.map((feedback) => (
              <span
                key={feedback}
                className="bg-red-100 px-1.5 py-0.5 rounded text-sm text-red-600 border-[1px] border-red-600 flex items-center gap-1 mt-1 font-semibold"
              >
                <CircleX size={12} /> {feedback}
              </span>
            ))}
          </div>
        </div>
      )}

      {feedback.goodToHaveComponents.length > 0 && (
        <div className="mt-4">
          <h3 className="border-b-[1px] border-gray-200">
            Missing Good-to-Have Components
          </h3>
          <div className="flex items-center flex-wrap gap-2 mt-1.5">
            {feedback.goodToHaveComponents.map((feedback) => (
              <span
                key={feedback}
                className="bg-yellow-100 px-1.5 py-0.5 rounded text-sm text-yellow-600 border-[1px] border-yellow-600 flex items-center gap-1 mt-1 font-semibold"
              >
                <TriangleAlert size={12} /> {feedback}
              </span>
            ))}
          </div>
        </div>
      )}

      {feedback.prohibitedConnections.length > 0 && (
        <div className="mt-4">
          <h3 className="border-b-[1px] border-gray-200">
            Prohibited Connections
          </h3>
          <div className="flex items-center flex-wrap gap-2 mt-1.5">
            {feedback.prohibitedConnections.map((feedback) => (
              <span
                key={feedback}
                className="bg-red-100 px-1.5 py-0.5 rounded text-sm text-red-600 border-[1px] border-red-600 flex items-center gap-1 mt-1 font-medium"
              >
                {feedback}
              </span>
            ))}
          </div>
        </div>
      )}

      {feedback.goodToHaveConnections.length > 0 && (
        <div className="mt-4">
          <h3 className="border-b-[1px] border-gray-200">
            Missing Good-to-Have Connections
          </h3>
          <div className="flex items-center flex-wrap gap-2 mt-1.5">
            {feedback.goodToHaveConnections.map((feedback) => (
              <span
                key={feedback}
                className="bg-yellow-100 px-1.5 py-0.5 rounded text-sm text-yellow-600 border-[1px] border-yellow-600 flex items-center gap-1 mt-1 font-medium"
              >
                {feedback}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Feedbacks;
