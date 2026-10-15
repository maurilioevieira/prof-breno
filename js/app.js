/* =====================================================================
   APP.JS — o "motor" do site
   ---------------------------------------------------------------------
   Este arquivo NÃO precisa ser editado no dia a dia.
   Ele lê config.js e dados.js e monta as páginas automaticamente:
     • cabeçalho, faixa de aviso, rodapé e botão flutuante (todas as páginas);
     • página inicial  (index.html)   → montarInicio()
     • catálogo        (cursos.html)  → montarCatalogo()
     • página do curso (curso.html)   → montarDetalhe()

   Por que o cabeçalho e o rodapé são montados aqui, e não escritos em
   cada .html? Para que um ajuste no menu ou nos contatos seja feito
   uma vez só e valha para todas as páginas.
   ===================================================================== */

(function () {
  "use strict";

  var SITE = window.SITE || {};
  var CURSOS = (window.CURSOS || []).filter(function (c) { return c.exibir !== false; });
  var QUESTOES = window.QUESTOES || [];
  var DEPOIMENTOS = window.DEPOIMENTOS || [];
  var PERGUNTAS = window.PERGUNTAS || [];

  /* Nomes de cada tipo de curso (usados em selos, filtros e títulos). */
  var TIPOS = {
    pdf:    { selo: "PDF",       nome: "Materiais em PDF", singular: "material em PDF" },
    video:  { selo: "VIDEOAULA", nome: "Videoaulas",       singular: "curso em videoaulas" },
    aovivo: { selo: "AO VIVO",   nome: "Turmas ao vivo",   singular: "turma ao vivo" }
  };

  /* ---------------- Utilidades ---------------- */

  // Protege o HTML contra caracteres especiais vindos dos textos.
  function esc(texto) {
    return String(texto == null ? "" : texto)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // Monta o link do WhatsApp com a mensagem já escrita.
  function whats(mensagem) {
    return "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(mensagem || SITE.mensagemPadrao || "");
  }

  function mensagemDoCurso(c) {
    return c.mensagemWhatsApp || ("Olá, Prof. Breno! Vim pelo site e tenho interesse em: " + c.titulo + ".");
  }

  function parametro(nome) {
    return new URLSearchParams(window.location.search).get(nome);
  }

  function $(seletor) { return document.querySelector(seletor); }

  /* Ícones em SVG (desenhados em linha, sem arquivos extras). */
  var ICONE = {
    whats: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.2-.7-2.7-1.1-4.4-3.8-4.6-4-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.1.1.7-.1 1.3z"/></svg>',
    menu: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    fechar: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    check: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l4 4 10-10"/></svg>',
    youtube: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="#111"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9L15.5 12z"/></svg>',
    aspas: '<svg aria-hidden="true" viewBox="0 0 34 26"><path d="M0 26V14C0 5.5 5 1 13 0l1 5c-4.5 1-7 3.6-7 8h6v13zm20 0V14c0-8.5 5-13 13-14l1 5c-4.5 1-7 3.6-7 8h6v13z"/></svg>'
  };

  /* =================================================================
     PARTES COMUNS A TODAS AS PÁGINAS
     ================================================================= */

  function montarAviso() {
    var alvo = $("#aviso");
    var a = SITE.aviso || {};
    if (!alvo || !a.texto) { if (alvo) alvo.remove(); return; }
    alvo.className = "aviso";
    alvo.innerHTML =
      (a.etiqueta ? '<span class="aviso__etiqueta">' + esc(a.etiqueta) + "</span>" : "") +
      "<span>" + esc(a.texto) + "</span>" +
      (a.link ? '<a href="' + esc(a.link) + '">' + esc(a.textoLink || "Saiba mais") + "</a>" : "");
  }

  function montarCabecalho() {
    var alvo = $("#cabecalho");
    if (!alvo) return;
    var pagina = document.body.dataset.pagina;
    var tipo = parametro("tipo");
    function atual(cond) { return cond ? ' aria-current="page"' : ""; }

    alvo.className = "cabecalho";
    alvo.innerHTML =
      '<div class="container cabecalho__linha">' +
        '<a class="cabecalho__logo" href="index.html" aria-label="Curso Prof. Breno Bernardo, página inicial">' +
          '<img src="img/logo-clara.png" alt="Curso Prof. Breno Bernardo" width="100" height="56"></a>' +
        '<button class="menu-botao" type="button" aria-expanded="false" aria-controls="menu" aria-label="Abrir menu">' + ICONE.menu + "</button>" +
        '<nav class="menu" id="menu" aria-label="Principal">' +
          '<a href="index.html"' + atual(pagina === "inicio") + ">Início</a>" +
          '<a href="cursos.html"' + atual(pagina === "catalogo" && !tipo) + ">Todos os cursos</a>" +
          '<a href="cursos.html?tipo=pdf"' + atual(tipo === "pdf") + ">Materiais em PDF</a>" +
          '<a href="cursos.html?tipo=aovivo"' + atual(tipo === "aovivo") + ">Turmas ao vivo</a>" +
          '<a href="index.html#professor">O professor</a>' +
          '<a class="btn btn--amarelo btn--pequeno" href="' + whats() + '" target="_blank" rel="noopener">' + ICONE.whats + "Falar no WhatsApp</a>" +
        "</nav>" +
      "</div>";

    // Menu do celular: abre e fecha.
    var botao = alvo.querySelector(".menu-botao");
    var menu = alvo.querySelector(".menu");
    botao.addEventListener("click", function () {
      var aberto = menu.classList.toggle("aberto");
      botao.setAttribute("aria-expanded", aberto ? "true" : "false");
      botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
      botao.innerHTML = aberto ? ICONE.fechar : ICONE.menu;
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) { menu.classList.remove("aberto"); botao.setAttribute("aria-expanded", "false"); botao.innerHTML = ICONE.menu; }
    });
  }

  function montarRodape() {
    var alvo = $("#rodape");
    if (!alvo) return;
    var ano = new Date().getFullYear();
    alvo.className = "rodape";
    alvo.innerHTML =
      '<div class="container rodape__grade">' +
        '<div class="rodape__marca"><img src="img/logo-clara.png" alt="Curso Prof. Breno Bernardo" width="160" height="90">' +
          "<p>Preparatório para concursos com materiais esquematizados, questões comentadas e aulas online.</p></div>" +
        '<div class="rodape__coluna"><h3>Navegação</h3><ul>' +
          '<li><a href="cursos.html">Todos os cursos</a></li>' +
          '<li><a href="cursos.html?tipo=pdf">Materiais em PDF</a></li>' +
          '<li><a href="cursos.html?tipo=aovivo">Turmas ao vivo</a></li>' +
          '<li><a href="index.html#duvidas">Dúvidas frequentes</a></li>' +
        "</ul></div>" +
        '<div class="rodape__coluna"><h3>Contato</h3><ul>' +
          '<li><a class="rodape__whats" href="' + whats() + '" target="_blank" rel="noopener">WhatsApp: ' + esc(SITE.whatsappTexto) + "</a></li>" +
          (SITE.instagram ? '<li><a href="' + esc(SITE.instagram) + '" target="_blank" rel="noopener">Instagram</a></li>' : "") +
          (SITE.youtube ? '<li><a href="' + esc(SITE.youtube) + '" target="_blank" rel="noopener">YouTube</a></li>' : "") +
          "<li>Aulas 100% online</li>" +
        "</ul></div>" +
      "</div>" +
      '<div class="container rodape__base">' +
        "<span>© " + ano + " Curso Prof. Breno Bernardo. Todos os direitos reservados.</span>" +
        '<span>Site desenvolvido por <strong style="color:#F8BC04">Maurílio Vieira</strong></span>' +
      "</div>";

    // Botão flutuante do WhatsApp (todas as páginas).
    var flutuante = document.createElement("a");
    flutuante.className = "flutuante";
    flutuante.href = whats();
    flutuante.target = "_blank";
    flutuante.rel = "noopener";
    flutuante.setAttribute("aria-label", "Falar no WhatsApp com o Prof. Breno");
    flutuante.innerHTML = ICONE.whats;
    document.body.appendChild(flutuante);
  }

  /* =================================================================
     CARD DE CURSO (usado na página inicial e no catálogo)
     ================================================================= */

  function cardCurso(c) {
    var tipo = TIPOS[c.tipo] || TIPOS.pdf;
    var capa = (c.amostras && c.amostras.length) ? '<img src="' + esc(c.amostras[0]) + '" alt="" loading="lazy">' : "";
    var etiquetas = (c.etiquetas || []).map(function (e) { return '<span class="etiqueta">' + esc(e) + "</span>"; }).join("");
    return (
      '<article class="card">' +
        '<div class="card__capa">' + capa +
          '<span class="card__tipo">' + tipo.selo + "</span>" +
          '<div class="card__disciplina">' + esc(c.disciplina) + "</div>" +
        "</div>" +
        '<div class="card__corpo">' +
          '<h3><a href="curso.html?id=' + encodeURIComponent(c.id) + '">' + esc(c.titulo) + "</a></h3>" +
          '<p class="card__resumo">' + esc(c.resumo) + "</p>" +
          (etiquetas ? '<div class="etiquetas">' + etiquetas + "</div>" : "") +
          '<div class="card__rodape">' +
            '<span class="card__preco">' + esc(c.preco || "Consulte") + "</span>" +
            '<span class="card__ver" aria-hidden="true">Ver detalhes →</span>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  // Mensagem quando um filtro não tem cursos (ex.: nenhuma turma aberta).
  function cardVazio(tipo) {
    var nome = tipo && TIPOS[tipo] ? TIPOS[tipo].nome.toLowerCase() : "cursos";
    return (
      '<div class="vazio"><strong>Novas ' + esc(nome) + " em breve</strong>" +
      "Entre na lista de espera e seja avisado primeiro." +
      '<br><a class="btn btn--preto btn--pequeno" href="' + whats("Olá, Prof. Breno! Quero entrar na lista de espera de " + nome + ".") + '" target="_blank" rel="noopener">' + ICONE.whats + "Entrar na lista de espera</a></div>"
    );
  }

  // Liga os botões de filtro a uma lista de cards.
  function ligarFiltros(caixaFiltros, caixaLista, cursos, tipoInicial, aoMudar) {
    var opcoes = [["", "Todos"], ["pdf", "PDFs"], ["video", "Videoaulas"], ["aovivo", "Ao vivo"]];
    var atual = tipoInicial || "";

    function desenhar() {
      caixaFiltros.innerHTML = opcoes.map(function (o) {
        return '<button type="button" class="filtro" data-tipo="' + o[0] + '" aria-pressed="' + (o[0] === atual) + '">' + o[1] + "</button>";
      }).join("");
      var lista = cursos.filter(function (c) { return !atual || c.tipo === atual; });
      caixaLista.innerHTML = lista.length ? lista.map(cardCurso).join("") : cardVazio(atual);
    }
    caixaFiltros.addEventListener("click", function (e) {
      var b = e.target.closest(".filtro");
      if (!b) return;
      atual = b.dataset.tipo;
      desenhar();
      if (aoMudar) aoMudar(atual);
    });
    desenhar();
  }

  /* =================================================================
     PÁGINA INICIAL
     ================================================================= */

  function montarInicio() {
    // Cursos em destaque
    var destaques = CURSOS.filter(function (c) { return c.destaque; });
    ligarFiltros($("#filtros-destaque"), $("#lista-destaques"), destaques, "");

    // Botões "Qual é o seu concurso?"
    var caixaConc = $("#lista-concursos");
    if (caixaConc) {
      caixaConc.innerHTML = (SITE.concursos || []).map(function (nome) {
        return '<a class="chip-concurso" href="' + whats("Olá, Prof. Breno! Estou estudando para " + nome + ". Quais cursos você indica?") + '" target="_blank" rel="noopener">' + esc(nome) + "</a>";
      }).join("") +
      '<a class="chip-concurso chip-concurso--outro" href="' + whats("Olá, Prof. Breno! Quero ajuda para escolher meu concurso.") + '" target="_blank" rel="noopener">Outro concurso</a>';
    }

    montarQuestaoDoDia();
    montarProfessor();
    montarDepoimentos();
    montarPerguntas();

    var yt = $("#link-youtube");
    if (yt && SITE.youtube) yt.href = SITE.youtube; else if (yt) yt.closest("section").remove();
    document.querySelectorAll("[data-whats]").forEach(function (a) {
      a.href = whats(a.dataset.whats || undefined);
      a.target = "_blank"; a.rel = "noopener";
    });
  }

  // Escolhe uma questão por dia, em rodízio.
  function montarQuestaoDoDia() {
    var caixa = $("#questao");
    if (!caixa) return;
    if (!QUESTOES.length) { caixa.closest("section").remove(); return; }

    var hoje = new Date();
    var diaDoAno = Math.floor((hoje - new Date(hoje.getFullYear(), 0, 0)) / 86400000);
    var q = QUESTOES[diaDoAno % QUESTOES.length];
    var letras = Object.keys(q.alternativas);

    caixa.innerHTML =
      '<div class="questao__topo"><span class="questao__selo">QUESTÃO DO DIA</span>' +
        (q.banca ? '<span class="questao__banca">' + esc(q.banca) + "</span>" : "") +
        '<span class="questao__tema">' + esc(q.tema) + "</span></div>" +
      '<h2 class="questao__enunciado">' + esc(q.enunciado) + "</h2>" +
      '<div class="alternativas" role="group" aria-label="Alternativas">' +
        letras.map(function (l) {
          return '<button type="button" class="alternativa" data-letra="' + l + '">' +
            '<span class="alternativa__letra">' + l + "</span>" +
            '<span class="alternativa__texto">' + esc(q.alternativas[l]) + "</span>" +
            '<span class="alternativa__veredito"></span></button>';
        }).join("") +
      "</div>" +
      '<div id="questao-retorno" aria-live="polite"><p class="questao__dica">Escolha uma alternativa para ver o gabarito comentado.</p></div>';

    caixa.querySelector(".alternativas").addEventListener("click", function (e) {
      var b = e.target.closest(".alternativa");
      if (!b) return;
      var escolhida = b.dataset.letra;
      caixa.querySelectorAll(".alternativa").forEach(function (alt) {
        alt.disabled = true;
        var l = alt.dataset.letra;
        if (l === q.correta) { alt.classList.add("correta"); alt.querySelector(".alternativa__veredito").textContent = "CORRETA"; }
        else if (l === escolhida) { alt.classList.add("errada"); alt.querySelector(".alternativa__veredito").textContent = "SUA RESPOSTA"; }
      });
      var acertou = escolhida === q.correta;
      $("#questao-retorno").innerHTML =
        '<div class="questao__resposta"><p><strong>' + (acertou ? "Acertou! " : "Quase! ") + "Gabarito: " + esc(q.correta) + ".</strong> " + esc(q.comentario) + "</p>" +
        (q.link ? '<a class="btn btn--amarelo" href="' + esc(q.link) + '">Quero mais questões assim</a>' : "") + "</div>";
    });
  }

  function montarProfessor() {
    var p = SITE.professor || {};
    var foto = $("#professor-foto");
    if (foto) {
      foto.innerHTML = p.foto
        ? '<img src="' + esc(p.foto) + '" alt="Foto do ' + esc(p.nome) + '" loading="lazy">'
        : '<img class="logo-no-lugar" src="img/logo-clara.png" alt="Logo do Curso Prof. Breno Bernardo">';
    }
    var bio = $("#professor-bio");
    if (bio) bio.innerHTML = (p.bio || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    var dest = $("#professor-destaques");
    if (dest) dest.innerHTML = (p.destaques || []).map(function (d) {
      return '<div class="mini-card"><strong>' + esc(d.titulo) + "</strong><span>" + esc(d.texto) + "</span></div>";
    }).join("");
  }

  function montarDepoimentos() {
    var caixa = $("#lista-depoimentos");
    if (!caixa) return;
    if (!DEPOIMENTOS.length) { caixa.closest("section").remove(); return; } // some se estiver vazio
    caixa.innerHTML = DEPOIMENTOS.map(function (d) {
      return '<figure class="depoimento">' + ICONE.aspas +
        "<blockquote>" + esc(d.texto) + "</blockquote>" +
        "<figcaption>" + esc(d.nome) + (d.info ? " <span>· " + esc(d.info) + "</span>" : "") + "</figcaption></figure>";
    }).join("");
  }

  function montarPerguntas() {
    var caixa = $("#lista-duvidas");
    if (!caixa) return;
    if (!PERGUNTAS.length) { caixa.closest("section").remove(); return; }
    caixa.innerHTML = PERGUNTAS.map(function (p) {
      return '<details class="duvida"><summary>' + esc(p.pergunta) + "</summary><p>" + esc(p.resposta) + "</p></details>";
    }).join("");
  }

  /* =================================================================
     CATÁLOGO (cursos.html) — aceita ?tipo=pdf | video | aovivo
     ================================================================= */

  function montarCatalogo() {
    var tipo = parametro("tipo");
    if (tipo && !TIPOS[tipo]) tipo = "";
    function atualizarTitulo(t) {
      $("#catalogo-titulo").textContent = t ? TIPOS[t].nome : "Todos os cursos";
      document.title = (t ? TIPOS[t].nome : "Cursos") + " | Curso Prof. Breno Bernardo";
      var url = t ? "cursos.html?tipo=" + t : "cursos.html";
      window.history.replaceState(null, "", url);
    }
    atualizarTitulo(tipo);
    ligarFiltros($("#filtros-catalogo"), $("#lista-catalogo"), CURSOS, tipo, atualizarTitulo);
  }

  /* =================================================================
     PÁGINA DO CURSO (curso.html?id=...)
     Um único modelo serve para PDF, videoaula e turma ao vivo:
     cada seção só aparece se o campo correspondente estiver preenchido.
     ================================================================= */

  function montarDetalhe() {
    var alvo = $("#detalhe");
    var id = parametro("id");
    var c = CURSOS.filter(function (x) { return x.id === id; })[0];

    if (!c) {
      alvo.innerHTML = '<section class="nao-encontrado container"><h1>Curso não encontrado</h1>' +
        "<p>Este curso pode ter sido encerrado ou o endereço está incorreto.</p>" +
        '<a class="btn btn--preto" href="cursos.html">Ver todos os cursos</a></section>';
      return;
    }

    var tipo = TIPOS[c.tipo] || TIPOS.pdf;
    document.title = c.titulo + " | Curso Prof. Breno Bernardo";
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", c.resumo || c.descricao || "");

    var linkCompra = whats(mensagemDoCurso(c));
    var trilha =
      '<nav class="trilha" aria-label="Você está em"><a href="index.html">Início</a><span aria-hidden="true">/</span>' +
      '<a href="cursos.html?tipo=' + c.tipo + '">' + tipo.nome + '</a><span aria-hidden="true">/</span><span aria-current="page">' + esc(c.disciplina) + "</span></nav>";

    var inclui = (c.inclui || []).length
      ? '<ul class="lista-check">' + c.inclui.map(function (i) { return "<li>" + ICONE.check + esc(i) + "</li>"; }).join("") + "</ul>" : "";

    var textoBotao = c.tipo === "aovivo" ? "Garantir minha vaga" : (c.tipo === "pdf" ? "Comprar pelo WhatsApp" : "Quero este curso");
    var cardCompra =
      '<aside class="compra" aria-label="Compra">' +
        '<div class="compra__rotulo">INVESTIMENTO</div>' +
        '<div class="compra__preco">' + esc(c.preco || "Consulte") + "</div>" +
        '<div class="compra__parcela">' + esc(c.parcelamento || SITE.pagamento || "") + "</div>" +
        inclui +
        '<a class="btn btn--preto btn--bloco" href="' + linkCompra + '" target="_blank" rel="noopener">' + ICONE.whats + textoBotao + "</a>" +
        (c.tipo === "pdf" && c.amostras && c.amostras.length
          ? '<a class="btn btn--contorno-escuro btn--bloco" href="' + whats("Olá, Prof. Breno! Quero receber a amostra de: " + c.titulo + ".") + '" target="_blank" rel="noopener">Receber a amostra em PDF</a>' : "") +
        '<p class="compra__nota">Você fala direto com o professor.</p>' +
      "</aside>";

    var fichas = (c.detalhes || []).length
      ? '<div class="fichas">' + c.detalhes.map(function (d) { return '<div class="ficha"><span>' + esc(d.rotulo) + "</span><strong>" + esc(d.valor) + "</strong></div>"; }).join("") + "</div>" : "";

    var selos = '<div class="selos"><span class="selo">' + (c.tipo === "aovivo" ? '<span class="selo__ponto"></span>' : "") + tipo.selo + "</span>" +
      (c.etiquetas || []).slice(0, 2).map(function (e) { return '<span class="selo selo--contorno">' + esc(e).toUpperCase() + "</span>"; }).join("") + "</div>";

    var topo;
    if (c.tipo === "pdf") {
      // Layout de material: amostra à esquerda, compra à direita.
      var amostra = (c.amostras || []).length
        ? '<div class="amostra">' +
            '<div class="amostra__topo"><span class="selo">AMOSTRA GRÁTIS</span><span id="amostra-contador">Página 1 de ' + c.amostras.length + "</span></div>" +
            '<img class="amostra__principal" id="amostra-principal" src="' + esc(c.amostras[0]) + '" alt="Página 1 da amostra de ' + esc(c.titulo) + '">' +
            '<div class="amostra__miniaturas" role="group" aria-label="Escolher página da amostra">' +
              c.amostras.map(function (src, i) {
                return '<button type="button" class="miniatura" data-i="' + i + '" aria-pressed="' + (i === 0) + '" aria-label="Ver página ' + (i + 1) + '"><img src="' + esc(src) + '" alt="" loading="lazy"></button>';
              }).join("") +
            "</div></div>"
        : '<div class="amostra"><img src="img/logo-clara.png" alt="" style="width:60%;margin:40px auto"><p style="color:#D4D4D8;text-align:center">Peça a amostra pelo WhatsApp</p></div>';

      topo =
        '<section class="secao secao--areia" style="padding-top:40px"><div class="container">' +
          trilha +
          '<div class="detalhe-pdf">' + amostra +
            "<div>" + selos +
              '<h1 class="titulo-impacto">' + esc(c.titulo) + "</h1>" +
              '<p class="descricao">' + esc(c.descricao) + "</p>" +
              fichas + cardCompra +
            "</div>" +
          "</div></div></section>";
    } else {
      // Layout de turma / videoaula: fundo preto, compra em destaque.
      topo =
        '<section class="secao secao--preta" style="padding-top:48px"><div class="container">' + trilha +
          '<div class="detalhe-topo">' +
            '<div class="detalhe-topo__info">' + selos +
              '<h1 class="titulo-impacto">' + esc(c.titulo) + "</h1>" +
              '<p class="descricao">' + esc(c.descricao) + "</p>" + fichas +
            "</div>" + cardCompra +
          "</div></div></section>";
    }

    var conteudo = (c.conteudo || []).length
      ? '<section class="secao"><div class="container">' +
          '<div class="cabeca-secao"><div class="sobretitulo">Conteúdo</div><h2 class="titulo-secao">O que você vai estudar</h2></div>' +
          '<div class="topicos">' + c.conteudo.map(function (t, i) {
            return '<div class="topico"><span class="topico__num">' + String(i + 1).padStart(2, "0") + "</span><div><h3>" + esc(t.titulo) + "</h3><p>" + esc(t.texto) + "</p></div></div>";
          }).join("") + "</div></div></section>" : "";

    var cronograma = (c.cronograma || []).length
      ? '<section class="secao secao--areia"><div class="container">' +
          '<div class="cabeca-secao"><div class="sobretitulo">Planejamento</div><h2 class="titulo-secao">Cronograma</h2></div>' +
          '<div class="tabela-caixa"><table class="tabela"><thead><tr><th scope="col">Semana</th><th scope="col">Data</th><th scope="col">Disciplina</th><th scope="col">Tema</th></tr></thead><tbody>' +
          c.cronograma.map(function (r) { return "<tr><td><strong>" + esc(r.semana) + "</strong></td><td>" + esc(r.data) + "</td><td>" + esc(r.disciplina) + "</td><td>" + esc(r.tema) + "</td></tr>"; }).join("") +
          "</tbody></table></div></div></section>" : "";

    var outros = CURSOS.filter(function (x) { return x.id !== c.id; }).slice(0, 3);
    var secaoOutros = outros.length
      ? '<section class="secao"><div class="container"><div class="linha-titulo"><h2 class="titulo-secao">Você também pode gostar</h2>' +
          '<a class="btn btn--contorno-escuro btn--pequeno" href="cursos.html">Ver todos</a></div>' +
          '<div class="grade-cursos">' + outros.map(cardCurso).join("") + "</div></div></section>" : "";

    var chamada =
      '<section class="secao secao--amarela" style="padding:64px 0"><div class="container chamada"><div class="chamada__texto">' +
        '<h2 class="titulo-impacto">Ficou com alguma dúvida?</h2><p>Chame o professor no WhatsApp e tire suas dúvidas antes de comprar.</p></div>' +
        '<a class="btn btn--preto" href="' + linkCompra + '" target="_blank" rel="noopener">' + ICONE.whats + "Chamar no WhatsApp</a></div></section>";

    alvo.innerHTML = topo + conteudo + cronograma + secaoOutros + chamada;

    // Troca de página na amostra
    var mini = alvo.querySelector(".amostra__miniaturas");
    if (mini) {
      mini.addEventListener("click", function (e) {
        var b = e.target.closest(".miniatura");
        if (!b) return;
        var i = Number(b.dataset.i);
        var img = $("#amostra-principal");
        img.src = c.amostras[i];
        img.alt = "Página " + (i + 1) + " da amostra de " + c.titulo;
        $("#amostra-contador").textContent = "Página " + (i + 1) + " de " + c.amostras.length;
        mini.querySelectorAll(".miniatura").forEach(function (m) { m.setAttribute("aria-pressed", String(m === b)); });
      });
    }
  }

  /* =================================================================
     INÍCIO: decide o que montar conforme a página aberta
     ================================================================= */
  document.addEventListener("DOMContentLoaded", function () {
    montarAviso();
    montarCabecalho();
    montarRodape();
    var pagina = document.body.dataset.pagina;
    if (pagina === "inicio") montarInicio();
    if (pagina === "catalogo") montarCatalogo();
    if (pagina === "curso") montarDetalhe();
  });
})();
