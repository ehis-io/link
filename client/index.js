document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));

});


const addBtn = document.querySelector('#add-name-btn');
document.querySelector('table tbody').addEventListener('click', function(event){
    if (event.target.className === 'delete-row-btn') {
        deleteRowById(event.target.dataset.id);
    }

});
function deleteRowById(id){
    fetch('http://localhost:5000/delete/'+ id, {
        method: 'DELETE'
    })
    .then(response =>response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

addBtn.onclick =function () {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value ="";

    fetch('http://localhost:5000/insert', {
        headers:{
            'content-type': 'application/json'
        },
        method:'POST', 
        body:JSON.stringify({name : name})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data){
    const table = document.querySelector("tbody");
    const isTableData = table.querySelector('.no-data');

    let tableHtml ="<tr>";

    for (var key in data){
        if (data.hasOwnProperty(key)){
            if (key === 'dataAdded'){
                date[key] =new Date(data[key]).toLocaleString();
            }
            tableHtml += ` <td>${data[key]}</td>`;
        }
    }
   
        tableHtml += `<td><button class ="delete-row-btn" data-id = ${data.id}>Delete</td>`;
        tableHtml += `<td><button class ="edit-row-btn" data-id = ${data.id}>Edit></td>`;
        
 

    tableHtml += "</tr>";

    if (isTableData){
        table.innerHTML=tableHtml;
    }else{
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }



}

function loadHTMLTable(data) {
    const table = document.querySelector('tbody');
   
    
    if (data.lenght === 0) {
        table.innerHTML = '<tr><td class = "no-data" colspan ="5">No Data</td></tr>';
        return;
    }

    let tableHtml = "";

    data.forEach(function ({id, name, date_added}){
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td><button class ="delete-row-btn" data-id = ${id}>Delete</td>`;
        tableHtml += `<td><button class ="edit-row-btn" data-id = ${id}>Edit></td>`;
        
      table.innerHTML +=  "</tr>";
    });
    table.innerHTML = tableHtml;
}