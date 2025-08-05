// Armazenar os agendamentos feitos
let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

// Elementos do DOM
const dataInput = document.getElementById("data");
const mensagemErro = document.getElementById("mensagemErro");

// Verifica se a data é de segunda à sexta (0 = domingo, 6 = sábado)
function dataEhDiaUtil(dataStr) {
  const dia = new Date(dataStr).getDay();
  return dia >= 1 && dia <= 5; // segunda (1) a sexta (5)
}

function verificarDisponibilidade(data, horario) {
  return !agendamentos.some(
    (agendamento) =>
      agendamento.data === data && agendamento.horario === horario
  );
}

// Verifica a data no momento que ela é selecionada
dataInput.addEventListener("change", () => {
  const data = dataInput.value;
  if (!dataEhDiaUtil(data)) {
    mensagemErro.textContent = "O Dentista só atende de segunda à sexta";
  } else {
    mensagemErro.textContent = "";
  }
});

document
  .getElementById("agendamentoForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const data = document.getElementById("data").value;
    const horario = document
      .querySelector(".horario-btn.selected")
      ?.getAttribute("data-time");

    // Verifica se é um dia útil
    if (!dataEhDiaUtil(data)) {
      mensagemErro.textContent = "O Dentista só atende de segunda à sexta";
      return;
    }

    // Verifica se horário foi selecionado
    if (!horario) {
      alert("Por favor, selecione um horário.");
      return;
    }

    // Verifica se data e horário já estão ocupados
    if (!verificarDisponibilidade(data, horario)) {
      mensagemErro.textContent = "Data e horário não disponível";
      return;
    }

    // Criar agendamento
    const agendamento = { nome, cpf, data, horario };
    agendamentos.push(agendamento);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    // Redirecionar para página de visualização
    window.location.href = "agendamentos.html";
  });

document.querySelectorAll(".horario-btn").forEach((button) => {
  button.addEventListener("click", function () {
    document
      .querySelectorAll(".horario-btn")
      .forEach((btn) => btn.classList.remove("selected"));
    this.classList.add("selected");
  });
});
