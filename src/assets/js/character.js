
// GERAR LINHA NA TABELA
const generateTableRow = (id, data) => {
    return `
        <tr onclick="selectRow(event)"  data-index="${id}">
            <td>${data.name}</td>
            <td>${data.years}</td>
            <td>${data.sex}</td>  
            <td>${data.breed}</td>          
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





let characters = [
    {
        name: "Pedro",
        years: 20,
        sex: "Masculino",
        breed: "Humano",
        height: "1,68",
        description: "Pedro tem cabelos loiros e olhos angulares."
    },
    {
        name: "Luiza",
        years: 12,
        sex: "Feminino",
        breed: "Sapo",
        height: "1,80",
        description: "Luiza não lava o pé poq n que"
    },
    {
        name: "Igor",
        years: 28,
        sex: "Masculino",
        breed: "Vampiro",
        height: "1,20",
        description: "Igor é um vampiro de cabelos brancos "
    }
];



// INSERINDO RESULTADOS NA TABELA 
const refreshTable = () =>{
    let table = document.getElementById('mainTable')
    table.innerHTML = "";
    characters.forEach((character, i) => {
        let row = generateTableRow(i, character);
        table.insertAdjacentHTML('beforeend', row);
    });

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



// LEVAR JSON PARA LISTA   
document.getElementById("btnTeste").addEventListener("click", e => {
    e.preventDefault();
    let rows = document.getElementsByClassName("table-active");
    if(!rows.length) {
        alert("Selecione um personagem para ver as informações");
        return false;
    }
    let list = parseInt(rows[0].getAttribute("data-index"));
    document.getElementById("resultName").innerHTML = characters[list].name
    document.getElementById("resultYears").innerHTML = characters[list].years
    document.getElementById("resultSex").innerHTML = characters[list].sex
    document.getElementById("resultBreed").innerHTML = characters[list].breed
    document.getElementById("resultHeight").innerHTML = characters[list].height
    document.getElementById("resultDesc").innerHTML = characters[list].description
});