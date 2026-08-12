document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault(); 

            const emailInput = document.getElementById("loginEmail");
            const tipoSelect = document.getElementById("loginTipo");
            const senhaInput = document.getElementById("loginSenha");

            const email = emailInput ? emailInput.value.trim() : "";
            const tipo = tipoSelect ? tipoSelect.value : "Aluno";
            const senha = senhaInput ? senhaInput.value.trim() : "";

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email) {
                alert("Por favor, informe o seu e-mail.");
                emailInput.focus();
                return;
            }

            if (!emailRegex.test(email)) {
                alert("Por favor, digite um e-mail válido! Exemplo: nome@dominio.com");
                emailInput.focus();
                return;
            }

            if (!senha) {
                alert("Por favor, digite sua senha.");
                senhaInput.focus();
                return;
            }

            let nomeExibicao = email.split("@")[0];
            nomeExibicao = nomeExibicao.charAt(0).toUpperCase() + nomeExibicao.slice(1);

            const dadosUsuario = {
                nome: nomeExibicao,
                tipo: tipo
            };

            localStorage.setItem("usuario_logado", JSON.stringify(dadosUsuario));

            window.location.href = "inicio.html";
        });
    }
});