import { h } from 'dom-chef';
import { treeData } from '../index';
import { findIndex, findTreeNode } from '../utils';

import { v4 as uuidV4 } from 'uuid'
import GetNewName from './getNewName';
export interface ITree {
  name: string
  children: ITree[]
  id: string
  parentId: string
}

const collapseIcon = () => <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492.004 492.004" xmlSpace="preserve">
  <g>
    <g>
      <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" />
    </g>
  </g>
</svg>

export function renderTree(tree: ITree) {

  let isCollapsed = false
  const handleCollapse = (() => {
    isCollapsed = (!isCollapsed)
    const collapsedElRef = document.getElementById(`tree-collapsed-${tree.id}`)
    const childrenElRef = document.getElementById(`tree-children-${tree.id}`)
    if (childrenElRef && collapsedElRef) {
      childrenElRef.style.display = isCollapsed ? 'none' : 'block'
      collapsedElRef.className = isCollapsed ? 'tree-collapsed tree-closed' : 'tree-collapsed'
    }
  })
  const handleRemove = (() => {
    const selfElRef = document.getElementById(`tree-${tree.id}`)
    selfElRef?.remove()
    const parent = findTreeNode(treeData, tree.parentId)
    if (parent) {
      const index = findIndex(parent, tree.id)
      if (index !== null) {
        parent.children.splice(index, 1)
      }
    }
  })

  const handleAdd = (() => {
    const self = findTreeNode(treeData, tree.id)
    const elRef = document.getElementById(`tree-children-${tree.id}`)
    if (self && elRef) {
      const i = self.children.length
      const treeChild: ITree = { children: [], name: `Child ${i + 1}`, parentId: self.id, id: uuidV4() };
      self.children.push(treeChild)
      elRef.appendChild(renderTree(treeChild))
    }
  })

  const handleEdit = (async () => {
    const elRef = document.getElementById(`tree-name-${tree.id}`)

    const self = findTreeNode(treeData, tree.id)
    const newName = await GetNewName()
    if (self && elRef && newName) {
      self.name = newName
      elRef.textContent = newName
    }
  })


  const childrenJSX = []
  for (let i = 0; i < tree.children.length; i++) {
    const child = tree.children[i];
    if (child.children.length > 0) {
      childrenJSX.push(renderTree(child))
    }
  }

  return (<div className="tree" id={`tree-${tree.id}`} >
    <div className="tree-body">
      <div className="cursor-pointer" onClick={handleCollapse}>
        <span id={`tree-collapsed-${tree.id}`} className="tree-collapsed">
          {collapseIcon()}
        </span>
        <span className="tree-name" id={`tree-name-${tree.id}`} >  {tree.name} </span>
      </div>
      <div>
        <button onClick={handleAdd} className="ml btn">Add</button>
        {tree.id !== 'root' &&
          <button onClick={handleRemove} className="ml btn">Remove</button>
        }
        <button className="ml btn" onClick={handleEdit}>Edit</button>
      </div>
    </div>
    <div id={`tree-children-${tree.id}`}>
      {childrenJSX}
    </div>
  </div>
  )
}