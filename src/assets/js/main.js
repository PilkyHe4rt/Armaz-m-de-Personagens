//
// BOTÕES DE AÇÕES 


//SELECIONAR LINHA NA TABELA
const selectRow = event => {
    let rows = document.getElementsByTagName("tr");
    for (let row of rows){
        row.className = "";
    }
    event.target.parentNode.classList.add("table-active");
};


// GERADOR DE LINHA NA TABELA
const generateTableRow = (id, data) => {
    return `
        <tr onclick="selectRow(event)" data-index="${id}">
            <td>${data.name}</td>
            <td>${data.years}</td>
            <td>${data.breed}</td>
            <td>${data.sex}</td>
        </tr>
    `;
}

let characters = [
    {
        name: "Pedro",
        years: 20,
        breed: "Humano",
        sex: "Masculino",
        height: "1,68",
        description: "Pedro é chave"
    },
    {
        name: "Ricardo",
        years: 10,
        breed: "Vampiro",
        sex: "Masculino",
        height: "1,70",
        description: "Ricardo é bala"
    },
    {
        name: "Victoria",
        years: 32,
        breed: "Slime",
        sex: "Feminino",
        height: "1,65",
        description: "Victoria é pika"
    },
    {
        name: "Mirela",
        years: 3,
        breed: "Lobo",
        sex: "Feminino",
        height: "0,50",
        description: "Mirela é foda "
    },
];

// INSERINDO RESULTADOS NA TABELA 
const refreshTable = () =>{
    let table = document.getElementById('mainTable')
    table.innerHTML = "";
    characters.forEach((character, i) => {
        let row = generateTableRow(i, character);
        table.insertAdjacentHTML('beforeend', row)
    })
};

// CADASTRO DOS PERSONAGENS - BOTÃO INSERIR/CADASTRA
const init = () => refreshTable();
init();
document.getElementById('btnFinishCharacter').addEventListener('click', e =>{
    e.preventDefault();

    let inputName = document.getElementById("inputName");
    let inputYears = document.getElementById("inputYears");
    let inputSex = document.getElementById("inputSex");
    let inputBreed = document.getElementById("inputBreed");
    let inputHeight = document.getElementById("inputHeight");
    let inputDesc = document.getElementById("inputDesc");
    let character = {
        name: inputName.value,
        years: parseInt(inputYears.value),
        sex: inputSex.value,
        breed: inputBreed.value,
        height: inputHeight.value,
        description: inputDesc.value
    };
    document.getElementById("formInsert").reset(); 
    
   /*  let errors = [];
    character.forEach(field => {
        if(!field){
            console.log("null");
        }
    }); */
    characters.push(character);
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
    characters = characters.filter((data, i) => i !== index);
    refreshTable();
}); 

// IMPORTANDO JSON - BOTÃO IMPORTAR
document.getElementById("btnImport").addEventListener("change", e =>{
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.readAsText(file);
    reader.onloadend = () => {
        let result = JSON.parse(reader.result);
        characters = result;
        refreshTable();
    };
});

// EXPORTANDO JSON - BOTÃO EXPORTAR
document.getElementById("btnExport").addEventListener("click", () =>{
    let element = document.getElementById("download");
    element.href = 
        "data:text/plain;charset=utf-8," + 
        encodeURIComponent(JSON.stringify(characters));
        element.setAttribute("download", "listadepersonagem.json");
    element.click();
});

// FILTRO

$(document).ready(function(){
    $("#filterCharacters").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      $("#mainTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        
      });
    });
});
