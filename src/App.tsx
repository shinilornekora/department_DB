import React, { useEffect, useState } from 'react';
import './styles/App.css';
import columns from "./components/columns";
import CreatePopup from "./components/createPopup";
import deleteComponent from "./components/getDeleteData";
import EditPopup from "./components/editPopup";


function App() {
  const [activeTable, setActiveTable] = useState<string>('');
  const [queryData, setQueryData] = useState<[{[key: string]: string}]>();
  const [editPopup, setEditPopup] = useState<boolean>();
  const [editActiveElement, setEditActiveElement] = useState<{[key: string]: string}>({});
  const [searchProcess, setSearchProcess] = useState<{[key: string]: string}>();
  const searchKeyProcess = Object.keys(searchProcess ?? {})[0];
  const searchValueProcess = Object.values(searchProcess ?? {})[0];
  const date = new Date().getMilliseconds();
  function search(searchElement: string) {
    const ourFilter = prompt("Введите данные для поиска") ?? '';
    setSearchProcess({[searchElement]: ourFilter});
  }
  function isSimular(elementOne: {[key: string]: string}) {
    console.log(searchProcess)
    if (!searchProcess)
      return true;
    return elementOne[searchKeyProcess] === searchValueProcess;

  }
  let id: number = 0;
  useEffect(() => {
    async function fetchData() {
      try {
        // @ts-ignore
        const url = `http://localhost:3001/${columns[activeTable]}`;
        const result = await fetch(url, { method: 'GET', credentials: 'include' })
            .then(response => response.json())
            .catch(error => console.error(error));
        setQueryData(result);
      } catch (error) {
        console.error(error);
      }
    }
    if (activeTable) {
      fetchData().then(r => r);
    }
  }, [activeTable, date]);

  return (
      <div className="App">
        <div className="wrapper">
          <CreatePopup queryData={queryData} activeTable={activeTable}/>
          { editPopup && editActiveElement && (<EditPopup activeTable={activeTable} columns={Object.keys(editActiveElement)} rowData={editActiveElement} />) }
          <div className="buttons">
          <select name="queryTable" id="table" value={activeTable} onChange={(event) => setActiveTable(event.target.value)}>
            {
              Object.keys(columns).map((e: string) => {
                id++;
                return (
                  <option id={id.toString()} key={e} value={e}>
                    {e}
                  </option>
                )
              })
            }
          </select>
          {
            queryData && (
                  <button>
                    <a href="#zatemnenie">+ Сделать новую запись</a>
                  </button>
              )
          }
          </div>
          {
            queryData &&
              (<table>
                <tr className="header">
                  {Object.keys(queryData[0]).map((e) => (
                      <td>
                        <div onClick={() => search(e)}>🔎</div>  {e}
                      </td>))}
                </tr>
                {
                  queryData.map((e) => { return isSimular(e) ? (
                      <tr>
                        {Object.values(e).map((e) => (
                            <td>{e}</td>
                        ))}
                        <td className="edit" onClick={() => {
                          setEditPopup(!editPopup);
                          setEditActiveElement(e);
                        }}><a href="#zatemnenie2">🖉</a></td>
                        <td className="delete" onClick={() => deleteComponent(e, activeTable)}>&times;</td>
                      </tr>
                  ) : ''})
                }
              </table>)
          }
        </div>
      </div>
  );
}

export default App;