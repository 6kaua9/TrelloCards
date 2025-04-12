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
        <div class="taskHead" contenteditable="true" oninput="saveData()">Nova Task
        <span class="deleteTask" onclick="remover(this)">X</span>
        </div>
        <div class="taskBody" contenteditable="true" oninput="saveData()">Descrição da nova task</div>
    `;
    coluna.querySelector('.colunaBody').insertBefore(novaTask, botao); // Insere a nova task antes do botão
}

function addColuna(){
    console.log("funcionando");
    const novaColuna = document.createElement("div");
    novaColuna.className = 'coluna';
    novaColuna.innerHTML =  `
    <div class="colunaHead"><h2 contenteditable="true" oninput="saveData()">Nova Lista</h2>
    <span class="deleteColuna" onclick="remover(this)">X</span>
    </div>
    <div class="colunaBody">
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

function remover(element) {
    // Remove a task correspondente
    const task = element.closest('.task');
    if (task) {
    task.remove();
    }

    const coluna = element.closest('.coluna'); // Encontra a coluna mais próxima da task removida
    if (coluna && !task){
        coluna.remove(); // Remove a coluna se não houver tasks restantes
    }

    // Atualiza o localStorage
    saveData();
}

function saveData() {
    // Seleciona todas as colunas existentes
    const colunas = document.querySelectorAll('.coluna');
    const boardData = [];

    // Itera sobre as colunas e coleta os dados
    colunas.forEach(coluna => {
        const colunaHead = coluna.querySelector('.colunaHead h2').innerText.trim();
        const tasks = [];
        const taskElements = coluna.querySelectorAll('.task');

        // Itera sobre as tasks dentro da coluna
        taskElements.forEach(task => {
            const taskHead = task.querySelector('.taskHead');
            const taskBody = task.querySelector('.taskBody').innerText.trim();
            const deleteButton = taskHead.querySelector('.deleteTask');
            if (deleteButton) deleteButton.remove();

            const taskHeadText = taskHead.innerText.trim();
            tasks.push({ title: taskHeadText, description: taskBody });

            if (deleteButton) taskHead.appendChild(deleteButton);
        });

        // Adiciona os dados da coluna ao array
        boardData.push({ columnTitle: colunaHead, tasks });
    });

    // Salva os dados no localStorage
    localStorage.setItem('boardData', JSON.stringify(boardData));
}
window.onload = function () {
    const savedBoardData = JSON.parse(localStorage.getItem('boardData')) || [];

    savedBoardData.forEach(colunaData => {
        const novaColuna = document.createElement('div');
        novaColuna.className = 'coluna';
        novaColuna.innerHTML = `
            <div class="colunaHead">
                <h2 contenteditable="true" oninput="saveData()">${colunaData.columnTitle}</h2>
                <span class="deleteColuna" onclick="remover(this)">X</span>
            </div>
            <div class="colunaBody"></div>
        `;

        const colunaBody = novaColuna.querySelector('.colunaBody');

        // Adiciona as tasks à coluna
        colunaData.tasks.forEach(task => {
            const novaTask = document.createElement('div');
            novaTask.className = 'task';
            novaTask.innerHTML = `
                <div class="taskHead" contenteditable="true" oninput="saveData()">
                    ${task.title}
                    <span class="deleteTask" onclick="remover(this)">X</span>
                </div>
                <div class="taskBody" contenteditable="true" oninput="saveData()">${task.description}</div>
            `;
            colunaBody.appendChild(novaTask);
        });

        // Cria o botão de adicionar task dinamicamente
        const addTaskButton = document.createElement('div');
        addTaskButton.className = 'adicionarTask';
        addTaskButton.textContent = 'Adicionar Task';
        addTaskButton.addEventListener('click', function () {
            adicionarTask(addTaskButton);
        });

        colunaBody.appendChild(addTaskButton);

        // Insere a nova coluna antes do botão de adicionar coluna
        document.getElementById('colunaBotao').insertAdjacentElement('beforebegin', novaColuna);
    });
};

   