var qtdQuadros = 0;
var qtdListas = 0;

function criarQuadro(){
    const listas = JSON.parse(localStorage.getItem("listas")) || [];
    const nome = document.getElementById('nomeQuadro').value;
    const qtd = JSON.parse(localStorage.getItem("qtdQuadros")) || 0;  //Pega a quantidade de quadros salvas no LocalSotrage ou é 0;
    
    if(nome === ""){
        alert("A area não pode estar vazia");
        return;
    }

    for(let i = 0; i < listas.length; i++){
        if(listas[i].toString() === nome){
            alert("Já existe um quadro com este nome");
            return;
        }
    }
    listas.push(nome);
    localStorage.setItem("listas", JSON.stringify(listas));
    alert("Novo quadro criado");
    botaoNovoQuadro();
    mostrarQuadro(nome);
    qtdQuadros++;
}

function botaoNovoQuadro(){
    const doc = document.getElementById("novoQuadro");

        if(doc.style.display === 'none'){
            doc.style.display = 'flex';
            console.log(" Visivel");
            
        } else if(doc.style.display === "flex"){
            doc.style.display = "none";
        
        }
}

function mostrarQuadro(nome){
    const teste = document.getElementById('QUADRO');
    document.querySelector('.tituloQuadro').innerText = nome;
    teste.style.display = 'flex';

     // Remove a primeira coluna fixa do HTML
     const primeiraColuna = document.querySelector('#coluna');
     if (primeiraColuna) {
         primeiraColuna.remove();
     }
    
}

function adicionarTask(botao){
    const coluna = botao.closest('.coluna'); // Encontra a coluna mais próxima do botão clicado
    const novaTask = document.createElement('div');
    novaTask.className = 'task';
    novaTask.innerHTML = `
        <div class="taskHead" contenteditable="true">Nova Task</div>
        <div class="taskBody" contenteditable="true">Descrição da nova task</div>
    `;
    coluna.querySelector('.colunaBody').insertBefore(novaTask, botao); // Insere a nova task antes do botão
}

function addColuna(){
    console.log("funcionando");
    const novaColuna = document.createElement("div");
    novaColuna.className = 'coluna';
    novaColuna.innerHTML =  `
    <div class="colunaHead"><h2 contenteditable="true">Nova Lista</h2></div>
    <div class="colunaBody">
         <div class="task">
             <div class="taskHead" contenteditable="true">Nova Task</div>
             <div class="taskBody" contenteditable="true">Descrição da nova task</div>
         </div>
         <div class="adicionarTask" id="addTask" onclick="adicionarTask(this)">Adicionar Task</div>
    </div>`;
    qtdListas++;
    document.getElementById('colunaBotao').insertAdjacentElement('beforebegin', novaColuna);
}

function verificarEnter(event) {
    if (event.key === "Enter") {
        criarQuadro(); // Chama a função criarQuadro ao pressionar Enter
    }
} 
   