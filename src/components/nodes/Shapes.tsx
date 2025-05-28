import React from "react";

const STROKE_COLOR = "#101827";

const CircleIcon: React.FC = ({
  width = 26,
  height = 26,
  color = "rgb(234, 156, 65)",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg width={width + 2} height={height + 2} className="shape-svg">
      <g transform="translate(1, 1)">
        <ellipse
          cx={width / 2}
          cy={height / 2}
          rx={width / 2}
          ry={height / 2}
          fill="transparent"
          stroke={color}
          strokeWidth="1"
        ></ellipse>
      </g>
    </svg>
  );
};

const Circle: React.FC = ({
  width = 76,
  height = 76,
  color = "rgb(234, 156, 65)",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  let stroke = color;
  if (["", "transparent"].includes(color)) {
    stroke = STROKE_COLOR;
  }
  return (
    <svg width={width + 4} height={height + 4} className="shape-svg">
      <g transform="translate(2, 2)">
        <ellipse
          cx={width / 2}
          cy={height / 2}
          rx={width / 2}
          ry={height / 2}
          fill={color}
          fillOpacity="0.7"
          stroke={stroke}
          strokeWidth="2"
        ></ellipse>
      </g>
    </svg>
  );
};

const RoundRectangleIcon: React.FC<{
  width?: number;
  height?: number;
  color?: string;
}> = ({ width = 28, height = 28, color = "rgb(235, 195, 71)" }) => {
  return (
    <svg width={width} height={height} className="shape-svg">
      <g transform="translate(1, 1)">
        <rect
          x="0"
          y="0"
          rx="5.2"
          width="26"
          height="26"
          fill="transparent"
          stroke={color}
          strokeWidth="1"
        ></rect>
      </g>
    </svg>
  );
};

const RoundRectangle: React.FC<{
  width?: number;
  height?: number;
  color?: string;
}> = ({ width = 76, height = 76, color = "rgb(235, 195, 71)" }) => {
  let stroke = color;
  if (["", "transparent"].includes(color)) stroke = STROKE_COLOR;
  return (
    <svg width={width + 4} height={height + 4} className="shape-svg">
      <g transform="translate(2, 2)">
        <rect
          x="0"
          y="0"
          rx="12"
          width={width}
          height={height}
          fill={color}
          fillOpacity="0.7"
          stroke={stroke}
          strokeWidth="2"
        ></rect>
      </g>
    </svg>
  );
};

const RectangleIcon: React.FC = ({
  width = 26,
  height = 26,
  color = "rgb(67, 141, 87)",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg width={width + 2} height={height + 2} className="shape-svg">
      <g transform="translate(1, 1)">
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="transparent"
          stroke={color}
          strokeWidth="1"
        ></rect>
      </g>
    </svg>
  );
};

const Rectangle: React.FC = ({
  width = 76,
  height = 76,
  color = "rgb(67, 141, 87)",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  let stroke = color;
  if (["", "transparent"].includes(color)) stroke = STROKE_COLOR;
  return (
    <svg width={width + 4} height={height + 4} className="shape-svg">
      <g transform="translate(2, 2)">
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill={color}
          fillOpacity="0.7"
          stroke={stroke}
          strokeWidth="2"
        ></rect>
      </g>
    </svg>
  );
};

const HexagonIcon: React.FC = ({
  width = 26,
  height = 26,
  color = "rgb(63, 138, 226)",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg width={width + 2} height={height + 2} className="shape-svg">
      <g transform="translate(1, 1)">
        <path
          d="M0,13 L2.6,0 L23.4,0 L26,13 L23.4,26 L2.6,26 Z"
          stroke={color}
          fill="transparent"
          strokeWidth="1"
        ></path>
      </g>
    </svg>
  );
};

const Hexagon: React.FC = ({
  width = 76,
  height = 76,
  color = "rgb(63, 138, 226)",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  const halfHeight = height / 2;
  let stroke = color;
  if (["", "transparent"].includes(color)) stroke = STROKE_COLOR;
  return (
    <svg width={width + 4} height={height + 4} className="shape-svg">
      <g transform="translate(2, 2)">
        <path
          d={`M0,${halfHeight} L${width / 10},0 L${
            width - width / 10
          },0 L${width},${halfHeight} L${width - width / 10},${height} L${
            width / 10
          },${height} Z`}
          fill={color}
          fillOpacity="0.7"
          stroke={stroke}
          strokeWidth="2"
        ></path>
      </g>
    </svg>
  );
};

const DiamondIcon: React.FC = ({
  width = 26,
  height = 26,
  color = "rgb(128, 61, 236)",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg width={width + 2} height={height + 2} className="shape-svg">
      <g transform="translate(1, 1)">
        <path
          d="M0,13 L13,0 L26,13 L13,26 Z"
          fill="transparent"
          stroke={color}
          strokeWidth="1"
        ></path>
      </g>
    </svg>
  );
};

const Diamond: React.FC = ({
  width = 76,
  height = 76,
  color = "rgb(128, 61, 236)",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  let stroke = color;
  if (["", "transparent"].includes(color)) stroke = STROKE_COLOR;
  return (
    <svg width={width + 4} height={height + 4} className="shape-svg">
      <g transform="translate(2, 2)">
        <path
          d={`M0,${halfHeight} L${halfWidth},0 L${width},${halfHeight} L${halfWidth},${height} Z`}
          fill={color}
          fillOpacity="0.7"
          stroke={stroke}
          strokeWidth="2"
        ></path>
      </g>
    </svg>
  );
};

const ArrowRectangleIcon: React.FC = ({
  width = 26,
  height = 26,
  color = "rgb(63, 138, 226)",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  let stroke = color;
  if (["", "transparent"].includes(color)) stroke = STROKE_COLOR;
  return (
    <svg width={width + 2} height={height + 2} className="shape-svg">
      <g transform="translate(1, 1)">
        <path
          d="M0,0 L23.4,0 L26,13 L23.4,26 L0,26 Z"
          fill="transparent"
          stroke={stroke}
          strokeWidth="1"
        ></path>
      </g>
    </svg>
  );
};

const ArrowRectangle: React.FC = ({
  width = 76,
  height = 76,
  color = "rgb(63, 138, 226)",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  const arrowWidth = width * 0.1; // 10% of width
  const mainWidth = width - arrowWidth;
  let stroke = color;
  if (["", "transparent"].includes(color)) stroke = STROKE_COLOR;
  return (
    <svg width={width + 4} height={height + 4} className="shape-svg">
      <g transform="translate(2, 2)">
        <path
          d={`M0,0 L${mainWidth},0 L${width},${
            height / 2
          } L${mainWidth},${height} L0,${height} Z`}
          fill={color}
          fillOpacity="0.7"
          stroke={stroke}
          strokeWidth="2"
        ></path>
      </g>
    </svg>
  );
};

const Cylinder: React.FC = ({
  width = 76,
  height = 76,
  color = "rgb(234, 156, 65)",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  let stroke = color;
  if (["", "transparent"].includes(color)) stroke = STROKE_COLOR;
  return (
    <svg width={width + 4} height={height + 4} className="shape-svg">
      <g transform="translate(1, 1)">
        <path
          d="M0,9.5  L 0,66.5 A 38 9.5 0 1 0 76 66.5 L 76,9.5 A 38 9.5 0 1 1 0 9.5 A 38 9.5 0 1 1 76 9.5 A 38 9.5 0 1 1 0 9.5 z"
          fill={color}
          fillOpacity="0.7"
          stroke={stroke}
          strokeWidth="2"
        ></path>
      </g>
    </svg>
  );
};

const CylinderIcon: React.FC = ({
  width = 26,
  height = 26,
  color = "rgb(234, 156, 65)",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg width={width + 2} height={height + 2} className="shape-svg">
      <g transform="translate(2, 2)">
        <path
          d="M0,3.25  L 0,22.75 A 13 3.25 0 1 0 26 22.75 L 26,3.25 A 13 3.25 0 1 1 0 3.25 A 13 3.25 0 1 1 26 3.25 A 13 3.25 0 1 1 0 3.25 z"
          fill="transparent"
          stroke={color}
          strokeWidth="1"
        ></path>
      </g>
    </svg>
  );
};

// --------------------------

interface ShapeType {
  [key: string]: {
    icon: any;
    component: any;
    color: string;
  };
}

export const SHAPES: ShapeType = {
  circle: {
    icon: CircleIcon,
    component: Circle,
    color: "rgb(234, 156, 65)",
  },
  "round-rectangle": {
    icon: RoundRectangleIcon,
    component: RoundRectangle,
    color: "rgb(235, 195, 71)",
  },
  rectangle: {
    icon: RectangleIcon,
    component: Rectangle,
    color: "rgb(67, 141, 87)",
  },
  hexagon: {
    icon: HexagonIcon,
    component: Hexagon,
    color: "rgb(63, 138, 226)",
  },
  diamond: {
    icon: DiamondIcon,
    component: Diamond,
    color: "rgb(128, 61, 236)",
  },
  "arrow-rectangle": {
    icon: ArrowRectangleIcon,
    component: ArrowRectangle,
    color: "rgb(63, 138, 226)",
  },
  cylinder: {
    icon: CylinderIcon,
    component: Cylinder,
    color: "rgb(234, 156, 65)",
  },
};
