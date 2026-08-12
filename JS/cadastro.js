document.addEventListener("DOMContentLoaded", () => {
    carregarAlunosCadastrados();

    const form = document.getElementById("formCadastro");
    if (form) {
        form.addEventListener("submit", cadastrarAluno);
    }
});

function cadastrarAluno(e) {
    e.preventDefault();

    const nome = document.getElementById("nomeAluno").value;
    const turma = document.getElementById("turma").value;
    const email = document.getElementById("emailResponsavel").value;
    const status = document.getElementById("statusCadastro");

    const novoAluno = { nome, turma, email };

    let lista = JSON.parse(localStorage.getItem("alunos_cadastrados")) || [];
    lista.push(novoAluno);

    localStorage.setItem("alunos_cadastrados", JSON.stringify(lista));

    status.className = "status-msg sucesso";
    status.innerText = "Aluno cadastrado com sucesso!";

    document.getElementById("formCadastro").reset();
    carregarAlunosCadastrados();
}

function carregarAlunosCadastrados() {
    const container = document.getElementById("listaAlunosContainer");
    let lista = JSON.parse(localStorage.getItem("alunos_cadastrados")) || [];

    if (lista.length === 0) {
        container.innerHTML = `<li class="empty-msg">Nenhum aluno cadastrado no momento.</li>`;
        return;
    }

    container.innerHTML = lista.map(aluno => `
        <li>
            <strong>${aluno.nome}</strong> 
            <span>${aluno.turma} (${aluno.email})</span>
        </li>
    `).join('');
}