document.addEventListener("DOMContentLoaded", () => {
    carregarSolicitacoes();

    const form = document.getElementById("formRematricula");
    if (form) {
        form.addEventListener("submit", salvarSolicitacao);
    }
});

function salvarSolicitacao(e) {
    e.preventDefault();

    const nome = document.getElementById("nomeRematricula").value;
    const ano = document.getElementById("anoPretendido").value;
    const status = document.getElementById("statusEspera");

    const item = { nome, ano, data: new Date().toLocaleDateString("pt-BR") };

    let lista = JSON.parse(localStorage.getItem("solicitacoes_rematricula")) || [];
    lista.push(item);

    localStorage.setItem("solicitacoes_rematricula", JSON.stringify(lista));

    status.style.display = "block";
    status.innerText = "Solicitação salva com sucesso!";

    document.getElementById("formRematricula").reset();
    carregarSolicitacoes();
}

function carregarSolicitacoes() {
    const container = document.getElementById("minhasSolicitacoes");
    let lista = JSON.parse(localStorage.getItem("solicitacoes_rematricula")) || [];

    if (lista.length === 0) {
        container.innerHTML = "<li>Nenhuma solicitação gravada.</li>";
        return;
    }

    container.innerHTML = lista.map(s => `
        <li>🎓 <strong>${s.nome}</strong> - Ano: ${s.ano} (Enviado em: ${s.data})</li>
    `).join('');
}