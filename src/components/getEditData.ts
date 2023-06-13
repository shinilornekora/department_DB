import columns from "./columns";

export default function editData(id: string | number, activeTable: string, data: { [key: string]: string }) {

    // @ts-ignore
    fetch(`http://localhost:3001/edit/${columns[activeTable]}/${id}`, {
        method: "put",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.ok) {
                console.log(response);
            }
        })
        .then((data) => {
            console.log("Успешный ответ сервера:", data);
        })
}
