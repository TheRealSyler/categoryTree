import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';

import Tree, { ITree } from './components/tree';


export const treeData: ITree = {
  parentId: 'root',
  name: 'Root',
  id: 'root',
  children: []
}
let setUpdateRef: (val: boolean) => void
let updateRef: boolean
export const update = () => setUpdateRef(!updateRef);


const App: FunctionComponent = () => {
  const [updateVal, setUpdate] = useState(false)
  setUpdateRef = setUpdate
  updateRef = updateVal
  return (
    <main class="main">

      <div>
        <h1 class="title">Category Tree</h1>
        <Tree parentId={treeData.parentId} id={treeData.id} name={treeData.name} children={treeData.children} />
      </div>
    </main>
  );
};

export default App;
