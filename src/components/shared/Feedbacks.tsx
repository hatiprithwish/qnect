import { ChevronLeft, ChevronRight, TriangleAlert } from "lucide-react";
import useFlowStore from "../../store/flowStore";
import { useState } from "react";
import Modal from "../ui/Modal";
import AIFlow from "../AIFlow";

const Feedbacks = () => {
  const { feedback, aiFlow } = useFlowStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -left-6 top-1/2 -translate-y-1/2 bg-gray-800 p-1 rounded-l border-l border-t border-b border-gray-700 z-10"
        >
          {isCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        <aside
          className={`transition-all duration-300 ease-in-out ${
            isCollapsed ? "w-0 opacity-0 overflow-hidden" : "w-72 opacity-100"
          } p-2 h-[90vh] overflow-y-auto bg-gray-800 border-r border-gray-700`}
        >
          <h2 className="text-xl font-bold text-center">Feedbacks</h2>

          {feedback.requiredNodes.length > 0 && (
            <div className="mt-2">
              <div className="flex items-center flex-wrap gap-2 mt-1.5">
                You must have:
                {feedback.requiredNodes.map((feedback) => (
                  <span
                    key={feedback}
                    className="bg-red-100 px-1.5 py-0.5 rounded text-sm text-red-600 border-[1px] border-red-600 flex items-center gap-1 mt-1 font-semibold"
                  >
                    {feedback}
                  </span>
                ))}
              </div>
            </div>
          )}

          {feedback.goodNodes.length > 0 && (
            <div className="mt-4">
              <h3 className="border-b-[1px] border-gray-200">
                Missing Good-to-Have Components
              </h3>
              <div className="flex items-center flex-wrap gap-2 mt-1.5">
                {feedback.goodNodes.map((feedback) => (
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

          {feedback.faultyEdges.length > 0 && (
            <div className="mt-4">
              <h3 className="border-b-[1px] border-gray-200">
                Prohibited Connections
              </h3>
              <div className="flex items-center flex-wrap gap-2 mt-1.5">
                {feedback.faultyEdges.map((feedback) => (
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

          {feedback.missingEdges.length > 0 && (
            <div className="mt-4">
              <h3 className="border-b-[1px] border-gray-200">
                Missing Good-to-Have Connections
              </h3>
              <div className="flex items-center flex-wrap gap-2 mt-1.5">
                {feedback.missingEdges.map((feedback) => (
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

          {aiFlow && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white hover:bg-gray-100 text-black py-2 px-4 rounded-md font-medium cursor-pointer mx-auto"
            >
              AI Feedback
            </button>
          )}
        </aside>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="w-full"
      >
        <AIFlow />
      </Modal>
    </>
  );
};

export default Feedbacks;
