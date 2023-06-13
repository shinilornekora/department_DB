import React, { useState } from "react";
import editData from "./getEditData";

interface Props {
    rowData: { [key: string]: string };
    columns: string[];
    activeTable: string;
}

function EditPopup(props: Props) {
    const { rowData, columns, activeTable } = props;
    const [editedData, setEditedData] = useState(rowData);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };
    const handleEditData = () => {
        editData(Object.values(rowData)[0], activeTable, editedData);
    };

    return (
        <div id="zatemnenie2">
            <div id="okno">
                Редактирование данных.
                <div className="fields">
                    {columns.map((column) => (
                        <div className="item" key={column}>
                            <div className="name">{column}</div>
                            <input
                                type="text"
                                name={column}
                                value={editedData[column]}
                                onChange={handleInputChange}
                            />
                        </div>
                    ))}
                </div>
                <a href="#" className="close" onClick={handleEditData}>
                    Сохранить изменения
                </a>
            </div>
        </div>
    );
}

export default EditPopup;