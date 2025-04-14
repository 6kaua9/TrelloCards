function criarQuadro() {
    const nomeQuadro = document.getElementById('nomeQuadro').value.trim();

    if (!nomeQuadro) {
        alert('Por favor, insira um nome para o quadro.');
        return;
    }

    // Recupera os quadros salvos no localStorage
    const quadrosSalvos = JSON.parse(localStorage.getItem('quadros')) || [];

    // Verifica se já existe um quadro com o mesmo nome
    const quadroExistente = quadrosSalvos.some(quadro => quadro.nome === nomeQuadro);
    if (quadroExistente) {
        alert('Já existe um quadro com esse nome. Por favor, escolha outro nome.');
        return;
    }

    const novoQuadro = document.getElementById('novoQuadro');
    novoQuadro.style.display = 'none';

    // Exibe o quadro
    const quadro = document.getElementById('QUADRO');
    quadro.style.display = 'flex';

    document.getElementById('telaInicial').style.display = 'none';

    // Atualiza o título do quadro
    document.querySelector('.tituloQuadro span').innerText = nomeQuadro;

    // Limpa o campo de entrada
    document.getElementById('nomeQuadro').value = '';

    // Garante que o botão "Adicionar Coluna" esteja presente
    const quadroContainer = document.querySelector('.quadro');
    quadroContainer.innerHTML = ''; // Limpa o conteúdo do quadro
    const addColunaButton = document.createElement('div');
    addColunaButton.className = 'adicionarC';
    addColunaButton.id = 'colunaBotao';
    addColunaButton.innerText = 'Adicionar coluna +';
    addColunaButton.onclick = addColuna;
    quadroContainer.appendChild(addColunaButton);
}

function botaoNovoQuadro(){
    const doc = document.getElementById("novoQuadro");

    const telaInicial = document.getElementById('telaInicial');

   
    telaInicial.style.display = 'none';

        if(doc.style.display === 'none'){
            doc.style.display = 'flex';
            console.log(" Visivel");
            
        } else if(doc.style.display === "flex"){
            doc.style.display = "none";
        
        }
}

function adicionarTask(botao){
    const coluna = botao.closest('.coluna'); // Encontra a coluna mais próxima do botão clicado
    const novaTask = document.createElement('div');
    novaTask.className = 'task';
    novaTask.innerHTML = `
        <div class="taskHead" contenteditable="true">Nova Task
        <span class="deleteTask" onclick="removerTask(this)">X</span>
        </div>
        <div class="taskBody" contenteditable="true">Descrição da nova task</div>
    `;
    coluna.querySelector('.colunaBody').insertBefore(novaTask, botao); // Insere a nova task antes do botão
}

function addColuna(){
    console.log("funcionando");
    const novaColuna = document.createElement("div");
    novaColuna.className = 'coluna';
    novaColuna.innerHTML =  `
    <div class="colunaHead"><h2 contenteditable="true">Nova Lista</h2>
    <span class="deleteColuna" onclick="removerColuna(this)">X</span>
    </div>
    <div class="colunaBody">
    <div class="adicionarTask" id="addTask" onclick="adicionarTask(this)">Adicionar Task</div>
    </div>`;
    document.getElementById('colunaBotao').insertAdjacentElement('beforebegin', novaColuna);
}

function verificarEnter(event) {
    if (event.key === "Enter") {
        criarQuadro(); // Chama a função criarQuadro ao pressionar Enter
    }
} 

function removerColuna(element) {
    // Remove a coluna correspondente
    const coluna = element.closest('.coluna');
    if (coluna) {
        coluna.remove();
    }

}

function removerTask(element) {
    // Remove a task correspondente
    const task = element.closest('.task');
    if (task) {
        task.remove();
    }

}

