/* =====================================================================
   DADOS DO SITE — cursos, apostilas, questões, depoimentos e dúvidas
   ---------------------------------------------------------------------
   Este é o ÚNICO arquivo que você precisa editar para:
     1. Adicionar / remover / esconder CURSOS e APOSTILAS  → lista CURSOS
     2. Trocar as QUESTÕES DO DIA                          → lista QUESTOES
     3. Publicar DEPOIMENTOS de alunos                     → lista DEPOIMENTOS
     4. Editar as DÚVIDAS FREQUENTES                       → lista PERGUNTAS

   Cada item cadastrado aqui gera AUTOMATICAMENTE:
     • o card na página inicial (se "destaque: true");
     • o card no catálogo (cursos.html);
     • a página completa do curso (curso.html?id=...).
   Não é preciso criar nenhum arquivo .html novo.

   ─────────────────────────────────────────────────────────────────────
   COMO ADICIONAR UM CURSO / APOSTILA NOVA (passo a passo)
   ─────────────────────────────────────────────────────────────────────
   1. Copie um dos MODELOS abaixo (do  {  até o  },  inclusive a vírgula).
   2. Cole DENTRO da lista CURSOS, logo após o  [  (fica em primeiro)
      ou entre dois itens existentes.
   3. Troque o "id" por um nome único, sem espaços nem acentos
      (ex.: "constitucional-120-questoes"). Ele vira o endereço da página.
   4. Preencha os textos. Campos que não usar podem ficar vazios
      ("" ou []) — a seção correspondente some sozinha da página.
   5. Salve, abra o site e confira.

   COMO REMOVER
   • Para ESCONDER temporariamente: troque  exibir: true  por  exibir: false
   • Para APAGAR de vez: apague o bloco inteiro, do  {  até o  },

   ERROS MAIS COMUNS (o site fica em branco se acontecer):
   • esquecer a vírgula depois do  }  de um item;
   • apagar uma aspa de um texto;
   • usar aspas duplas dentro do texto — use aspas simples: 'assim'.
   Dica: se algo sumir, aperte F12 no navegador, aba "Console": a linha
   do erro aparece lá.

   ─────────────────────────────────────────────────────────────────────
   MODELOS PARA COPIAR (não apague, eles estão dentro de comentário)
   ─────────────────────────────────────────────────────────────────────

   ► MODELO — APOSTILA EM PDF
   {
     id: "nome-unico-da-apostila",
     exibir: true,
     destaque: true,                 // true = aparece também na página inicial
     tipo: "pdf",                    // "pdf" | "video" | "aovivo"
     disciplina: "Direito Administrativo",
     titulo: "Título da apostila",
     resumo: "Uma frase curta que aparece no card.",
     descricao: "Texto maior que aparece no topo da página do material.",
     preco: "",                      // ex.: "R$ 19,90"   (vazio = "Consulte")
     parcelamento: "",               // ex.: "ou 2x de R$ 10,00"
     etiquetas: ["Esquematizado", "Questões comentadas"],
     amostras: [                     // imagens das páginas (pasta img/amostras)
       "img/amostras/arquivo-1.jpg",
       "img/amostras/arquivo-2.jpg"
     ],
     detalhes: [
       { rotulo: "Páginas", valor: "20 páginas A4" },
       { rotulo: "Entrega", valor: "Pelo WhatsApp" }
     ],
     inclui: ["PDF para imprimir", "Gabarito comentado"],
     conteudo: [
       { titulo: "Tema 1", texto: "Breve descrição." },
       { titulo: "Tema 2", texto: "Breve descrição." }
     ],
     cronograma: [],
     mensagemWhatsApp: ""            // vazio = mensagem automática com o título
   },

   ► MODELO — TURMA AO VIVO (preparatório para um concurso)
   {
     id: "turma-nome-do-concurso",
     exibir: true,
     destaque: true,
     tipo: "aovivo",
     disciplina: "Nome do concurso",
     titulo: "Preparatório Nome do Concurso",
     resumo: "Aulas online ao vivo focadas no edital.",
     descricao: "Texto de apresentação da turma.",
     preco: "",
     parcelamento: "",
     etiquetas: ["Ao vivo", "Online", "Vagas limitadas"],
     amostras: [],
     detalhes: [
       { rotulo: "Início", valor: "10/11" },
       { rotulo: "Aulas", valor: "Seg e Qua · 19h" },
       { rotulo: "Duração", valor: "8 semanas" },
       { rotulo: "Banca", valor: "CEBRASPE" }
     ],
     inclui: ["Aulas ao vivo", "PDF de cada aula", "Grupo de dúvidas"],
     conteudo: [
       { titulo: "Língua Portuguesa", texto: "Interpretação, gramática..." }
     ],
     cronograma: [
       { semana: "01", data: "10/11", disciplina: "Português", tema: "Interpretação de texto" }
     ],
     mensagemWhatsApp: ""
   },

   ► MODELO — VIDEOAULAS (curso gravado)
   {
     id: "videoaulas-nome-da-disciplina",
     exibir: true,
     destaque: false,
     tipo: "video",
     disciplina: "Direito Constitucional",
     titulo: "Videoaulas de Direito Constitucional",
     resumo: "Aulas gravadas para estudar no seu ritmo.",
     descricao: "Texto de apresentação do curso gravado.",
     preco: "",
     parcelamento: "",
     etiquetas: ["Gravado", "Com PDF de apoio"],
     amostras: [],
     detalhes: [
       { rotulo: "Aulas", valor: "12 videoaulas" },
       { rotulo: "Acesso", valor: "12 meses" }
     ],
     inclui: ["Videoaulas", "PDF de apoio"],
     conteudo: [
       { titulo: "Módulo 1", texto: "Princípios fundamentais" }
     ],
     cronograma: [],
     mensagemWhatsApp: ""
   },
   ===================================================================== */


