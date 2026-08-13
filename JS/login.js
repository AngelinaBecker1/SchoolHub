document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const emailInput = document.getElementById("loginEmail");
            const tipoSelect = document.getElementById("loginTipo");

            const email = emailInput ? emailInput.value.trim() : "";
            const tipo = tipoSelect ? tipoSelect.value : "Aluno";

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                alert("Por favor, digite um e-mail válido! Exemplo: nome@dominio.com");
                return;
            }

            let nomeExibicao = email.split("@")[0];
            nomeExibicao = nomeExibicao.charAt(0).toUpperCase() + nomeExibicao.slice(1);

            let dadosUsuario = {
                nome: nomeExibicao,
                tipo: tipo
            };

            if (tipo === "Aluno") {
                dadosUsuario.turma = "9º Ano - Ensino Fundamental";
                dadosUsuario.boletim = [
                    { materia: "Matemática", n1: 9.0, n2: 9.5, freq: "98%", status: "Aprovado" },
                    { materia: "Língua Portuguesa", n1: 8.5, n2: 9.0, freq: "96%", status: "Aprovado" },
                    { materia: "História", n1: 7.0, n2: 8.0, freq: "92%", status: "Aprovado" },
                    { materia: "Física", n1: 6.5, n2: 7.0, freq: "90%", status: "Atenção" },
                    { materia: "Química", n1: 8.0, n2: 8.5, freq: "96%", status: "Aprovado" }
                ];
            } else if (tipo === "Professor") {
                dadosUsuario.disciplina = "Matemática";
                dadosUsuario.turmas = [
                    { nome: "8º Ano A - Fundamental", alunos: 32, dias: "Ter / Qui" },
                    { nome: "9º Ano B - Fundamental", alunos: 30, dias: "Seg / Qua" }
                ];
            } else {
                dadosUsuario.alunoVinculado = "Lucas Silva";
                dadosUsuario.turma = "9º Ano - Ensino Fundamental";
            }

            localStorage.setItem("usuario_logado", JSON.stringify(dadosUsuario));

            if (tipo === "Aluno" || tipo === "Responsável") {
                window.location.href = "aluno.html";
            } else if (tipo === "Professor") {
                window.location.href = "professor.html";
            } else {
                window.location.href = "inicio.html";
            }
        });
    }
});