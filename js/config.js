/* =====================================================================
   CONFIGURAÇÕES GERAIS DO SITE — Curso Prof. Breno Bernardo
   ---------------------------------------------------------------------
   Este é o arquivo dos DADOS FIXOS do site: contatos, redes sociais,
   biografia do professor e o aviso da faixa amarela do topo.

   Mudou o WhatsApp, o Instagram ou a bio? Altere SÓ AQUI.
   Todas as páginas leem deste arquivo, então a mudança vale para o
   site inteiro de uma vez.

   REGRAS RÁPIDAS (para não quebrar o site):
   • Todo texto fica entre aspas: "assim".
   • Cada linha de propriedade termina com vírgula.
   • Se colar aspas dentro do texto, use aspas simples: 'assim'.
   ===================================================================== */

window.SITE = {

  /* ---------------- CONTATOS ---------------- */

  // WhatsApp SOMENTE com números: 55 (Brasil) + DDD + número.
  // ⚠ Teste o link após publicar. Se não abrir a conversa certa,
  //   experimente com o 9 extra: "5585992522904".
  whatsapp: "558592522904",

  // Como o número aparece escrito no site (só visual).
  whatsappTexto: "(85) 9252-2904",

  // Mensagem padrão quando o visitante clica num botão geral do site.
  mensagemPadrao: "Olá, Prof. Breno! Vim pelo site e quero saber mais sobre os cursos.",

  instagram: "https://www.instagram.com/curso_professor_breno_bernardo",
  instagramUsuario: "@curso_professor_breno_bernardo",
  youtube: "https://www.youtube.com/@Curso-Professor-Breno12",

  /* ---------------- PAGAMENTO ---------------- */
  // Texto exibido nos cards de compra. Quando o Breno confirmar as
  // formas de pagamento, é só editar esta frase.
  pagamento: "Pagamento via Pix. Consulte outras formas pelo WhatsApp.",

  /* ---------------- PROFESSOR ---------------- */
  professor: {
    nome: "Prof. Breno Bernardo",

    // Foto: salve o arquivo em img/ (ex.: img/professor.jpg) e escreva
    // o caminho aqui. Enquanto estiver vazio (""), aparece a logo.
    foto: "",

    // Cada item vira um parágrafo na seção "O professor".
    bio: [
      "Aprovado em 4 concursos, o Prof. Breno Bernardo ensina o caminho que ele mesmo percorreu: estudar o que cai, com método e muita questão.",
      "Os materiais são esquematizados para facilitar a memorização, e o contato com os alunos é direto, pelo WhatsApp."
    ],

    // Os três destaques que aparecem abaixo da bio.
    destaques: [
      { titulo: "Aprovado em 4 concursos", texto: "Experiência de quem passou" },
      { titulo: "Esquemas visuais", texto: "Conteúdo que fixa" },
      { titulo: "Contato direto", texto: "Fale com o professor" }
    ]
  },

  /* ---------------- FAIXA AMARELA DO TOPO ---------------- */
  // Use para anunciar turma nova, lançamento de material, promoção...
  // Para ESCONDER a faixa, deixe   texto: ""
  aviso: {
    etiqueta: "NOVIDADE",
    texto: "Material de Direito Processual Penal com amostra grátis",
    link: "curso.html?id=processual-penal-sistemas-principios",
    textoLink: "Ver amostra"
  },

  /* ---------------- "QUAL É O SEU CONCURSO?" ---------------- */
  // Cada nome vira um botão que abre o WhatsApp já dizendo o concurso.
  // Adicione ou remova nomes à vontade (entre aspas, separados por vírgula).
  concursos: [
    "Guarda Municipal",
    "Polícia Militar",
    "Polícia Civil",
    "Polícia Penal",
    "Tribunais"
  ]
};
