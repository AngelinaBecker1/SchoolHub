document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario_logado"));

    if (!usuario) {
        window.location.href = "login.html";
        return;
    }

    const badgeTurma = document.querySelector(".badge-turma");
    if (badgeTurma && usuario.turma) {
        badgeTurma.innerText = `Turma: ${usuario.turma}`;
    }

    const tabelaCorpo = document.querySelector(".data-table tbody");
    if (tabelaCorpo && usuario.boletim) {
        tabelaCorpo.innerHTML = "";

        usuario.boletim.forEach(item => {
            const classeStatus = item.status === "Aprovado" ? "ok" : "alert";
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${item.materia}</strong></td>
                <td>${item.n1}</td>
                <td>${item.n2}</td>
                <td>${item.freq}</td>
                <td><span class="status-pill ${classeStatus}">${item.status}</span></td>
            `;
            tabelaCorpo.appendChild(tr);
        });
    }
});