# TrelloCards

 Integrantes do grupo:
  - Kauã Gimenez Prestes
  - Kayan Moraes Brito
  - Guilherme Telles

Identificação do sistema:

Nosso sistema cujo o nome damos de Tralha possui as principais funcionalidades do website Trello para gerenciar projetos e fluxo de trabalho.

Aqui está a descrição das funcionalidades do sistema Tralha: 

1. Gerenciamento de Quadros
  Criar Quadros:
    O botão "Novo Quadro" permite criar novos quadros.
    O usuário pode atribuir um nome ao quadro.
  Salvar Quadros:
    Os quadros podem ser salvos no localStorage para persistência de dados.
    Quadros com o mesmo nome substituem os existentes.
  Excluir Quadros:
    O botão "Excluir Quadro" remove o quadro atual da lista e do localStorage.
    Um alerta de confirmação é exibido antes da exclusão.
  Carregar Quadros:
    Os quadros salvos são listados no menu "Quadros".
    O usuário pode selecionar um quadro para carregá-lo e visualizá-lo.
   
2. Gerenciamento de Colunas
  Adicionar Colunas:
    O botão "Adicionar Coluna +" permite criar novas colunas dentro de um quadro.
  Editar Colunas:
    Os títulos das colunas são editáveis diretamente no campo.
  Excluir Colunas:
    Cada coluna possui um botão "X" para removê-la.

3. Gerenciamento de Tarefas
  Adicionar Tarefas:
    O botão "Adicionar Task" permite criar novas tarefas dentro de uma coluna.
  Editar Tarefas:
    Os títulos e descrições das tarefas são editáveis diretamente no campo.
  Excluir Tarefas:
    Cada tarefa possui um botão "X" para removê-la.

4. Interface de Navegação
  Tela Inicial:
    Exibe uma mensagem de boas-vindas e o botão "Criar Novo Quadro".
  Navbar:
    Contém o botão "Novo Quadro" e o menu suspenso "Quadros" para acessar os quadros salvos.
  Fechar Quadro:
    Um botão "X" no canto superior direito do quadro permite fechá-lo e retornar à tela inicial.

5. Persistência de Dados
 - Os dados dos quadros, colunas e tarefas são armazenados no localStorage do navegador, garantindo que as informações sejam mantidas mesmo após o fechamento da página.
  Quando o usuário clica em "Salvar Quadro", os dados do quadro (nome, colunas e tarefas) são convertidos para JSON e armazenados no LocalStorage.
  Quando o usuário seleciona um quadro da lista, os dados são recuperados do LocalStorage e exibidos na interface.
  Quando o usuário clica em "Excluir Quadro", o quadro correspondente é identificado e removido do LocalStorage.

6.Personalização
- O usuário pode agora escolher uma cor tema para página clicando no ícone paleta de cores da navbar. O usuário também pode escolher uma cor para as listas e para os cards cards para uma melhor organização vizual em seus quadros.

7.Anexo de imagens
- Agora o usuário pode fazer uploads de imagens do seu computador para os cards que ficarão visiveis como miniaturas abaixo do conteúdo em texto dos cards, que podem ser vizualizadas em tela cheia ao clicar em cima.

