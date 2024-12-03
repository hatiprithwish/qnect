const DraggableNode = ({ type }: { type: string }) => {
  const onDragStart = (event: any, type: string) => {
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <img
      src={`/shapes/${type}.svg`}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event: any) => (event.target.style.cursor = "grab")}
      width={50}
      height={50}
      className="cursor-grab"
    />
  );
};

export default DraggableNode;
