import { ITree } from "./components/tree";

export function findTreeNode(node: ITree, id: string): null | ITree {
  if (node.id === id) {
    return node;
  }
  if (node.children.length > 0) {
    let result = null;
    for (let i = 0; result === null && i < node.children.length; i++) {
      result = findTreeNode(node.children[i], id);
    }
    return result;
  }
  return null;
}

export function findIndex(node: ITree, id: string) {
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.id === id) {
      return i
    }
  }
  return null
}