/* =====================================================================
   1. CURSOS E APOSTILAS
   A ordem aqui é a ordem em que aparecem no site.
   ===================================================================== */
window.CURSOS = [

  /* ---------- Apostila: Processual Penal (amostra real) ---------- */
  {
    id: "processual-penal-sistemas-principios",
    exibir: true,
    destaque: true,
    tipo: "pdf",
    disciplina: "Processual Penal",
    titulo: "Direito Processual Penal: Sistemas e Princípios",
    resumo: "Sistemas processuais e princípios fundamentais em esquemas visuais, com questões comentadas.",
    descricao: "Sistemas processuais e princípios fundamentais do processo penal em esquemas visuais, com revisão relâmpago, questões da banca CEBRASPE e gabarito comentado. Esquematizado conforme a doutrina de Leonardo Barreto Moreira Alves.",
    preco: "",
    parcelamento: "",
    etiquetas: ["Esquematizado", "CEBRASPE", "Amostra grátis"],
    amostras: [
      "img/amostras/processual-penal-1.jpg",
      "img/amostras/processual-penal-2.jpg",
      "img/amostras/processual-penal-3.jpg",
      "img/amostras/processual-penal-4.jpg"
    ],
    detalhes: [
      { rotulo: "Páginas", valor: "6 páginas A4" },
      { rotulo: "Questões", valor: "3 comentadas" },
      { rotulo: "Formato", valor: "PDF para imprimir" },
      { rotulo: "Entrega", valor: "Pelo WhatsApp" }
    ],
    inclui: [
      "4 seções esquematizadas",
      "Linha do tempo dos sistemas processuais",
      "Princípios em cards com o artigo da CF",
      "Revisão relâmpago para a véspera da prova",
      "Questões CEBRASPE com gabarito comentado"
    ],
    conteudo: [
      { titulo: "Noções preliminares", texto: "Poder punitivo estatal, sistemas e princípios: a visão panorâmica." },
      { titulo: "Sistemas processuais", texto: "Inquisitório, misto e acusatório, com o quadro 'quem faz o quê'." },
      { titulo: "Princípios fundamentais", texto: "Presunção de inocência, devido processo legal, juiz natural e mais." },
      { titulo: "Síntese e revisão", texto: "A função dupla do processo penal e 9 pontos para revisar." }
    ],
    cronograma: [],
    mensagemWhatsApp: ""
  },

  /* ---------- Apostila: 120 questões de Constitucional ---------- */
  // Quando tiver as imagens de amostra, salve em img/amostras/ e
  // coloque os caminhos em "amostras".
  {
    id: "constitucional-120-questoes",
    exibir: true,
    destaque: true,
    tipo: "pdf",
    disciplina: "Constitucional",
    titulo: "120 Questões Resolvidas de Direito Constitucional",
    resumo: "Os principais conteúdos que caem em concursos, com cada questão resolvida.",
    descricao: "Caderno com 120 questões resolvidas de Direito Constitucional, reunindo os principais conteúdos cobrados em concursos. Ideal para treinar no estilo da banca e revisar a matéria de forma prática.",
    preco: "",
    parcelamento: "",
    etiquetas: ["120 questões", "Resolvidas"],
    amostras: [],
    detalhes: [
      { rotulo: "Questões", valor: "120 resolvidas" },
      { rotulo: "Formato", valor: "PDF" },
      { rotulo: "Entrega", valor: "Pelo WhatsApp" }
    ],
    inclui: [
      "120 questões resolvidas",
      "Principais conteúdos de Direito Constitucional",
      "Material em PDF para estudar onde quiser"
    ],
    conteudo: [],
    cronograma: [],
    mensagemWhatsApp: ""
  }

  /* ↑ Para adicionar outro item: coloque uma vírgula depois do  }  acima
       e cole um MODELO logo abaixo. */
];


