let faturasSelecionadas = [];

document.addEventListener("DOMContentLoaded", () => {
    const salvas = JSON.parse(localStorage.getItem("carrinho_mensalidades")) || [];
    faturasSelecionadas = salvas;
    atualizarResumo();
});

function adicionarFatura(id, descricao, valor) {
    if (faturasSelecionadas.some(f => f.id === id)) {
        alert("Esta fatura já foi adicionada ao seu resumo!");
        return;
    }

    faturasSelecionadas.push({ id, descricao, valor });
    salvarECarregar();
}

function removerFatura(id) {
    faturasSelecionadas = faturasSelecionadas.filter(f => f.id !== id);
    salvarECarregar();
}

function salvarECarregar() {
    localStorage.setItem("carrinho_mensalidades", JSON.stringify(faturasSelecionadas));
    atualizarResumo();
}

function atualizarResumo() {
    const listaUI = document.getElementById("listaFaturas");
    const totalUI = document.getElementById("valorTotal");

    if (faturasSelecionadas.length === 0) {
        listaUI.innerHTML = `<li class="empty-msg">Nenhuma fatura selecionada.</li>`;
        totalUI.innerText = "R$ 0,00";
        return;
    }

    let total = 0;
    listaUI.innerHTML = faturasSelecionadas.map(item => {
        total += item.valor;
        return `
            <li>
                <span>${item.descricao}</span>
                <strong>R$ ${item.valor.toFixed(2).replace(".", ",")} 
                    <button onclick="removerFatura(${item.id})" style="color:red; background:none; border:none; cursor:pointer; margin-left:8px;">✖</button>
                </strong>
            </li>
        `;
    }).join('');

    totalUI.innerText = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

function irParaPagamento() {
    if (faturasSelecionadas.length === 0) {
        alert("Adicione ao menos uma fatura antes de prosseguir!");
        return;
    }
    window.location.href = "pagamentos.html";
}