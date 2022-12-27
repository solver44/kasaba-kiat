import { cloneDeep } from "lodash-es";
import * as React from "react";
import { Classes, Icon, Intent, Tree } from "@blueprintjs/core";
import {
  Classes as Popover2Classes,
  ContextMenu2,
  Tooltip2,
} from "@blueprintjs/popover2";

import "./index.scss";

function forEachNode(nodes, callback) {
  if (nodes === undefined) {
    return;
  }
  for (const node of nodes) {
    callback(node);
    forEachNode(node.childNodes, callback);
  }
}
function forNodeAtPath(nodes, path, callback) {
  callback(Tree.nodeFromPath(path, nodes));
}
function treeReducer(state, action) {
  switch (action.type) {
    case "DESELECT_ALL":
      const newState1 = cloneDeep(state);
      forEachNode(newState1, (node) => (node.isSelected = false));
      return newState1;
    case "SET_IS_EXPANDED":
      const newState2 = cloneDeep(state);
      forNodeAtPath(
        newState2,
        action.payload.path,
        (node) => (node.isExpanded = action.payload.isExpanded)
      );
      return newState2;
    case "SET_IS_SELECTED":
      const newState3 = cloneDeep(state);
      forNodeAtPath(
        newState3,
        action.payload.path,
        (node) => (node.isSelected = action.payload.isSelected)
      );
      return newState3;
    default:
      return state;
  }
}
export const AppTree = (props) => {
  const [nodes, dispatch] = React.useReducer(treeReducer, INITIAL_STATE);
  const handleNodeClick = React.useCallback((node, nodePath, e) => {
    const originallySelected = node.isSelected;
    if (!e.shiftKey) {
      dispatch({ type: "DESELECT_ALL" });
    }
    dispatch({
      payload: {
        path: nodePath,
        isSelected: originallySelected == null ? true : !originallySelected,
      },
      type: "SET_IS_SELECTED",
    });
  }, []);
  const handleNodeCollapse = React.useCallback((_node, nodePath) => {
    dispatch({
      payload: { path: nodePath, isExpanded: false },
      type: "SET_IS_EXPANDED",
    });
  }, []);
  const handleNodeExpand = React.useCallback((_node, nodePath) => {
    dispatch({
      payload: { path: nodePath, isExpanded: true },
      type: "SET_IS_EXPANDED",
    });
  }, []);
  return (
    <Tree
      contents={nodes}
      onNodeClick={handleNodeClick}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
      className={Classes.ELEVATION_0 + " app-tree"}
    />
  );
};

const contentSizing = {
  popoverProps: { popoverClassName: Popover2Classes.POPOVER2_CONTENT_SIZING },
};
/* tslint:disable:object-literal-sort-keys so childNodes can come last */
const INITIAL_STATE = [
  {
    id: 0,
    key: "/",
    icon: "home",
    label: "Уй",
  },
  {
    id: 1,
    key: "0",
    label: "Ахборот ресурслари",
    icon: "database",
    childNodes: [
      {
        id: 2,
        icon: "document",
        label: "Item 0",
        secondaryLabel: React.createElement(
          Tooltip2,
          { content: "An eye!" },
          React.createElement(Icon, { icon: "eye-open" })
        ),
      },
      {
        id: 3,
        icon: React.createElement(Icon, {
          icon: "tag",
          intent: Intent.PRIMARY,
          className: Classes.TREE_NODE_ICON,
        }),
        label:
          "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.",
      },
      {
        id: 4,
        hasCaret: true,
        icon: "folder-close",
        label: React.createElement(
          ContextMenu2,
          Object.assign({}, contentSizing, {
            content: React.createElement("div", null, "Hello there!"),
          }),
          React.createElement(
            Tooltip2,
            { content: "foo", placement: "right" },
            "Folder 2"
          )
        ),
        childNodes: [
          { id: 5, label: "No-Icon Item" },
          { id: 6, icon: "tag", label: "Item 1" },
          {
            id: 7,
            hasCaret: true,
            icon: "folder-close",
            label: React.createElement(
              ContextMenu2,
              Object.assign({}, contentSizing, {
                content: React.createElement("div", null, "Hello there!"),
              }),
              "Folder 3"
            ),
            childNodes: [
              { id: 8, icon: "document", label: "Item 0" },
              { id: 9, icon: "tag", label: "Item 1" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Маълумотномалар",
    icon: "git-repo",
    childNodes: [
      {
        id: 3,
        key: "dy/sections",
        icon: "document",
        label: "Бўлимлар",
      },
      {
        id: 4,
        key: "dy/countries",
        icon: "document",
        label: "Давлатлар",
      },
    ],
  },
  {
    key: "2",
    label: "Ҳисоботлар",
    icon: "timeline-area-chart",
  },
  {
    key: "settings",
    label: "Созлашлар",
    icon: "settings",
  },
  {
    key: "4",
    label: "Администратор",
    icon: "person",
  },
];