window.onload = function () {
    const savedBoardData = JSON.parse(localStorage.getItem('boardData')) || [];

    savedBoardData.forEach(colunaData => {
        const novaColuna = document.createElement('div');
        novaColuna.className = 'coluna';
        novaColuna.innerHTML = `
            <div class="colunaHead">
                <h2 contenteditable="true">${colunaData.columnTitle}</h2>
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
                <div class="taskHead" contenteditable="true">
                    ${task.title}
                    <span class="deleteTask" onclick="removerTask(this)">X</span>
                </div>
                <div class="taskBody" contenteditable="true">${task.description}</div>
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

function salvarQuadro() {
    // Captura o nome do quadro
    const nomeQuadro = document.querySelector('.tituloQuadro span').innerText.trim();

    // Captura todas as colunas e tasks
    const colunas = document.querySelectorAll('.coluna');
    const quadroData = {
        nome: nomeQuadro,
        colunas: []
    };

    colunas.forEach(coluna => {
        const colunaTitulo = coluna.querySelector('.colunaHead h2').innerText.trim();
        const tasks = coluna.querySelectorAll('.task');
        const colunaData = {
            titulo: colunaTitulo,
            tasks: []
        };

        tasks.forEach(task => {
            const taskTitulo = task.querySelector('.taskHead').innerText.trim();
            const taskDescricao = task.querySelector('.taskBody').innerText.trim();
            colunaData.tasks.push({
                titulo: taskTitulo,
                descricao: taskDescricao
            });
        });

        quadroData.colunas.push(colunaData);
    });

    // Recupera os quadros salvos no localStorage
    let quadrosSalvos = JSON.parse(localStorage.getItem('quadros')) || [];

    // Verifica se já existe um quadro com o mesmo nome
    const quadroExistenteIndex = quadrosSalvos.findIndex(quadro => quadro.nome === nomeQuadro);

    if (quadroExistenteIndex !== -1) {
        // Substitui o quadro existente
        quadrosSalvos[quadroExistenteIndex] = quadroData;
        alert('Quadro atualizado com sucesso!');
    } else {
        // Adiciona o novo quadro
        quadrosSalvos.push(quadroData);
        alert('Quadro salvo com sucesso!');
    }

    // Salva a lista atualizada no localStorage
    localStorage.setItem('quadros', JSON.stringify(quadrosSalvos));

    // Atualiza a lista de quadros no botão "Quadros"
    atualizarListaQuadros();
}

function atualizarListaQuadros() {
    const quadrosSalvos = JSON.parse(localStorage.getItem('quadros')) || [];
    const dropDownContent = document.querySelector('.dropDownContent');

    // Limpa a lista atual
    dropDownContent.innerHTML = '';

    // Adiciona cada quadro salvo a lista
    quadrosSalvos.forEach((quadro, index) => {
        const link = document.createElement('a');
        link.href = '#';
        link.innerText = quadro.nome;
        const nomeQuadro = document.querySelector('.tituloQuadro span').innerText.trim();
        link.onclick = () => carregarQuadro(index); 
        dropDownContent.appendChild(link);
    });
}

function carregarQuadro(index) {
    const quadrosSalvos = JSON.parse(localStorage.getItem('quadros')) || [];
    const quadro = quadrosSalvos[index];

    const telaInicial = document.getElementById('telaInicial');
    telaInicial.style.display = "none";

    // Atualiza o título do quadro
    document.querySelector('.tituloQuadro span').innerText = quadro.nome;

    // Limpa as colunas atuais
    const quadroContainer = document.querySelector('.quadro');
    quadroContainer.innerHTML = '';

    // Adiciona as colunas e tasks do quadro salvo
    quadro.colunas.forEach(coluna => {
        const novaColuna = document.createElement('div');
        novaColuna.className = 'coluna';
        novaColuna.innerHTML = `
            <div class="colunaHead">
                <h2 contenteditable="true">${coluna.titulo}</h2>
                <span class="deleteColuna" onclick="removerColuna(this)">X</span>
            </div>
            <div class="colunaBody"></div>
        `;

        const colunaBody = novaColuna.querySelector('.colunaBody');
        coluna.tasks.forEach(task => {
            const novaTask = document.createElement('div');
            novaTask.className = 'task';
            novaTask.innerHTML = `
                <div class="taskHead" contenteditable="true">${task.titulo}</div>
                <div class="taskBody" contenteditable="true">${task.descricao}</div>
            `;
            colunaBody.appendChild(novaTask);
        });

         // Adiciona o botão "Adicionar Task" dentro da coluna
         const addTaskButton = document.createElement('div');
         addTaskButton.className = 'adicionarTask';
         addTaskButton.innerText = 'Adicionar Task';
         addTaskButton.onclick = function () {
             adicionarTask(addTaskButton);
         };
         colunaBody.appendChild(addTaskButton);

        quadroContainer.appendChild(novaColuna);
    });

    // Adiciona o botão "Adicionar Coluna"
    const addColunaButton = document.createElement('div');
    addColunaButton.className = 'adicionarC';
    addColunaButton.id = 'colunaBotao';
    addColunaButton.innerText = 'Adicionar coluna +';
    addColunaButton.onclick = addColuna;
    quadroContainer.appendChild(addColunaButton);
    document.getElementById('QUADRO').style.display = 'flex';
}

window.onload = function () {
    atualizarListaQuadros();
};

function excluirQuadro() {
    // Exibe um alerta de confirmação
    const confirmacao = confirm('Tem certeza de que deseja excluir este quadro?');

    if (!confirmacao) {
        // Se o usuário cancelar, não faz nada
        return;
    }

    // Captura o nome do quadro atual
    const nomeQuadro = document.querySelector('.tituloQuadro span').innerText.trim();

    // Recupera os quadros salvos no localStorage
    let quadrosSalvos = JSON.parse(localStorage.getItem('quadros')) || [];
    quadrosSalvos = quadrosSalvos.filter(quadro => quadro.nome !== nomeQuadro);

    // Atualiza o localStorage com a nova lista de quadros
    localStorage.setItem('quadros', JSON.stringify(quadrosSalvos));

    // Atualiza a lista de quadros no menu "Quadros"
    atualizarListaQuadros();

    // Limpa o conteúdo do quadro atual
    const quadroContainer = document.querySelector('.quadro');
    quadroContainer.innerHTML = ''; // Limpa o conteúdo do quadro
    document.querySelector('.tituloQuadro span').innerText = '';

    // Oculta o quadro e exibe a tela inicial
    document.getElementById('QUADRO').style.display = 'none';
    document.getElementById('telaInicial').style.display = 'flex';

    alert('Quadro excluído com sucesso!');
}

function fecharQuadro() {
    // Oculta o quadro
    document.getElementById('QUADRO').style.display = 'none';

    // Exibe a tela inicial
    document.getElementById('telaInicial').style.display = 'flex';
}
