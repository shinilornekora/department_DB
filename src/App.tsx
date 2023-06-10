import React, {SetStateAction, useEffect, useState} from 'react';
import './App.css';

function App() {
  const [activeTable, setActiveTable] = useState<string>('');
  const [queryData, setQueryData] = useState<[{[key: string]: string}]>([{'':''}]);
  const columns = {
    'Не выбрано': '',
    'Дистрибьютор': 'distributor',
    'Аппаратное обеспечение': 'hardware',
    'Использует': 'use',
    'Сотрудник': 'employee',
    'Отдел': 'department',
    'Установлено': 'install',
    'Производитель': 'producer',
    'Программное обеспечение': 'software',
  };
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
      fetchData();
    }
  }, [activeTable]);

  return (
      <div className="App">
        <div className="wrapper">
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
            queryData &&
              (<table>
                <tr className="header">
                  {Object.keys(queryData[0]).map((e) => (<td>{e}</td>))}
                </tr>
                {
                  queryData.map((e) => (
                      <tr>
                        {Object.values(e).map((e) => (
                            <td>{e}</td>
                        ))}
                      </tr>
                  ))
                }
              </table>)
          }
        </div>
      </div>
  );
}

export default App;