import React, { useContext, useEffect, useState } from "react";

import { Icon, IconSize } from "@blueprintjs/core";
import { CSSTransition } from "react-transition-group";
import { TreeContext } from "../../contexts/TreeContext";
import ClientOnly from "../ClientOnly";

const Tree = ({ count = 0, data = [], onClicked }) => {
  return (
    <div className="d-tree">
      <ul className="d-flex d-tree-container flex-column">
        {data.map((tree, index) => (
          <TreeNode
            countTree={count}
            key={index}
            node={tree}
            onClicked={onClicked}
          />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ countTree, node, onClicked }) => {
  const tree = useContext(TreeContext);
  const [childVisible, setChildVisiblity] = useState(false);

  const hasChild = node.children ? true : false;

  useEffect(() => {
    if (hasChild) {
      const s = node.children.find((item) => item.key === tree.selectedNode);
      if (s) setChildVisiblity(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasChild]);

  const clickMenu = () => {
    setChildVisiblity((v) => !v);
    if (hasChild) return;

    tree.setNewNode(node.key);
    onClicked(node);
  };

  return (
    <ClientOnly>
      <li
        className={`d-tree-node ${
          tree.selectedNode === node.key ||
          (hasChild &&
            node.children.find((item) => item.key === tree.selectedNode))
            ? "selected-row2"
            : "unselected-row2"
        }`}
      >
        <div className="d-flex d-tree-btn" onClick={clickMenu}>
          <div
            style={{ marginLeft: countTree * 14 + "px" }}
            className="col d-tree-head"
          >
            {node.icon && (
              <Icon
                className="tree-icon"
                icon={node.icon}
                size={IconSize.STANDARD}
              />
            )}
            <p>{node.label}</p>
          </div>

          {hasChild && (
            <div
              className={`d-inline d-tree-toggler ${
                childVisible ? "active" : ""
              }`}
            >
              <Icon
                className="tree-right-icon"
                icon={"chevron-down"}
                size={IconSize.STANDARD}
              />
            </div>
          )}
        </div>

        <CSSTransition
          in={hasChild && childVisible}
          timeout={300}
          classNames="size-in"
          unmountOnExit
          // onEnter={() => setShowButton(false)}
          // onExited={() => setShowButton(true)}
        >
          <div className="d-tree-content">
            <ul className="d-flex d-tree-container flex-column">
              <Tree
                count={countTree + 1}
                data={node.children}
                onClicked={onClicked}
              />
            </ul>
          </div>
        </CSSTransition>
      </li>
    </ClientOnly>
  );
};

export default Tree;
