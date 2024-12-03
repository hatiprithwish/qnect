import type { NodeTypes } from "@xyflow/react";
import SquareNode from "./SquareNode";
import CircleNode from "./CircleNode";
import TriangleNode from "./TriangleNode";
import DiamondNode from "./DiamondNode";
import HexagonNode from "./HexagonNode";
import PentagonNode from "./PentagonNode";
import OctagonNode from "./OctagonNode";
import WebLogoNode from "./WebLogoNode";

export const nodeTypes = {
  square: SquareNode,
  circle: CircleNode,
  // rectangle: RectangleNode,
  triangle: TriangleNode,
  diamond: DiamondNode,
  hexagon: HexagonNode,
  pentagon: PentagonNode,
  octagon: OctagonNode,
  amazon: WebLogoNode,
  apple: WebLogoNode,
  behance: WebLogoNode,
  google: WebLogoNode,
  meta: WebLogoNode,
  netflix: WebLogoNode,
} satisfies NodeTypes;
