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
        <div class="taskHead">
            <div class="taskTitle" contenteditable="true">Titulo task</div>
            <div class="taskActions">
                <button id="minimiza" class="minimiza" contenteditable="false" onclick="minimizarTask(this)">-</button>
                <button class="deleteTask" contenteditable="false" onclick="removerTask(this)">X</button>
            </div>
        </div>
        <div class="taskBody">
            <div class="taskDescription" contenteditable="true">Descrição da nova task</div>
            <div class="taskActions">
                <img onclick="abrirPaletaCard(this)" class="paletaCard" src="paleta.png">
            </div>
        </div>
    `;
    coluna.querySelector('.colunaBody').insertBefore(novaTask, botao); // Insere a nova task antes do botão
    novaTask.querySelector('.taskTitle').addEventListener('input', salvarQuadro);
novaTask.querySelector('.taskDescription').addEventListener('input', salvarQuadro);
    salvarQuadro()
}

function addColuna(){
    const novaColuna = document.createElement("div");
    novaColuna.className = 'coluna';
    novaColuna.innerHTML =  `
            <div class="colunaHead">
                <div class="colunaHeadTop">
                    <img onclick="abrirPaleta(this)" class="paleta" src="paleta.png">
                    <button id="minimiza" class="minimiza" contenteditable="false" onclick="minimizarLista(this)">-</button>
                    <button class="deleteColuna" onclick="removerColuna(this)">X</button>
                </div>
                <h2 contenteditable="true">Nova Lista</h2>
            </div>
    <div class="colunaBody">
    <div class="adicionarTask" id="addTask" onclick="adicionarTask(this)">Adicionar Task</div>
    </div>`;
    document.getElementById('colunaBotao').insertAdjacentElement('beforebegin', novaColuna);
    novaColuna.querySelector('h2[contenteditable="true"]').addEventListener('input', salvarQuadro);
    salvarQuadro()
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
    salvarQuadro()

}

function removerTask(element) {
    // Remove a task correspondente
    const task = element.closest('.task');
    if (task) {
        task.remove();
    }
    salvarQuadro()

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
        // Salva as cores atuais da coluna
        const colunaHead = coluna.querySelector('.colunaHead');
        const colunaBody = coluna.querySelector('.colunaBody');
        const colunaHeadColor = colunaHead ? colunaHead.style.backgroundColor : '';
        const colunaBodyColor = colunaBody ? colunaBody.style.backgroundColor : '';
        const tasks = coluna.querySelectorAll('.task');
        const colunaData = {
            titulo: colunaTitulo,
            headColor: colunaHeadColor,
            bodyColor: colunaBodyColor,
            tasks: []
        };

        tasks.forEach(task => {
            // Busca o texto apenas das divs editáveis
            const taskTitulo = task.querySelector('.taskTitle').innerText.trim();
            const taskDescricao = task.querySelector('.taskDescription').innerText.trim();
            // Salva as cores atuais da task
            const taskHead = task.querySelector('.taskHead');
            const taskBody = task.querySelector('.taskBody');
            const taskHeadColor = taskHead ? taskHead.style.backgroundColor : '';
            const taskBodyColor = taskBody ? taskBody.style.backgroundColor : '';
            colunaData.tasks.push({
                titulo: taskTitulo,
                descricao: taskDescricao,
                headColor: taskHeadColor,
                bodyColor: taskBodyColor
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
    
    } else {
        // Adiciona o novo quadro
        quadrosSalvos.push(quadroData);
    
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
        novaColuna.draggable = 'true';
        novaColuna.innerHTML = `
            <div class="colunaHead">
                <div class="colunaHeadTop">
                    <img onclick="abrirPaleta(this)" class="paleta" src="paleta.png">
                    <button id="minimiza" class="minimiza" contenteditable="false" onclick="minimizarLista(this)">-</button>
                    <button class="deleteColuna" onclick="removerColuna(this)">X</button>
                </div>
                <h2 contenteditable="true">${coluna.titulo}</h2>
            </div>
            <div class="colunaBody"></div>
        `;
        // Aplica as cores salvas na coluna
        if (coluna.headColor) {
            novaColuna.querySelector('.colunaHead').style.backgroundColor = coluna.headColor;
        }
        if (coluna.bodyColor) {
            novaColuna.querySelector('.colunaBody').style.backgroundColor = coluna.bodyColor;
        }

        novaColuna.querySelector('h2[contenteditable="true"]').addEventListener('input', salvarQuadro);

        const colunaBody = novaColuna.querySelector('.colunaBody');
        coluna.tasks.forEach(task => {
            const novaTask = document.createElement('div');
            novaTask.className = 'task';
            novaTask.draggable = 'true';
            novaTask.innerHTML = `
                <div class="taskHead">
                    <div class="taskTitle" contenteditable="true">${task.titulo}</div>
                    <div class="taskActions">
                        <button class="minimiza" id="minimiza" contenteditable="false" onclick="minimizarTask(this)">-</button>
                        <button class="deleteTask" contenteditable="false" onclick="removerTask(this)">X</button>
                    </div>
                </div>
                <div class="taskBody">
                    <div class="taskDescription" contenteditable="true">${task.descricao}</div>
                    <div class="taskActions">
                        <img onclick="abrirPaletaCard(this)" class="paletaCard" src="paleta.png">
                    </div>
                </div>
            `;
            // Aplica as cores salvas na task
            if (task.headColor) {
                novaTask.querySelector('.taskHead').style.backgroundColor = task.headColor;
            }
            if (task.bodyColor) {
                novaTask.querySelector('.taskBody').style.backgroundColor = task.bodyColor;
            }
            novaTask.querySelector('.taskTitle').addEventListener('input', salvarQuadro);
            novaTask.querySelector('.taskDescription').addEventListener('input', salvarQuadro);
            
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
    const task = botao.closest('.task');
    if (!task) return;
    const corpo = task.querySelector('.taskBody');
    if (!corpo) return;
    const estiloCorpo = window.getComputedStyle(corpo).display;
    if (estiloCorpo !== 'none') {
        corpo.style.display = 'none';
    } else {
        corpo.style.display = 'block'; // Garante que o layout flex seja restaurado
    }
}

function minimizarLista(botao){
    const coluna = botao.closest('.coluna');
    if (!coluna) return;
    const lista = coluna.querySelector('.colunaBody');
    if (!lista) return;
    const estilo = window.getComputedStyle(lista).display;
    if(estilo !== 'none'){
        lista.style.display = 'none';
    }else{
        lista.style.display = 'block'; // block funciona para colunaBody
    }
}

//personalizacao cores
// Variável global para saber se estamos alterando coluna ou task
window.colunaSelecionada = null;
window.taskSelecionada = null;
window.temaSelecionado = false;
window.temaCor = {
    navbar: '',
    page: '',
    quadro: ''
};

function aplicarTema(corTema) {
    // navbar: cor forte (head das colunas/tasks)
    // page: cor body da coluna
    // quadro: cor body da task
    if (corTema) {
        if (corTema.navbar) {
            document.querySelector('.navbar').style.backgroundColor = corTema.navbar;
        }
        if (corTema.page) {
            document.body.style.backgroundColor = corTema.page;
            // Aplica também na dropDownContent e novoQuadro
            const dropDownContent = document.querySelector('.dropDownContent');
            if (dropDownContent) dropDownContent.style.backgroundColor = corTema.page;
            const novoQuadro = document.querySelector('.novoQuadro');
            if (novoQuadro) novoQuadro.style.backgroundColor = corTema.page;
            const novoQuadroHead = document.querySelector('.novoQuadroHead');
            if(novoQuadroHead) novoQuadroHead.style.backgroundColor = 'transparent';
        }
        if (corTema.quadro) {
            const quadro = document.querySelector('.quadro');
            if (quadro) quadro.style.backgroundColor = corTema.quadro;
        }
    }
}

function abrirPaleta(colunaBtn) {
    window.colunaSelecionada = null;
    window.taskSelecionada = null;
    window.temaSelecionado = false;
    if (colunaBtn) {
        window.colunaSelecionada = colunaBtn.closest('.coluna');
    }
    const quadroPaleta = document.getElementById('quadroPaleta');
    if (quadroPaleta.style.display === 'block') {
        quadroPaleta.style.display = 'none';
    } else {
        quadroPaleta.style.display = 'block';
    }
}

function abrirPaletaCard(img) {
    window.colunaSelecionada = null;
    window.taskSelecionada = null;
    window.temaSelecionado = false;
    if (img) {
        window.taskSelecionada = img.closest('.task');
    }
    const quadroPaleta = document.getElementById('quadroPaleta');
    quadroPaleta.style.display = 'block';
}

function abrirPaletaTema() {
    document.getElementById('telaInicial').style.display = 'none';
    window.colunaSelecionada = null;
    window.taskSelecionada = null;
    window.temaSelecionado = true;
    const quadroPaleta = document.getElementById('quadroPaleta');
    quadroPaleta.style.display = 'block';
}

// Adiciona o event listener para as cores da paleta
window.addEventListener('DOMContentLoaded', function() {
    const quadroPaleta = document.getElementById('quadroPaleta');
    if (!quadroPaleta) return;
    quadroPaleta.querySelectorAll('.bloco-cor').forEach(function(bloco) {
        bloco.onclick = function() {
            // Tema geral
            if (window.temaSelecionado) {
                let corTema = {navbar: '', page: '', quadro: ''};
                switch (true) {
                    case bloco.classList.contains('cor1'):
                        corTema = {navbar: '#9c0101', page: '#e30202', quadro: '#FF3B76'}; break; // vermelho
                    case bloco.classList.contains('cor2'):
                        corTema = {navbar: '#cb9412', page: '#FFD63A', quadro: '#FFDE61'}; break; // amarelo
                    case bloco.classList.contains('cor3'):
                        corTema = {navbar: '#0A2647', page: '#144272', quadro: '#88B0D3'}; break; // azul
                    case bloco.classList.contains('cor4'):
                        corTema = {navbar: '#0d682f', page: '#48bf53', quadro: '#7ed286'}; break; // verde
                    case bloco.classList.contains('cor5'):
                        corTema = {navbar: '#cc6500', page: '#ffa64e', quadro: '#ffc083'}; break; // laranja
                    case bloco.classList.contains('cor6'):
                        corTema = {navbar: '#690e91', page: '#bb44f0', quadro: '#cf7cf4'}; break; // roxo
                    case bloco.classList.contains('cor7'):
                        corTema = {navbar: '#cc3984', page: '#ff77bc', quadro: '#ff9fd0'}; break; // rosa
                    case bloco.classList.contains('cor8'):
                        corTema = {navbar: '#595959', page: '#9a9a9a', quadro: '#b8b8b8'}; break; // cinza
                }
                window.temaCor = corTema;
                aplicarTema(corTema);
                quadroPaleta.style.display = 'none';
                window.temaSelecionado = false;
            }
            // Se for coluna
            if (window.colunaSelecionada) {
                let corHead = '', corBody = '';
                switch (true) {
                    case bloco.classList.contains('cor1'):
                        corHead = '#9c0101'; corBody = '#e30202'; break; // vermelho
                    case bloco.classList.contains('cor2'):
                        corHead = '#FEBA17'; corBody = '#FFD63A'; break; // amarelo
                    case bloco.classList.contains('cor3'):
                        corHead = '#144272'; corBody = '#2C74B3'; break; // azul
                    case bloco.classList.contains('cor4'):
                        corHead = '#11823b'; corBody = '#48bf53'; break; // verde
                    case bloco.classList.contains('cor5'):
                        corHead = '#ff7f00'; corBody = '#ffa64e'; break; // laranja
                    case bloco.classList.contains('cor6'):
                        corHead = '#9614d0'; corBody = '#bb44f0'; break; // roxo
                    case bloco.classList.contains('cor7'):
                        corHead = '#ff48a5'; corBody = '#ff77bc'; break; // rosa
                    case bloco.classList.contains('cor8'):
                        corHead = '#707070'; corBody = '#9a9a9a'; break; // cinza
                }
                if (corHead && corBody) {
                    window.colunaSelecionada.querySelector('.colunaHead').style.backgroundColor = corHead;
                    window.colunaSelecionada.querySelector('.colunaBody').style.backgroundColor = corBody;
                }
                salvarQuadro()
                quadroPaleta.style.display = 'none';
            }
            // Se for task
            if (window.taskSelecionada) {
                let corHead = '', corBody = '';
                switch (true) {
                    case bloco.classList.contains('cor1'):
                        corHead = '#9c0101'; corBody = '#ff0000'; break; // vermelho
                    case bloco.classList.contains('cor2'):
                        corHead = '#FEBA17'; corBody = '#FFDE61'; break; // amarelo
                    case bloco.classList.contains('cor3'):
                        corHead = '#144272'; corBody = '#406fa1'; break; // azul
                    case bloco.classList.contains('cor4'):
                        corHead = '#11823b'; corBody = '#7ed286'; break; // verde
                    case bloco.classList.contains('cor5'):
                        corHead = '#ff7f00'; corBody = '#ffc083'; break; // laranja
                    case bloco.classList.contains('cor6'):
                        corHead = '#9614d0'; corBody = '#cf7cf4'; break; // roxo
                    case bloco.classList.contains('cor7'):
                        corHead = '#ff48a5'; corBody = '#ff9fd0'; break; // rosa
                    case bloco.classList.contains('cor8'):
                        corHead = '#707070'; corBody = '#b8b8b8'; break; // cinza
                }
                if (corHead && corBody) {
                    window.taskSelecionada.querySelector('.taskHead').style.backgroundColor = corHead;
                    window.taskSelecionada.querySelector('.taskBody').style.backgroundColor = corBody;
                }
                salvarQuadro()
                quadroPaleta.style.display = 'none';
            }
        };
    });
//sono
    // Adiciona o evento ao ícone da navbar
    const paletaTralha = document.querySelector('.paletaTralha');
    if (paletaTralha) {
        paletaTralha.onclick = abrirPaletaTema;
    }
});
