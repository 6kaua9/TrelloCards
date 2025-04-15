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



Pontos Negativos e positivos do sistema tralha:
O sistema Trellinho apresenta pontos positivos como uma interface simples e intuitiva, permitindo que os usuários criem, editem e excluam quadros, colunas e tarefas de forma dinâmica. A persistência de dados no localStorage garante que as informações sejam mantidas mesmo após o fechamento da página, e a organização com botões bem posicionados, como "Salvar", "Excluir" e "Fechar Quadro", facilita a navegação. Além disso, a flexibilidade para editar títulos e descrições diretamente no campo torna o sistema prático para gerenciar tarefas.

Por enquanto o sistema está limitado as funcionalidades já citadas acima mas em futuras atualizações do desenvolvimento do sistema iremos implementar funcionalidades como:
 -autenticação de usuários (mesmo que só para apresentação do sistema)
 -Arrastar e Soltar (drag-and-drop) para reorganizar colunas e tarefas de forma prática. 
 -Personalização, para permitir que o usuário mude a cor de fundo do quadro assim como a cor das listas e cards para melhor organização de seus projetos.


