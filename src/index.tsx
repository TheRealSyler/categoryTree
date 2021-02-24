import { h } from 'dom-chef';
import { ITree, renderTree } from './components/tree';
import "regenerator-runtime/runtime.js";
import './index.sass';

export const treeData: ITree = {
  parentId: 'root',
  name: 'Root',
  id: 'root',
  children: []
}


document.body.appendChild(<main className="main">
  <div>
    <h1 className="title">Category Tree</h1>
    <div id="tree-root">{renderTree(treeData)}</div>
  </div>
</main>);