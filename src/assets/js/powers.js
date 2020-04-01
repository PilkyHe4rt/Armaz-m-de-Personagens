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
    {
        name: "Balista",
        type: "Emissor",
        category: "Mecânica",
        user: "Paulo",
        reach: "Longo Alcance",
        rarity: "3 Estrelas",
        description: "O usuário consegue fazer uma balista com suas mãos "

    },
    {
        name: "Chamas no ombro",
        type: "Emissor",
        category: "Fogo",
        user: "Bia",        
        reach: "Curto Alcance",
        rarity: "2 Estrelas",
        description: "O usuário consegue fazer chamas sairem de seus ombros"
    },
    {
        name: "Sombras Eternas",
        type: "Emissor",
        category: "Sobrenatural",
        user: "Corvo",
        reach: "Contato",
        rarity: "5 Estrelas",
        description: "O usuário consegue entrar na mente e fazer o adversário ver os piores pesadelos"
    }
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
    let inputYears = document.getElementById("inputYears");
    let inputSex = document.getElementById("inputSex");
    let inputBreed = document.getElementById("inputBreed");
    let inputHeight = document.getElementById("inputHeight");
    let inputDesc = document.getElementById("inputDesc");
    let power = {
        name: inputName.value,
        years: parseInt(inputYears.value),
        sex: inputSex.value,
        breed: inputBreed.value,
        height: inputHeight.value,
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

// EXPORTANDO JSON - BOTÃO EXPORTAR
document.getElementById("btnExport").addEventListener("click", () =>{
    let element = document.getElementById("download");
    element.href = 
        "data:text/plain;charset=utf-8," + 
        encodeURIComponent(JSON.stringify(powers));
        element.setAttribute("download", "listadepersonagem.json");
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