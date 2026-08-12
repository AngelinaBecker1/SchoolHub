document.addEventListener("DOMContentLoaded", () => {
    carregarStatusUsuario();
});

function carregarStatusUsuario() {
    const userBadge = document.getElementById("userBadge");

    if (!userBadge) return;

    const usuarioSalvo = localStorage.getItem("usuario_logado");

    if (usuarioSalvo) {
        try {
            const usuario = JSON.parse(usuarioSalvo);
            const nomeExibicao = usuario.nome || usuario.email.split('@')[0];
            userBadge.innerHTML = `Aluno: <strong>${nomeExibicao}</strong>`;
        } catch (e) {
            console.error("Erro ao ler dados do utilizador:", e);
        }
    }
}