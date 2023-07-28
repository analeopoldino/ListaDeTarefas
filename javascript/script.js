// Selecionando os elementos HTML pelo seletor de classe e armazenando-os em variáveis
const $buttonAdd = document.querySelector(".button-add-task");
const $inputTask = document.querySelector(".input-task");
const $listaCompleta = document.querySelector(".list-tasks");
const tasks = document.querySelectorAll('.task');

// Array que irá armazenar as tarefas
let minhaListaDeTarefas = [];

// Função para adicionar uma nova tarefa à lista
function adicionarNovaTarefa() {
    // Verifica se o input está vazio, se sim, mostra um alerta
    if ($inputTask.value === "") {
        alert("Não é possível adicionar uma tarefa vazia à lista. Tente novamente!");
    } else {
        // Adiciona a nova tarefa ao array minhaListaDeTarefas
        minhaListaDeTarefas.push({
            tarefa: $inputTask.value, // Conteúdo da tarefa
            concluida: false // Status de conclusão da tarefa (inicialmente definido como falso)
        });

        // Limpa o input de tarefa após a adição
        $inputTask.value = '';

        // Atualiza a lista de tarefas na interface
        mostrarTarefasNaLista();
    }
}

// Função para exibir as tarefas na lista na interface
function mostrarTarefasNaLista() {
    let novaLi = '';

    // Itera sobre a minhaListaDeTarefas e cria uma lista HTML com as tarefas
    minhaListaDeTarefas.forEach((tarefa, index) => {
        const isTextoLongo = tarefa.tarefa.length > 40; // Verifica se o texto da tarefa é longo
        const quebraLinhas = isTextoLongo ? tarefa.tarefa.split(/\r?\n/) : [tarefa.tarefa]; // Quebra o texto em linhas, se for longo

        let tarefaHTML = '';
        // Cria as tags <p> para cada linha da tarefa (se houver quebra de linha)
        quebraLinhas.forEach((linha) => {
            tarefaHTML += `<p class="task-text">${linha}</p><br>`;
        });

        // Cria a estrutura HTML para cada tarefa com botões de conclusão e remoção
        novaLi += `
      <li class="task ${tarefa.concluida && "done-task"}">
          <img src="imagens/check-circle.svg" alt="check icon" onclick="concluirTarefa(${index})">
          ${tarefaHTML}
          <img src="imagens/bin-delete-remove-trash.svg" alt="bin-lixeira icon" onclick="deletarTarefa(${index})">
      </li>
    `;
    });

    // Atualiza o conteúdo da lista de tarefas no HTML
    $listaCompleta.innerHTML = novaLi;

    // Redimensiona a altura das tarefas após atualizar a lista
    tasks.forEach((task) => {
        const taskText = task.querySelector('.task-text');
        const numLinhas = taskText.scrollHeight / parseFloat(getComputedStyle(taskText).lineHeight);
        task.style.height = `${numLinhas * parseFloat(getComputedStyle(taskText).lineHeight)}px`;
    });

    // Armazena a lista atualizada no LocalStorage para persistência de dados
    localStorage.setItem('lista', JSON.stringify(minhaListaDeTarefas));
}

// Função para concluir uma tarefa (altera o status de concluída)
function concluirTarefa(index) {
    minhaListaDeTarefas[index].concluida = !minhaListaDeTarefas[index].concluida; // Altera o status de concluída

    // Atualiza a lista de tarefas na interface
    mostrarTarefasNaLista();
}

// Função para deletar uma tarefa
function deletarTarefa(index) {
    minhaListaDeTarefas.splice(index, 1); // Remove a tarefa do array

    // Atualiza a lista de tarefas na interface
    mostrarTarefasNaLista();
}

// Função para recarregar as tarefas armazenadas no LocalStorage ao carregar a página
function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista'); // Obtém a lista do LocalStorage

    if (tarefasDoLocalStorage) {
        minhaListaDeTarefas = JSON.parse(tarefasDoLocalStorage); // Se existir, carrega as tarefas do LocalStorage para o array
    }

    // Exibe as tarefas na lista na interface
    mostrarTarefasNaLista();
}

// Chama a função para recarregar as tarefas ao carregar a página
recarregarTarefas();

// Adiciona um evento de clique para o botão de adicionar tarefa
$buttonAdd.addEventListener("click", adicionarNovaTarefa);

// Adicionando evento de tecla "Enter" no campo de entrada
$inputTask.addEventListener("keyup", function(tarefaAdicionadaComEnter) {
    // Verifica se a tecla pressionada é "Enter" (código 13)
    if (tarefaAdicionadaComEnter.key === "Enter") {
        tarefaAdicionadaComEnter.preventDefault();
        adicionarNovaTarefa();
    }
});

