import React from "react";
import getData from "./getCreateData";

interface Props {
    queryData: [{[key: string]: string}] | undefined;
    activeTable: string;
}

function CreatePopup(props: Props) {
    const { queryData, activeTable } = props;
    return (
        <div id="zatemnenie">
            <div id="okno">
                Заполните все поля таблицы.
                <div className="fields">
                    {queryData &&
                        Object.keys(queryData[0]).map((e) => (
                            <div className="item" key={e}>
                                <div className="name">{e}</div>
                                <input type="text" />
                            </div>
                        ))}
                </div>
                <a className="close" onClick={() => getData(activeTable)}>
                    Добавить элемент
                </a>
            </div>
        </div>
    );
}

export default CreatePopup;