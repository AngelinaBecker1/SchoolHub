document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario_logado"));

    if (!usuario || usuario.tipo !== "Professor") {
        if (usuario && usuario.tipo === "Aluno") {
            window.location.href = "aluno.html";
        } else {
            window.location.href = "login.html";
        }
        return;
    }

    const elemTotalTurmas = document.getElementById("totalTurmasProf");
    const elemMateriaProf = document.getElementById("materiaProf");

    if (elemTotalTurmas && usuario.turmas) {
        elemTotalTurmas.innerText = `${usuario.turmas.length} Turmas`;
    }
    if (elemMateriaProf && usuario.disciplina) {
        elemMateriaProf.innerText = usuario.disciplina;
    }

    const gridTurmas = document.querySelector(".turmas-grid");
    if (gridTurmas && usuario.turmas) {
        gridTurmas.innerHTML = "";

        usuario.turmas.forEach(turma => {
            const card = document.createElement("div");
            card.className = "turma-card";
            card.innerHTML = `
                <div class="turma-head">
                    <h4>${turma.nome}</h4>
                    <span class="materia-badge">${usuario.disciplina || 'Docente'}</span>
                </div>
                <p><i class="fa-solid fa-user"></i> ${turma.alunos} Alunos • Aulas: ${turma.dias}</p>
                <div class="turma-actions">
                    <button class="btn-action primary"><i class="fa-solid fa-clipboard-user"></i> Chamada</button>
                    <button class="btn-action secondary"><i class="fa-solid fa-file-pen"></i> Notas</button>
                </div>
            `;
            gridTurmas.appendChild(card);
        });
    }
});