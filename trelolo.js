function criarQuadro() {
    const nomeQuadro = document.getElementById('nomeQuadro').value.trim();

    if (!nomeQuadro) {
        alert('Por favor, insira um nome para o quadro.');
        return;''
    }

    // Recupera os quadros salvos no localStorage
    const quadrosSalvos = JSON.parse(localStorage.getItem('quadros')) || [];

    // Verifica se já existe um quadro com o mesmo nome
    const quadroExistente = quadrosSalvos.some(quadro => quadro.nome === nomeQuadro);
    if (quadroExistente) {
        alert('Já existe um quadro com esse nome. Por favor, escolha outro nome.');
        return;
    }

    //fecha popup e limpa input
    document.getElementById('nomeQuadro').value = '';
    const fechaQuadro = document.getElementById('novoQuadro');
    fechaQuadro.style.display = 'none';
    
    // Exibe o quadro
    const quadro = document.getElementById('QUADRO');
    quadro.style.display = 'flex';

    document.getElementById('telaInicial').style.display = 'none';

    // Atualiza o título do quadro
    document.querySelector('.tituloQuadro span').innerText = nomeQuadro;

    // Garante que o botão "Adicionar Coluna" esteja presente
    const quadroContainer = document.querySelector('.quadro');
    quadroContainer.innerHTML = `
    <div onclick="addColuna()" class="adicionarC" id="colunaBotao">
                Adicionar coluna + 
            </div>
    `; // Limpa se tiver conteudo salvo do ultimo quadro criado e adiciona botao adicionar coluna

}

function botaoNovoQuadro(){ //pop up
    const doc = document.getElementById("novoQuadro");

    const telaInicial = document.getElementById('telaInicial');

   
    telaInicial.style.display = 'none';

        if(doc.style.display === 'none'){
            doc.style.display = 'flex';
            
        } else if(doc.style.display === "flex"){
            doc.style.display = "none";
        }
}

function adicionarTask(botao){
    const coluna = botao.closest('.coluna'); // Encontra a coluna mais próxima do botão clicado
    const novaTask = document.createElement('div');
    novaTask.className = 'task';
    novaTask.draggable = 'true';
    novaTask.innerHTML = `
        <div class="taskHead" contenteditable="true"> Titulo task
        <button id="minimiza" class="minimiza" contenteditable="false" onclick="minimizarTask(this)">-</button>
            <button class="deleteTask" contenteditable="false" onclick="removerTask(this)">X</button>
        </div>
            <div class="taskBody" contenteditable="true">Descrição da nova task</div>
    `;
    coluna.querySelector('.colunaBody').insertBefore(novaTask, botao); // Insere a nova task antes do botão
}

function addColuna(){
    const novaColuna = document.createElement("div");
    novaColuna.className = 'coluna';
    novaColuna.innerHTML =  `
    <div class="colunaHead"><h2 contenteditable="true">Nova Lista</h2>
    <button id="minimiza" class="minimiza" contenteditable="false" onclick="minimizarLista(this)">-</button>
    <button class="deleteColuna" onclick="removerColuna(this)">X</button>
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
            const taskTitulo = task.querySelector('.taskHead').childNodes[0].nodeValue.trim();
            
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
                <button id="minimiza" class="minimiza" contenteditable="false" onclick="minimizarLista(this)">-</button>
                <button class="deleteColuna" onclick="removerColuna(this)">X</button>
            </div>
            <div class="colunaBody"></div>
        `;

        const colunaBody = novaColuna.querySelector('.colunaBody');
        coluna.tasks.forEach(task => {
            const novaTask = document.createElement('div');
            novaTask.className = 'task';
            novaTask.draggable = 'true';
            novaTask.innerHTML = `
            <div class="taskHead" contenteditable="true">${task.titulo}
            <button class="deleteTask" onclick="removerTask(this)">X</button>
            <button id="minimiza" class="minimiza" contenteditable="false" onclick="minimizarTask(this)">-</button>
            </div>
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

}

//a fazer
function minimizarTask(botao) {
    const corpo = botao.closest('.task').querySelector('.taskBody'); // Garante que está acessando o taskBody correto
    const estiloCorpo = window.getComputedStyle(corpo).display; // Obtém o estilo computado

    if (estiloCorpo !== 'none') {
        corpo.style.display = 'none'; // Oculta o corpo da task
    } else {
        corpo.style.display = 'block'; // Mostra o corpo da task
    }
}

function minimizarLista(botao){
    const lista = botao.closest('.coluna').querySelector('.colunaBody');
    const estilo = window.getComputedStyle(lista).display;

    if(estilo !== 'none'){
        lista.style.display = 'none';
    }else{
        lista.style.display = 'block';
    }
}

/* drag and drop ideia 1;
const boxes = document.querySelectorAll('.colunaBody'),
 image = document.querySelector(".task");

 boxes.forEach((box) => {
    box.addEventListener('dragover', e=>{
        e.preventDefault();
        console.log("dragover");
    });
    box.addEventListener('drop', () => {
        box.appendChild(image);
        console.log("drop");
    })
 });*/ 

 

// Adiciona eventos de drag and drop para cada task

document.addEventListener('DOMContentLoaded', () => {
    const quadro = document.querySelector('.quadro'); // Elemento pai que contém as colunas
    let draggedTask = null; // Armazena a task que está sendo arrastada
    let placeholder = document.createElement('div'); // Placeholder para indicar a posição
    placeholder.className = 'placeholder'; // Classe para estilizar o placeholder

    // Delegação de eventos para dragstart
    quadro.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('task')) {
            console.log("dragstart");
            draggedTask = e.target; // Armazena a task que está sendo arrastada
            draggedTask.classList.add('dragging'); // Adiciona uma classe para estilizar a task arrastada
            setTimeout(() => draggedTask.style.display = 'none', 0); // Oculta a task enquanto é arrastada
        }
    });

    // Delegação de eventos para dragend
    quadro.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('task')) {
            draggedTask.style.display = 'block'; // Mostra a task novamente
            draggedTask.classList.remove('dragging'); // Remove a classe de estilização
            draggedTask = null; // Limpa a referência da task arrastada
            if (placeholder.parentNode) {
                placeholder.parentNode.removeChild(placeholder); // Remove o placeholder
            }
        }
    });

    // Delegação de eventos para dragover
    quadro.addEventListener('dragover', (e) => {
        e.preventDefault(); // Permite o drop
        if (e.target.classList.contains('colunaBody')) {
            console.log("dragover");
            const afterElement = getDragAfterElement(e.target, e.clientY); // Obtém o elemento após o qual o placeholder será inserido
            if (afterElement == null) {
                e.target.appendChild(placeholder); // Adiciona o placeholder no final da coluna
            } else {
                e.target.insertBefore(placeholder, afterElement); // Adiciona o placeholder antes do elemento encontrado
            }
        }
    });

    // Delegação de eventos para drop
    quadro.addEventListener('drop', (e) => {
        if (e.target.classList.contains('colunaBody')) {
            if (placeholder.parentNode) {
                placeholder.parentNode.replaceChild(draggedTask, placeholder); // Substitui o placeholder pela task arrastada
            }
        }
    });

    // Função para obter o elemento após o qual o placeholder será inserido
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2; // Calcula a distância do mouse ao centro do elemento
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});
