// Carregar agendamentos do localStorage
let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

// Exibir os agendamentos na lista
const listaAgendamentos = document.getElementById("listaAgendamentos");

agendamentos.forEach((agendamento) => {
  const li = document.createElement("li");
  li.innerHTML = `<span>${agendamento.nome}</span> - CPF: <span>${agendamento.cpf}</span> - Data: <span>${agendamento.data}</span> - Horário: <span>${agendamento.horario}</span>`;
  listaAgendamentos.appendChild(li);
});
