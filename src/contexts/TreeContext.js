import { createContext, useState } from "react";

export const TreeContext = createContext();

export function useTreeContext() {
  const [selectedNode, setSelectedNode] = useState(
    typeof window !== "undefined" ? window.location.pathname : ""
  );

  const setNewNode = (node) => {
    if (!node) return;
    setSelectedNode(node);
  };

  return {
    selectedNode,
    setNewNode,
  };
}
