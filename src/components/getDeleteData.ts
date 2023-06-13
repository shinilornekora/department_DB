import columns from "./columns";

export default function deleteComponent(element: {[key:string]: string}, activeTable: string) {
    // @ts-ignore
    fetch(`http://localhost:3001/delete/${columns[activeTable]}/${Object.values(element)[0]}`, {
        method: "delete",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                alert("Ошибка при выполнении запроса");
            }
        })
        .catch((error) => {
            console.error("Ошибка при выполнении запроса:", error);
        });
}