/* =====================================================================
   2. QUESTÕES DO DIA
   O site mostra uma questão diferente por dia, em rodízio.
   Para adicionar: copie um bloco { ... }, cole no fim da lista e
   coloque vírgula entre os blocos.
   "correta" é a LETRA da alternativa certa.
   ===================================================================== */
window.QUESTOES = [
  {
    banca: "CEBRASPE",
    tema: "Direito Processual Penal · Princípios",
    enunciado: "Assinale a opção que apresenta corretamente o princípio do direito processual penal que estabelece que ninguém será processado nem sentenciado senão pela autoridade competente, bem como que impede a criação de tribunais de exceção.",
    alternativas: {
      A: "princípio da persuasão racional do juiz",
      B: "princípio da presunção de inocência ou da não culpabilidade",
      C: "princípio do juiz natural",
      D: "princípio do devido processo legal"
    },
    correta: "C",
    comentario: "O juiz natural garante julgamento pela autoridade competente e veda tribunais de exceção (art. 5º, XXXVII e LIII, CF).",
    link: "curso.html?id=processual-penal-sistemas-principios"
  },
  {
    banca: "CEBRASPE",
    tema: "Direito Processual Penal · Processo penal constitucional",
    enunciado: "Assinale a opção correta acerca do processo penal constitucional.",
    alternativas: {
      A: "Ninguém será considerado culpado até o seu julgamento em segunda instância.",
      B: "Permite-se, excepcionalmente, a criação de juízo ou de tribunal especial para julgar crimes graves.",
      C: "O princípio da inadmissibilidade das provas ilícitas será afastado quando a prova, ainda que obtida por meios ilícitos, for absolutamente necessária para estabelecer a verdade real dos fatos.",
      D: "O princípio do contraditório constitui corolário do devido processo legal."
    },
    correta: "D",
    comentario: "O contraditório é desdobramento do devido processo legal. A culpa só se firma com o trânsito em julgado, tribunais de exceção são vedados e provas ilícitas são inadmissíveis.",
    link: "curso.html?id=processual-penal-sistemas-principios"
  },
  {
    banca: "CEBRASPE",
    tema: "Direito Processual Penal · Nemo tenetur se detegere",
    enunciado: "Segundo o princípio de vedação da autoincriminação (nemo tenetur se detegere), o acusado",
    alternativas: {
      A: "é obrigado a fornecer padrões vocais necessários para subsidiar prova pericial de verificação de interlocutor.",
      B: "é obrigado a fornecer material para exame grafotécnico, para fins de reconhecimento de escritos por comparação de letra.",
      C: "é obrigado a participar da reconstituição do crime a ele imputado.",
      D: "tem direito ao silêncio, o que não implica direito de falsear a verdade quanto à identidade pessoal."
    },
    correta: "D",
    comentario: "O acusado não é obrigado a produzir prova contra si. Há direito ao silêncio, mas não a mentir sobre a identidade (Súmula 522 do STJ).",
    link: "curso.html?id=processual-penal-sistemas-principios"
  }
];


/* =====================================================================
   3. DEPOIMENTOS DE ALUNOS
   Enquanto a lista estiver VAZIA, a seção não aparece no site.
   Use só depoimentos reais, com autorização do aluno.
   Exemplo para copiar:
     { nome: "Maria S.", info: "Aprovada na GM de Fortaleza", texto: "O material..." },
   ===================================================================== */
window.DEPOIMENTOS = [
];


/* =====================================================================
   4. DÚVIDAS FREQUENTES
   Cada bloco tem "pergunta" e "resposta". Adicione ou remova à vontade.
   ===================================================================== */
window.PERGUNTAS = [
  {
    pergunta: "Como recebo o material depois da compra?",
    resposta: "O material é enviado pelo WhatsApp após a confirmação do pagamento."
  },
  {
    pergunta: "Posso ver uma amostra antes de comprar?",
    resposta: "Sim. Os materiais com amostra mostram páginas reais na própria página do curso, e você pode pedir mais detalhes pelo WhatsApp."
  },
  {
    pergunta: "Quais as formas de pagamento?",
    resposta: "Aceitamos Pix. Para outras formas, fale com o professor pelo WhatsApp."
  },
  {
    pergunta: "As aulas são presenciais?",
    resposta: "Não. Todos os cursos são 100% online: você estuda de onde estiver."
  }
];
