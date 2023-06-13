import columns from "./columns";

export default function getData(activeTable: string) {
    const inputs = document.querySelectorAll("#okno input[type='text']");
    let data: {[key: string]: string} = {};
    // @ts-ignore
    for (const input of inputs) {
        const fieldName = input.parentElement.querySelector(".name").textContent;
        const fieldValue = input.value.trim();
        data[fieldName] = fieldValue;
    }
    // @ts-ignore
    fetch(`http://localhost:3001/create/${columns[activeTable]}`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then( (response) => {
        if (response.status === 201) {
            window.location.href = 'http://localhost:3000/#';
        }
        if (response.status === 500) {
            alert('Проверьте корректность введённых данных.');
        }
    });
}