// Drag and drop para tasks
document.addEventListener('DOMContentLoaded', () => {
    const quadro = document.querySelector('.quadro'); // Elemento pai que contém as colunas
    let draggedTask = null; // Armazena a task que está sendo arrastada
    let placeholder = document.createElement('div'); // Placeholder para indicar a posição
    placeholder.className = 'placeholder'; // Classe para estilizar o placeholder

    // Delegação de eventos para dragstart
    quadro.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('task')) {
            draggedTask = e.target;
            draggedTask.classList.add('dragging');
            setTimeout(() => draggedTask.style.display = 'none', 0);
        }
    });

    // Delegação de eventos para dragend
    quadro.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('task')) {
            if (draggedTask) {
                draggedTask.style.display = 'block';
                draggedTask.classList.remove('dragging');
                draggedTask = null;
            }
            if (placeholder.parentNode) {
                placeholder.parentNode.removeChild(placeholder);
            }
        }
    });

    // Delegação de eventos para dragover
    quadro.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (draggedTask && e.target.classList.contains('colunaBody')) {
            const afterElement = getDragAfterElement(e.target, e.clientY);
            const addTaskButton = e.target.querySelector('.adicionarTask');
            if (afterElement == null) {
                e.target.appendChild(placeholder);
                e.target.insertBefore(placeholder, addTaskButton);
            } else {
                e.target.insertBefore(placeholder, afterElement);
            }
        }
    });

    quadro.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedTask && (e.target.classList.contains('colunaBody') || e.target === placeholder)) {
            if (placeholder.parentNode) {
                placeholder.parentNode.replaceChild(draggedTask, placeholder);
            }
            if (draggedTask) {
                draggedTask.style.display = 'block';
                draggedTask.classList.remove('dragging');
                draggedTask = null;
            }
        }
    });

    // Função para obter o elemento após o qual o placeholder será inserido
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});

// Drag and drop para colunas
document.addEventListener('DOMContentLoaded', () => {
    const quadro = document.querySelector('.quadro'); // Elemento pai que contém as colunas
    let draggedColumn = null; // Armazena a coluna que está sendo arrastada
    let columnPlaceholder = document.createElement('div'); // Placeholder para indicar a posição da coluna
    columnPlaceholder.className = 'column-placeholder'; // Classe para estilizar o placeholder da coluna

    // Delegação de eventos para dragstart nas colunas
    quadro.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('coluna')) {
            draggedColumn = e.target;
            draggedColumn.classList.add('dragging');
            setTimeout(() => draggedColumn.style.display = 'none', 0);
        }
    });

    // Delegação de eventos para dragend nas colunas
    quadro.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('coluna')) {
            if (draggedColumn) {
                draggedColumn.style.display = 'flex';
                draggedColumn.classList.remove('dragging');
                draggedColumn = null;
            }
            if (columnPlaceholder.parentNode) {
                columnPlaceholder.parentNode.removeChild(columnPlaceholder);
            }
        }
    });

    // Delegação de eventos para dragover nas colunas
    quadro.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (draggedColumn) {
            const afterColumn = getDragAfterElementForColumns(quadro, e.clientX);
            const btnColuna = quadro.querySelector('.adicionarC');
            if (afterColumn == null) {
                quadro.insertBefore(columnPlaceholder, btnColuna);
            } else {
                quadro.insertBefore(columnPlaceholder, afterColumn);
            }
        }
    });

    // Delegação de eventos para drop nas colunas
    quadro.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedColumn && columnPlaceholder.parentNode) {
            columnPlaceholder.parentNode.replaceChild(draggedColumn, columnPlaceholder);
            if (draggedColumn) {
                draggedColumn.style.display = 'flex';
                draggedColumn.classList.remove('dragging');
                draggedColumn = null;
            }
        }
    });

    // Função para obter o elemento após o qual o placeholder será inserido (para colunas)
    function getDragAfterElementForColumns(container, x) {
        const draggableColumns = [...container.querySelectorAll('.coluna:not(.dragging)')];
        return draggableColumns.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});