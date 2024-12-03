import { useReactFlow } from "@xyflow/react";
import { toJpeg, toPng, toSvg } from "html-to-image";
import { useState } from "react";
import Modal from "./ui/Modal";

const CUSTOM_FILE_EXTENSION = ".qnect";

const Topbar = () => {
  const { getNodes, getEdges } = useReactFlow();
  const nodes = getNodes();
  const edges = getEdges();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExport = (type: "jpeg" | "svg" | "png") => {
    if (!nodes) return;

    const exportFunction =
      type === "jpeg" ? toJpeg : type === "svg" ? toSvg : toPng;

    const element = document.getElementById("react-flow");
    if (element) {
      exportFunction(element, {
        filter: (node) =>
          !(
            node?.classList?.contains("react-flow__minimap") ||
            node?.classList?.contains("react-flow__controls") ||
            node?.classList?.contains("react-flow__panel")
          ),
      }).then((dataUrl) => {
        const now = new Date();
        const time = now.toLocaleTimeString("en-US", { hour12: false });
        const a = document.createElement("a");
        a.setAttribute("download", `chart-${time}.${type}`);
        a.setAttribute("href", dataUrl);
        a.click();
      });
    }
  };

  const handleSaveProgress = () => {
    const jsonData = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });

    // Download Link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    const filename = `diagram-${
      new Date().toISOString().split("T")[0]
    }${CUSTOM_FILE_EXTENSION}`;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <header className="bg-blue-500 p-4 md:px-8 w-full flex items-center justify-between">
      <h1 className="text-xl font-semibold text-white">QNect</h1>

      <div className="flex gap-4">
        <button
          className="text-white hover:underline"
          onClick={handleSaveProgress}
        >
          Save Progress
        </button>
        <button
          className="text-white hover:underline"
          onClick={() => setIsModalOpen(true)}
        >
          Export
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col w-80 items-center justify-center h-40">
          <button
            className="p-1 hover:text-blue-500"
            onClick={() => handleExport("svg")}
          >
            Export as SVG
          </button>
          <button
            className="p-1 hover:text-blue-500"
            onClick={() => handleExport("png")}
          >
            Export as PNG
          </button>
          <button
            className="p-1 hover:text-blue-500"
            onClick={() => handleExport("jpeg")}
          >
            Export as JPEG
          </button>
        </div>
      </Modal>
    </header>
  );
};

export default Topbar;
