document.addEventListener("DOMContentLoaded", () => {
    atualizarMenuUsuario();
});

function atualizarMenuUsuario() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const loginEstatico = navbar.querySelector(".btn-login-nav");
    if (loginEstatico && loginEstatico.parentElement === navbar) {
        loginEstatico.remove();
    }
    const badgeEstatico = navbar.querySelector("#userBadge");
    if (badgeEstatico && badgeEstatico.parentElement === navbar) {
        badgeEstatico.remove();
    }

    let areaUsuario = document.getElementById("areaUsuario");
    if (!areaUsuario) {
        areaUsuario = document.createElement("div");
        areaUsuario.id = "areaUsuario";
        navbar.appendChild(areaUsuario);
    }

    let usuarioLogado = null;
    try {
        usuarioLogado = JSON.parse(localStorage.getItem("usuario_logado"));
    } catch (e) {
        usuarioLogado = null;
    }
    if (usuarioLogado && usuarioLogado.nome && usuarioLogado.nome !== "undefined") {
        const nome = usuarioLogado.nome;
        const tipo = usuarioLogado.tipo || "Aluno";

        areaUsuario.innerHTML = `
            <div class="user-badge-logged">
                <i class="fa-solid fa-circle-user"></i>
                <div class="user-info">
                    <span class="user-name">${nome}</span>
                    <span class="user-role">${tipo}</span>
                </div>
                <button onclick="fazerLogout()" class="btn-logout" title="Sair da Conta">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        `;
    } else {
        areaUsuario.innerHTML = `
            <a href="login.html" class="btn-login-nav">
                <i class="fa-solid fa-user"></i> Entrar
            </a>
        `;
    }
}

function fazerLogout() {
    localStorage.removeItem("usuario_logado");
    atualizarMenuUsuario();
    window.location.href = "login.html";
}