// GERAR LINHA NA TABELA
const generateTableRow = (id, data) => {
    return `
        <tr onclick="selectRow(event)"  data-index="${id}">
            <td>${data.name}</td>
            <td>${data.type}</td>
            <td>${data.category}</td>  
        </tr>
    `;
}
//SELECIONAR LINHA NA TABELA
const selectRow = event => {
    let rows = document.getElementsByTagName("tr");
    for (let row of rows){
        row.className = "";
    }
    event.target.parentNode.classList.add("table-active");

};
let powers = [

];



// INSERINDO RESULTADOS NA TABELA 
const refreshTable = () =>{
    let table = document.getElementById('mainTable')
    table.innerHTML = "";
    powers.forEach((power, i) => {
        let row = generateTableRow(i, power);
        table.insertAdjacentHTML('beforeend', row);
    });

};

// CADASTRO DOS PERSONAGENS - BOTÃO INSERIR/CADASTRA
const init = () => refreshTable();
init();
document.getElementById('btnFinishPower').addEventListener('click', e =>{
    e.preventDefault();

    let inputName = document.getElementById("inputName");
    let inputType = document.getElementById("inputType");
    let inputCategory = document.getElementById("inputCategory");
    let inputRarity = document.getElementById("inputRarity");
    let inputUser = document.getElementById("inputUser");
    let inputReach = document.getElementById("inputReach");
    let inputDesc = document.getElementById("inputDesc");
    let power = {
        name: inputName.value,
        type: inputType.value,
        category: inputCategory.value,
        rarity: inputRarity.value,
        user: inputUser.value,
        reach: inputReach.value,
        description: inputDesc.value
    };
    document.getElementById("formInsert").reset();
    powers.push(power);
    refreshTable();
    $("#addModal").modal("toggle");
});


// REMOVENDO PERSONAGEM  - BOTÃO REMOVER
document.getElementById("btnRemove").addEventListener("click", e => {
    e.preventDefault();
    let rows = document.getElementsByClassName("table-active");
    if(!rows.length) {
        alert("Selecione um personagem para remover");
        return false;
    }
    let index = parseInt(rows[0].getAttribute("data-index"));
    powers = powers.filter((data, i) => i !== index);
    refreshTable();
}); 

// IMPORTANDO JSON - BOTÃO IMPORTAR
document.getElementById("btnImport").addEventListener("change", e =>{
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.readAsText(file);
    reader.onloadend = () => {
        let result = JSON.parse(reader.result);
        powers = result;
        refreshTable();
    };
});

//LABEL
document.getElementById("labelImport").addEventListener("click", () => {
    document.getElementById("btnImport").click();
});

// EXPORTANDO JSON - BOTÃO EXPORTAR
document.getElementById("btnExport").addEventListener("click", () =>{
    let element = document.getElementById("download");
    element.href = 
        "data:text/plain;charset=utf-8," + 
        encodeURIComponent(JSON.stringify(powers));
        element.setAttribute("download", "listadepoderes.json");
    element.click();
});

// FILTRO

$(document).ready(function(){
    $("#filterPowers").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $("#mainTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        
      });
    });
});



// LEVAR JSON PARA LISTA   
document.getElementById("btnInfo").addEventListener("click", e => {
    e.preventDefault();
    let rows = document.getElementsByClassName("table-active");
    if(!rows.length) {
        alert("Selecione um personagem para ver as informações");
        return false;
    }
    let list = parseInt(rows[0].getAttribute("data-index"));
    document.getElementById("resultName").innerHTML = powers[list].name
    document.getElementById("resultType").innerHTML = powers[list].type
    document.getElementById("resultCategory").innerHTML = powers[list].category
    document.getElementById("resultRarity").innerHTML = powers[list].rarity
    document.getElementById("resultUser").innerHTML = powers[list].user
    document.getElementById("resultReach").innerHTML = powers[list].reach
    document.getElementById("resultDesc").innerText = powers[list].description
});