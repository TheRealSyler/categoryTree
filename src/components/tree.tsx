import { h, FunctionComponent } from 'preact';
import { useCallback, useState } from 'preact/hooks';
import { treeData, update } from '../app';
import { findIndex, findTreeNode } from '../utils';


export interface ITree {
  name: string
  children: ITree[]
  id: string
  parentId: string
}

const Tree: FunctionComponent<ITree> = (props) => {
  let { name, children, id, parentId } = props;
  const [isCollapsed, setIsCollapsed] = useState(false)
  const handleCollapse = useCallback(() => {
    setIsCollapsed(!isCollapsed)
  }, [isCollapsed])

  const handleRemove = useCallback(() => {
    const parent = findTreeNode(treeData, parentId)
    if (parent) {
      const index = findIndex(parent, id)
      if (index !== null) {
        parent.children.splice(index, 1)
        update()
      }
    }
  }, [])
  const handleAdd = useCallback(() => {
    const parent = findTreeNode(treeData, id)
    if (parent) {
      const i = parent.children.length
      parent.children.push({ children: [], name: `Child ${i + 1}`, parentId: parent.id, id: `${parentId}.${i + 1}` })
      update()
    }
  }, [])



  const childrenJSX = []
  for (const key in children) {
    if (Object.prototype.hasOwnProperty.call(children, key)) {
      const child = children[key];

      childrenJSX.push(<Tree key={child.id} parentId={child.parentId} id={child.id} name={child.name} children={child.children} />)
    }
  }

  return (
    <div class="tree">
      <div class="tree-body">
        <div class="tree-name" onClick={handleCollapse}> {name} </div>
        <div>
          <button onClick={handleAdd} class="ml btn">Add</button>
          {id !== 'root' &&
            <button onClick={handleRemove} class="ml btn">Remove</button>
          }
          <button class="ml btn">Edit</button>
        </div>
      </div>

      {!isCollapsed && childrenJSX}
    </div>
  )
}

export default Tree