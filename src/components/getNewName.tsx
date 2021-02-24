import { h } from 'dom-chef';



const GetNewName: () => Promise<null | string> = () => new Promise((r) => {
  const res = (a: string | null) => {
    const getNameEl = document.getElementById('get-name')
    getNameEl?.remove()
    r(a)
  }
  const getNameHTML = <div id="get-name">
    <input autoFocus className="inp" type="text" name="getName" id="get-name-inp" />
    <button className="btn" onClick={() => {
      const inp = document.getElementById('get-name-inp') as HTMLInputElement
      if (inp) {
        res(inp.value)
        return
      }
      res(null)
    }}>Change Name</button>
    <button className="btn" onClick={() => res(null)}>Cancel</button>
  </div>


  document.body.appendChild(getNameHTML)
})



export default GetNewName