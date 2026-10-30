document.addEventListener("DOMContentLoaded", function () {
  // Ano atual no rodapé
  document.getElementById("ano").textContent = new Date().getFullYear();

  // Perfil editável e salvo no localStorage
  const campoNome = document.getElementById("campoNome");
  const campoCargo = document.getElementById("campoCargo");
  const campoResumo = document.getElementById("campoResumo");
  const nomePerfil = document.getElementById("nomePerfil");
  const cargoPerfil = document.getElementById("cargoPerfil");
  const resumoPerfil = document.getElementById("resumoPerfil");
  const retornoPerfil = document.getElementById("retornoPerfil");

  function separarNome(nome) {
    const partes = nome.trim().split(/\s+/);
    if (partes.length > 1) {
      return `${partes.slice(0, -1).join(" ")} <span>${partes[partes.length - 1]}</span>`;
    }
    return `${nome} <span></span>`;
  }

  function aplicarPerfil(perfil) {
    nomePerfil.innerHTML = separarNome(perfil.nome);
    cargoPerfil.textContent = perfil.cargo;
    resumoPerfil.textContent = perfil.resumo;
    campoNome.value = perfil.nome;
    campoCargo.value = perfil.cargo;
    campoResumo.value = perfil.resumo;
  }

  let perfilSalvo = null;
  try {
    perfilSalvo = JSON.parse(localStorage.getItem("perfil"));
  } catch (e) {
    localStorage.removeItem("perfil");
  }

  const perfilInicial = {
    nome: "Manoel Neto",
    cargo: "Desenvolvedor Front-End",
    resumo: "Sou estudante de programação, apaixonado por tecnologia e desenvolvimento web. Busco criar páginas modernas, funcionais e responsivas."
  };

  aplicarPerfil(perfilSalvo && perfilSalvo.nome && perfilSalvo.cargo && perfilSalvo.resumo ? perfilSalvo : perfilInicial);

  document.getElementById("formPerfil").addEventListener("submit", function (event) {
    event.preventDefault();
    const perfil = {
      nome: campoNome.value.trim(),
      cargo: campoCargo.value.trim(),
      resumo: campoResumo.value.trim()
    };
    if (!perfil.nome || !perfil.cargo || !perfil.resumo) return;
    localStorage.setItem("perfil", JSON.stringify(perfil));
    aplicarPerfil(perfil);
    retornoPerfil.textContent = "Perfil salvo com sucesso!";
    retornoPerfil.className = "mt-2 mb-0 text-success";
  });

  // Tema escuro: mantém a preferência durante a sessão
  const botaoTema = document.getElementById("tema");
  function atualizarTema() {
    const escuro = document.body.classList.contains("dark");
    botaoTema.textContent = escuro ? "☀" : "☾";
    botaoTema.setAttribute("aria-label", escuro ? "Ativar tema claro" : "Ativar tema escuro");
    botaoTema.title = escuro ? "Tema claro" : "Tema escuro";
  }
  if (sessionStorage.getItem("tema") === "dark") document.body.classList.add("dark");
  atualizarTema();
  botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    sessionStorage.setItem("tema", document.body.classList.contains("dark") ? "dark" : "light");
    atualizarTema();
  });

  // Formulário de contato demonstrativo (não envia e-mail real)
  document.getElementById("formContato").addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("nomeContato").value.trim();
    const retorno = document.getElementById("retornoContato");
    retorno.textContent = `Obrigado, ${nome}! Seus campos foram preenchidos corretamente. O envio real precisa de um serviço de backend.`;
    retorno.className = "form-feedback mt-3 mb-0 text-success";
    this.reset();
  });

  // Cookie de última visita
  const cookieAnterior = document.cookie.split("; ").find(item => item.startsWith("ultimaVisita="));
  const visita = cookieAnterior ? decodeURIComponent(cookieAnterior.substring("ultimaVisita=".length)) : null;
  document.getElementById("visita").textContent = visita
    ? `Visita anterior registrada em ${visita}.`
    : "Bem-vindo(a)! Esta é sua primeira visita registrada.";
  document.cookie = "ultimaVisita=" + encodeURIComponent(new Date().toLocaleDateString("pt-BR")) +
    "; path=/; max-age=31536000; SameSite=Lax";

  // Destaca o link da seção visível (interação simples)
  const links = document.querySelectorAll(".navbar .nav-link");
  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
