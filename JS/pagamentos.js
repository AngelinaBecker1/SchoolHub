document.addEventListener("DOMContentLoaded", () => {
    carregarValorTotal();
    carregarHistorico();
});

function carregarValorTotal() {
    const faturas = JSON.parse(localStorage.getItem("carrinho_mensalidades")) || [];
    const total = faturas.reduce((acc, f) => acc + f.valor, 0);

    const display = document.getElementById("displayValorTotal");
    if (display) {
        display.innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
}

function confirmarPagamento() {
    const faturas = JSON.parse(localStorage.getItem("carrinho_mensalidades")) || [];
    const statusMsg = document.getElementById("mensagemPagamento");

    if (faturas.length === 0) {
        alert("Não existem faturas pendentes para pagamento!");
        return;
    }

    const total = faturas.reduce((acc, f) => acc + f.valor, 0);
    const metodo = document.querySelector('input[name="metodo"]:checked').value;

    const novoPagamento = {
        data: new Date().toLocaleDateString("pt-BR"),
        valor: total,
        metodo: metodo,
        qtdItens: faturas.length
    };

    let historico = JSON.parse(localStorage.getItem("historico_pagamentos")) || [];
    historico.push(novoPagamento);
    localStorage.setItem("historico_pagamentos", JSON.stringify(historico));

    localStorage.removeItem("carrinho_mensalidades");

    statusMsg.className = "status-msg sucesso";
    statusMsg.innerText = "✅ Pagamento confirmado e registrado com sucesso!";

    carregarValorTotal();
    carregarHistorico();
}

function carregarHistorico() {
    const container = document.getElementById("listaHistorico");
    const historico = JSON.parse(localStorage.getItem("historico_pagamentos")) || [];

    if (historico.length === 0) {
        container.innerHTML = `<li class="empty-msg">Nenhum pagamento registrado até o momento.</li>`;
        return;
    }

    container.innerHTML = historico.map(p => `
        <li>
            <span>📅 ${p.data} - ${p.metodo} (${p.qtdItens} item(ns))</span>
            <strong style="color:#166534">R$ ${p.valor.toFixed(2).replace(".", ",")}</strong>
        </li>
    `).join('');
}   