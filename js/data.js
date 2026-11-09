(function (global) {
  const MODULES = [
    { id: "pain", title: "A dor que resolvemos", icon: "pain" },
    { id: "mission", title: "Missão", icon: "target" },
    { id: "inputs", title: "Inputs", icon: "in" },
    { id: "doing", title: "O que fazemos", icon: "gear" },
    { id: "value", title: "Valor gerado", icon: "value" },
    { id: "outputs", title: "Outputs", icon: "out" },
    { id: "areas", title: "Como sua área se conecta", icon: "globe" },
    { id: "chain", title: "Conexões com a cadeia", icon: "link" },
    { id: "quiz", title: "Quiz", icon: "brain" },
  ];

  const AREA_PROFILES = [
    { id: "client", title: "Perto do cliente", sub: "Atende, negocia e capta sinais do mercado" },
    { id: "order", title: "Cuida do pedido", sub: "Registra, acompanha e prioriza pedidos" },
    { id: "fulfill", title: "Faz o pedido virar entrega", sub: "Separa, fatura e conclui o atendimento" },
    { id: "move", title: "Movimenta o produto", sub: "Transporta, armazena e opera a rede" },
    { id: "portfolio", title: "Cuida do portfólio", sub: "Lançamentos, descontinuações e mix" },
    { id: "returns", title: "Recebe o que volta", sub: "Devoluções, análise e reintegração" },
  ];

  const IMPACT_WHO = ["Clientes", "Vendas", "Fábricas", "Supply Chain"];

  const CELLS = [
    {
      id: "demand",
      name: "Demand Planning",
      abbr: "DP",
      color: "#3dd6f5",
      img: "assets/chars/demand.jpg",
      short: "Cria a visão futura da demanda",
      question: "O que o mercado vai consumir?",
      speech: "Eu não adivinho o futuro. Eu reduzo a incerteza para que toda a cadeia possa se preparar antes.",
      pain: {
        headline: "Sem uma visão de futuro, a cadeia só reage.",
        intro:
          "Fábricas precisam de semanas ou meses para produzir. Se ninguém olhar à frente, a cadeia só descobre a demanda quando o pedido já chegou.",
        without: [
          "O produto falta exatamente na janela em que mais precisam dele.",
          "Oportunidades de mercado são perdidas por falta de preparo.",
          "Produzem no escuro, alternando entre urgência e ociosidade.",
          "Vive de emergências: fretes urgentes, remanejamentos e excesso onde não precisa.",
        ],
      },
      mission: {
        statement: "Criar a melhor visão possível da demanda futura do mercado.",
        reason: "Reduzir incertezas e dar previsibilidade para toda a cadeia.",
        goal: "Construir o Best Estimate: a visão consensual da Bayer sobre o que o mercado vai consumir.",
        contribution: "Permitir que todas as áreas se preparem antes da demanda acontecer, e não depois.",
      },
      inputs: [
        { name: "Histórico de vendas", from: "Faturamento realizado", why: "Mostra padrões, sazonalidade e o comportamento passado do mercado." },
        { name: "Tendências de mercado", from: "Inteligência de mercado", why: "Indica para onde o mercado está indo, não só onde esteve." },
        { name: "Campanhas e estratégias comerciais", from: "Comercial", why: "Mudam o volume e o momento em que a demanda acontece." },
        { name: "Lançamentos e descontinuações", from: "Portfólio", why: "Produtos entram e saem, e a demanda migra entre eles." },
        { name: "Informações das Units", from: "Units de negócio", why: "Trazem a leitura regional e o pulso de cada mercado." },
        { name: "Sinais de quem está perto do cliente", from: "Relacionamento com clientes", why: "Captam mudanças antes que elas apareçam nos números." },
        { name: "Inteligência dos Assets", from: "Assets", why: "Trazem a visão estratégica de cada portfólio." },
      ],
      doing: {
        questions: [
          "Quanto o mercado vai consumir nos próximos meses?",
          "Essa variação é tendência ou um evento pontual?",
          "Quais riscos e oportunidades podem mudar a demanda?",
          "Todas as áreas estão olhando para o mesmo número?",
        ],
        thinking: [
          "Separar o que é recorrente do que é pontual",
          "Ler histórico, sazonalidade e safra",
          "Incorporar estratégia comercial e lançamentos",
          "Construir cenários e premissas de mercado",
        ],
        spotlight: "layers",
        forum: {
          name: "Refinamento de Demanda",
          with: "Realizado junto aos Assets e stakeholders",
          topics: ["Revisar projeções", "Discutir oportunidades", "Identificar riscos", "Alinhar a estratégia comercial", "Validar o Best Estimate"],
        },
      },
      value: {
        protects: ["Disponibilidade nas janelas críticas", "A cadeia contra reações emergenciais"],
        enables: ["Preparação antecipada", "Alinhamento entre áreas em torno de um único número"],
        improves: ["Previsibilidade", "Uso de recursos", "Redução do risco de ruptura"],
      },
      outputs: [
        { name: "Best Estimate", users: ["supply", "drp", "inventory", "quotas", "Liderança"], impact: "É o principal direcionador da cadeia: todos planejam a partir dele." },
        { name: "Forecast", users: ["supply", "inventory"], impact: "Base para planejar produção e projetar estoques." },
        { name: "Cenários", users: ["supply", "Liderança"], impact: "Preparam a cadeia para mais de um futuro possível." },
        { name: "Premissas de mercado", users: ["supply", "drp", "inventory", "quotas"], impact: "Deixam claro o porquê do número, não só o número." },
        { name: "Consenso de demanda", users: ["supply", "drp", "inventory", "quotas", "digital"], impact: "Todos decidem a partir da mesma visão de futuro." },
      ],
      areas: {
        client: {
          us: "Os sinais que você capta, como um cliente que antecipa a compra ou um concorrente em falta, podem mudar o Best Estimate.",
          you: "Quando a demanda é bem prevista, existe produto para oferecer na hora certa.",
          example: "Um cliente comenta que vai ampliar a área plantada. Levado adiante, esse sinal pode virar volume planejado meses antes do pedido.",
        },
        order: {
          us: "Pedidos registrados com antecedência e qualidade ajudam a confirmar ou corrigir a previsão.",
          you: "Uma previsão aderente reduz pedidos travados por falta de produto.",
          example: "Pedidos concentrados em um mesmo produto mostram uma tendência antes do fechamento do mês.",
        },
        fulfill: {
          us: "O ritmo real de atendimento mostra se a demanda prevista está se confirmando.",
          you: "Previsão bem feita significa menos urgência e menos atendimento parcial.",
          example: "Quando muitos pedidos saem parciais, é sinal de que a demanda superou a visão planejada.",
        },
        move: {
          us: "Prazos e gargalos da rede mostram quanto antes a demanda precisa ser conhecida.",
          you: "Com uma visão de futuro, a operação planeja transporte e armazenagem antes do pico.",
          example: "Saber com meses de antecedência que a safra será maior permite reservar capacidade de frete.",
        },
        portfolio: {
          us: "Lançamentos e descontinuações mudam para onde a demanda migra.",
          you: "O Best Estimate mostra o tamanho real da oportunidade de cada produto.",
          example: "Um produto novo substitui um antigo: a demanda não some, ela migra, e a previsão precisa refletir isso.",
        },
        returns: {
          us: "Devoluções frequentes indicam que parte da demanda prevista não se confirmou.",
          you: "Uma previsão mais precisa reduz excesso no cliente e, com isso, devoluções.",
          example: "Devoluções concentradas depois de uma campanha mostram que o volume foi além do consumo real.",
        },
      },
      links: {
        supply: { gives: "O Best Estimate como base do plano", gets: "Restrições de capacidade que afetam o que será atendido" },
        drp: { gives: "A previsão de onde a demanda vai acontecer", gets: "Onde a demanda está se concretizando na rede" },
        inventory: { gives: "O consumo futuro para projetar estoques", gets: "Alertas de excesso ou ruptura que pedem revisar a demanda" },
        quotas: { gives: "O Best Estimate para distribuir sob restrição", gets: "O consumo real das cotas, que mostra a demanda efetiva" },
        digital: { gives: "Necessidades de visibilidade e análise", gets: "Dados confiáveis para construir a previsão" },
      },
      quiz: [
        {
          q: "Por que o Best Estimate é diferente de uma previsão puramente matemática?",
          options: [
            "Porque usa um algoritmo mais avançado",
            "Porque combina histórico com estratégia, mercado e a inteligência de Units e Assets, em consenso",
            "Porque considera apenas os pedidos já registrados",
          ],
          correct: 1,
          explain: "O Best Estimate é uma visão consolidada e consensual. A matemática é só uma das camadas: estratégia, mercado e inteligência das áreas completam a leitura.",
        },
        {
          q: "Um cliente antecipa uma compra grande da próxima safra. O que Demand Planning precisa entender antes de mudar a visão futura?",
          options: [
            "Se o volume é recorrente ou pontual",
            "Qual transportadora vai entregar",
            "Nada: todo pedido vira tendência",
          ],
          correct: 0,
          explain: "Um volume pontual é real, mas não necessariamente se repete. Tratá-lo como tendência infla a previsão e leva excesso para a cadeia.",
        },
        {
          q: "Se a demanda for mal prevista, quem sente o impacto?",
          options: ["Apenas Demand Planning", "Apenas o time comercial", "A cadeia inteira: fábrica, estoque, distribuição e cliente"],
          correct: 2,
          explain: "O Best Estimate é o direcionador da cadeia. Um erro aqui se propaga para produção, estoques, posicionamento e atendimento.",
        },
        {
          q: "Qual a principal contribuição de Demand Planning?",
          options: ["Garantir o transporte dos produtos", "Dar previsibilidade para que todos se preparem antes", "Definir o preço dos produtos"],
          correct: 1,
          explain: "A área existe para reduzir incertezas. Com previsibilidade, a cadeia se prepara em vez de reagir.",
        },
      ],
    },
    {
      id: "supply",
      name: "Supply Planning",
      abbr: "SP",
      color: "#5ee0a0",
      img: "assets/chars/supply.jpg",
      short: "Transforma demanda em disponibilidade",
      question: "O que realmente conseguiremos entregar?",
      speech: "A demanda diz o que o mercado quer. Eu respondo, com transparência, o que a operação consegue entregar e quando.",
      pain: {
        headline: "Querer vender não é o mesmo que conseguir entregar.",
        intro:
          "O mercado pode pedir mais do que a fábrica produz, ou no momento errado. Sem alguém conectando esses dois mundos, as promessas não se sustentam.",
        without: [
          "Recebem promessas que não se cumprem.",
          "Vendem volumes que a operação não consegue produzir a tempo.",
          "Recebem pedidos sem considerar capacidade, matéria-prima e restrições.",
          "Descobre gargalos tarde demais, quando já não há tempo de reagir.",
        ],
      },
      mission: {
        statement: "Transformar demanda em disponibilidade.",
        reason: "Conectar o que o mercado precisa com o que a operação consegue fazer.",
        goal: "Responder: o que realmente conseguiremos entregar ao mercado?",
        contribution: "Construir uma visão executável da operação, com riscos visíveis antes de virarem problema.",
      },
      inputs: [
        { name: "Best Estimate", from: "Demand Planning", why: "Diz o que o mercado vai precisar." },
        { name: "Capacidade produtiva", from: "Fábricas", why: "Define o limite do que pode ser produzido em cada período." },
        { name: "Disponibilidade de matéria-prima", from: "Fornecedores e suprimentos", why: "Sem insumo, não existe produção." },
        { name: "Restrições industriais", from: "Fábricas", why: "Manutenções, quebras e limitações de linha mudam o possível." },
        { name: "Inventário", from: "Inventário", why: "O que já existe reduz o que precisa ser produzido." },
        { name: "Programação de produção", from: "Fábricas", why: "Mostra o que já está comprometido e o que ainda pode mudar." },
      ],
      doing: {
        questions: [
          "Conseguimos produzir o que o mercado vai pedir?",
          "Onde estão os gargalos?",
          "Que riscos podem afetar a entrega nos próximos meses?",
          "Existem oportunidades de produzir mais ou antes?",
        ],
        thinking: [
          "Conectar mercado com capacidade operacional",
          "Mapear restrições e gargalos",
          "Antecipar riscos futuros",
          "Identificar ganhos produtivos e oportunidades",
        ],
        spotlight: "bridge",
        forum: {
          name: "Reunião de Críticos",
          with: "Participação junto às fábricas. Um dos fóruns mais importantes da cadeia",
          topics: ["Quebras produtivas", "Atrasos", "Restrições", "Recuperações", "Ganhos acima do planejado"],
        },
      },
      value: {
        protects: ["A disponibilidade para o mercado", "A estabilidade operacional"],
        enables: ["Antecipação de problemas", "Alinhamento entre operação e negócio"],
        improves: ["Visibilidade de riscos", "Confiabilidade das promessas ao cliente"],
      },
      outputs: [
        { name: "Disponibilidade", users: ["drp", "quotas", "inventory"], impact: "É a base para posicionar e distribuir o produto." },
        { name: "Plano operacional", users: ["Fábricas"], impact: "Direciona o que produzir e quando." },
        { name: "Riscos de supply", users: ["demand", "quotas", "Liderança"], impact: "Permitem agir antes da falta acontecer." },
        { name: "Restrições", users: ["quotas", "demand"], impact: "Mostram onde haverá limite de atendimento." },
        { name: "Oportunidades de atendimento", users: ["demand", "Comercial"], impact: "Mostram onde é possível entregar mais." },
      ],
      areas: {
        client: {
          us: "Os compromissos assumidos com clientes dependem do que a operação pode entregar.",
          you: "Supply mostra o que é possível prometer, evitando promessas que não se cumprem.",
          example: "Antes de uma negociação grande, saber se haverá produto evita frustrar o cliente depois.",
        },
        order: {
          us: "A carteira mostra onde a pressão por produto é maior.",
          you: "Quando a disponibilidade é limitada, a visão de Supply explica por que alguns pedidos esperam.",
          example: "Um produto com restrição industrial: Supply antecipa quando o volume volta e o pedido pode ser planejado.",
        },
        fulfill: {
          us: "Atrasos no atendimento revelam onde a disponibilidade não chegou.",
          you: "Recuperações e ganhos produtivos viram atendimento mais rápido.",
          example: "Uma fábrica recupera uma parada antes do previsto e o volume extra destrava pedidos pendentes.",
        },
        move: {
          us: "A operação precisa saber quando o volume produzido vai sair da fábrica.",
          you: "Um plano operacional estável evita picos inesperados de movimentação.",
          example: "Uma quebra produtiva que atrasa duas semanas muda todo o planejamento de transporte.",
        },
        portfolio: {
          us: "Lançamentos exigem capacidade e insumos novos.",
          you: "Supply mostra se e quando um novo produto terá volume.",
          example: "Um lançamento depende de um insumo com prazo longo: Supply sinaliza a data realista.",
        },
        returns: {
          us: "Produtos devolvidos e aptos podem reduzir a necessidade de produção.",
          you: "Saber que um volume devolvido não está apto evita contar com algo que não existe.",
          example: "Um lote devolvido ainda em análise não entra como disponível, e a fábrica pode precisar produzir mais.",
        },
      },
      links: {
        demand: { gives: "Restrições e oportunidades que ajustam os cenários", gets: "O Best Estimate como base do plano" },
        drp: { gives: "Disponibilidade para posicionar na rede", gets: "Necessidades regionais que ajudam a priorizar" },
        inventory: { gives: "Disponibilidade futura para projetar estoques", gets: "Estoque atual e riscos que mudam a necessidade de produção" },
        quotas: { gives: "Restrições que exigem distribuir sob limite", gets: "Prioridades de negócio quando não há para todos" },
        digital: { gives: "Necessidade de visibilidade de riscos", gets: "Dados de produção e capacidade estruturados" },
      },
      quiz: [
        {
          q: "Qual pergunta resume a missão de Supply Planning?",
          options: ["Quanto o mercado vai consumir?", "Onde o produto precisa estar?", "O que realmente conseguiremos entregar ao mercado?"],
          correct: 2,
          explain: "Supply transforma demanda em disponibilidade: conecta o que o mercado pede com o que a operação consegue fazer.",
        },
        {
          q: "A demanda prevista é maior que a capacidade da fábrica. Qual é o papel de Supply?",
          options: [
            "Tornar visíveis o gap, os riscos e as alternativas, conectando mercado e operação",
            "Reduzir a previsão de demanda por conta própria",
            "Distribuir o produto entre os clientes",
          ],
          correct: 0,
          explain: "Supply não esconde o gap nem decide sozinho: torna a restrição visível cedo para que a cadeia decida o que fazer.",
        },
        {
          q: "Por que a Reunião de Críticos é tão importante?",
          options: [
            "Porque define o preço dos produtos",
            "Porque antecipa quebras, atrasos e ganhos da fábrica antes que impactem a cadeia",
            "Porque registra os pedidos dos clientes",
          ],
          correct: 1,
          explain: "É onde a realidade da fábrica encontra o plano. Quanto antes um problema ou ganho aparece, mais opções a cadeia tem.",
        },
        {
          q: "Uma fábrica produz acima do planejado. Quem se beneficia?",
          options: ["Somente a fábrica", "Ninguém, o plano já estava fechado", "A cadeia inteira, que ganha disponibilidade para atender mais"],
          correct: 2,
          explain: "Ganhos produtivos viram oportunidades de atendimento quando são comunicados para a cadeia.",
        },
      ],
    },
    {
      id: "drp",
      name: "DRP",
      abbr: "DRP",
      color: "#4cc9f0",
      img: "assets/chars/drp.jpg",
      short: "Posiciona o produto no lugar certo",
      question: "Onde esse produto precisa estar?",
      speech: "Ter estoque no Brasil não é o mesmo que ter produto perto do cliente. Eu cuido dessa distância.",
      pain: {
        headline: "Produto no lugar errado é produto que não vende.",
        intro:
          "O Brasil é grande e cada região tem seu tempo de safra. Um estoque parado no CD errado não atende o cliente que precisa dele agora.",
        without: [
          "Ficam sem produto mesmo com estoque disponível em outra região.",
          "Perdem pedidos por falta local, não por falta total.",
          "Veem o volume produzido parado longe de onde existe demanda.",
          "Gasta com transferências de última hora e retransferências.",
        ],
      },
      mission: {
        statement: "Garantir que o produto esteja disponível na localização correta.",
        reason: "Ter estoque disponível no Brasil não significa conseguir atender o cliente.",
        goal: "Responder: onde esse produto precisa estar?",
        contribution: "Transformar disponibilidade total em disponibilidade no lugar certo e no momento certo.",
      },
      inputs: [
        { name: "Carteira de pedidos", from: "Registrada por quem está perto do cliente", why: "Mostra onde existe necessidade real. É um dos principais direcionadores do DRP." },
        { name: "Previsão de vendas", from: "Demand Planning", why: "Antecipa onde a demanda vai acontecer." },
        { name: "Disponibilidade", from: "Supply Planning", why: "Diz quanto produto existirá para posicionar." },
        { name: "Posição de estoque", from: "Rede de CDs", why: "Mostra onde o produto está hoje." },
      ],
      doing: {
        questions: [
          "Onde está a necessidade real?",
          "Qual CD precisa de reposição primeiro?",
          "Vale transferir entre regiões ou esperar a produção?",
          "A rede está equilibrada?",
        ],
        thinking: [
          "Ler a carteira para encontrar a necessidade real",
          "Decidir reposições e transferências",
          "Balancear estoques entre CDs",
          "Priorizar as rotas mais longas para chegar a tempo",
        ],
        spotlight: "network",
        highlight: {
          title: "A importância da carteira",
          text: "A carteira mostra onde existe necessidade real. Ela orienta abastecimento, movimentações, priorizações e posicionamento de estoque.",
        },
      },
      value: {
        protects: ["O atendimento regional", "O cliente contra a falta local"],
        enables: ["Melhor uso da rede de CDs", "Eficiência logística"],
        improves: ["Redução de rupturas", "Menos retransferências"],
      },
      outputs: [
        { name: "Plano de abastecimento", users: ["Operação da rede", "inventory"], impact: "Organiza o fluxo de produto até cada CD." },
        { name: "Transferências", users: ["Operação da rede", "inventory"], impact: "Corrigem desequilíbrios entre regiões." },
        { name: "Movimentações", users: ["inventory", "quotas"], impact: "Mantêm a rede alinhada à demanda." },
        { name: "Posicionamento de estoque", users: ["quotas", "Atendimento ao cliente"], impact: "Define onde haverá produto para faturar." },
      ],
      areas: {
        client: {
          us: "A carteira que você registra é um dos principais direcionadores do DRP: ela mostra onde existe necessidade real.",
          you: "Uma carteira bem registrada coloca o produto no CD certo antes do cliente precisar.",
          example: "Pedidos registrados cedo em uma região em plena safra fazem o abastecimento chegar a tempo.",
        },
        order: {
          us: "Pedidos com o local de entrega correto orientam o posicionamento.",
          you: "Com o produto no CD certo, o pedido não fica travado por falta local.",
          example: "Um pedido associado ao CD errado pode gerar uma transferência desnecessária.",
        },
        fulfill: {
          us: "O que é faturado em cada CD mostra se o posicionamento acertou.",
          you: "Estoque bem posicionado é atendimento completo e no prazo.",
          example: "Pedidos parciais em um CD enquanto outro tem sobra: sinal de que a rede precisa ser rebalanceada.",
        },
        move: {
          us: "Prazos de rota e capacidade da rede definem quando o produto precisa sair.",
          you: "O DRP prioriza as rotas mais longas primeiro, para que tudo chegue a tempo.",
          example: "O CD mais distante recebe o primeiro caminhão, porque a rota até ele é mais longa.",
        },
        portfolio: {
          us: "Produtos novos precisam de uma estratégia de posicionamento inicial.",
          you: "O DRP coloca o lançamento nas regiões com maior potencial.",
          example: "Um lançamento regional não precisa estar em todos os CDs no primeiro mês.",
        },
        returns: {
          us: "O produto devolvido volta para algum ponto da rede e muda o equilíbrio.",
          you: "Saber onde o volume voltou ajuda a reaproveitá-lo onde existe necessidade.",
          example: "Um volume devolvido e apto em uma região pode atender a necessidade real de outra.",
        },
      },
      links: {
        demand: { gives: "Onde a demanda está se concretizando", gets: "A previsão de onde a demanda vai acontecer" },
        supply: { gives: "Necessidades regionais que ajudam a priorizar", gets: "Disponibilidade para posicionar" },
        inventory: { gives: "Movimentações que mudam a posição de estoque", gets: "Riscos de excesso ou ruptura por local" },
        quotas: { gives: "Produto posicionado para sustentar as cotas", gets: "A distribuição definida sob restrição" },
        digital: { gives: "Necessidade de enxergar a rede", gets: "Visão da posição de estoque e da carteira" },
      },
      quiz: [
        {
          q: "Existe estoque suficiente no Brasil, mas um cliente não foi atendido. O que pode ter acontecido?",
          options: ["O produto estava em outra região, longe da necessidade", "A fábrica parou de produzir", "Não há explicação possível"],
          correct: 0,
          explain: "Disponibilidade total não é disponibilidade local. Por isso o DRP existe: colocar o produto onde a necessidade está.",
        },
        {
          q: "Por que a carteira de pedidos é tão importante para o DRP?",
          options: ["Porque define os preços", "Porque mostra onde existe necessidade real", "Porque substitui a previsão de vendas"],
          correct: 1,
          explain: "A carteira é o sinal mais concreto de onde o produto precisa estar, e orienta abastecimento e priorização.",
        },
        {
          q: "Qual é a pergunta central do DRP?",
          options: ["O que conseguiremos produzir?", "Quanto o mercado vai consumir?", "Onde esse produto precisa estar?"],
          correct: 2,
          explain: "Demand olha o quanto, Supply olha o que é possível, e o DRP olha o onde.",
        },
        {
          q: "Por que o CD mais distante costuma ser abastecido primeiro?",
          options: ["Porque é o maior CD", "Porque a rota é mais longa e o produto precisa chegar a tempo", "Porque tem mais clientes"],
          correct: 1,
          explain: "O tempo de rota é diferente para cada região. Começar pelos destinos mais longos garante que todos recebam a tempo.",
        },
      ],
    },
    {
      id: "inventory",
      name: "Inventário",
      abbr: "INV",
      color: "#7ae0ff",
      img: "assets/chars/inventory.jpg",
      short: "Equilibra disponibilidade e saúde financeira",
      question: "Teremos ruptura ou excesso?",
      speech: "Meu olhar não está no estoque de hoje. Está no estoque de amanhã: é lá que os riscos aparecem.",
      pain: {
        headline: "Estoque demais custa caro. Estoque de menos custa a venda.",
        intro:
          "Todo produto parado é capital imobilizado e pode vencer. Todo produto em falta é venda perdida. Alguém precisa enxergar esse equilíbrio antes que ele se quebre.",
        without: [
          "Sofrem com rupturas que poderiam ter sido previstas.",
          "Perdem vendas por falta ou precisam escoar excesso às pressas.",
          "Produzem o que já sobra e deixam de produzir o que vai faltar.",
          "Acumula vencimentos, baixa rotação e capital parado.",
        ],
      },
      mission: {
        statement: "Garantir equilíbrio entre disponibilidade e saúde financeira.",
        reason: "Pouco estoque gera ruptura. Muito estoque gera excesso, vencimento e capital parado.",
        goal: "Antecipar o comportamento futuro dos estoques.",
        contribution: "Proteger o capital investido sem comprometer o atendimento.",
      },
      inputs: [
        { name: "Estoque atual", from: "Rede de CDs", why: "É o ponto de partida de qualquer projeção." },
        { name: "Disponibilidade", from: "Supply Planning", why: "Mostra o que vai entrar no estoque." },
        { name: "Forecast", from: "Demand Planning", why: "Mostra o que vai sair do estoque." },
        { name: "Carteira", from: "Registrada por quem está perto do cliente", why: "Revela o consumo já comprometido." },
        { name: "Movimentações", from: "DRP", why: "Mudam onde o estoque está." },
        { name: "Devoluções", from: "Quem recebe o que volta", why: "Trazem volume de volta, nem sempre apto para venda." },
      ],
      doing: {
        questions: ["Teremos ruptura?", "Teremos excesso?", "Teremos vencimento?", "Teremos baixa rotação?"],
        thinking: [
          "O foco não é o estoque atual: é o comportamento futuro",
          "Projetar o estoque combinando entradas e saídas",
          "Identificar riscos de validade e baixa rotação",
          "Recomendar ações antes do problema",
        ],
        spotlight: "balance",
      },
      value: {
        protects: ["O capital investido", "O atendimento contra rupturas"],
        enables: ["Ações antecipadas sobre excesso e validade", "Decisões financeiras mais saudáveis"],
        improves: ["Redução de perdas", "Redução de excessos", "Saúde financeira da cadeia"],
      },
      outputs: [
        { name: "Projeções", users: ["supply", "drp", "Liderança"], impact: "Mostram o futuro dos estoques, não só o presente." },
        { name: "Alertas de excesso", users: ["supply", "demand"], impact: "Evitam produzir o que já sobra." },
        { name: "Alertas de ruptura", users: ["supply", "drp"], impact: "Disparam ações antes da falta." },
        { name: "Alertas de validade", users: ["Comercial", "drp"], impact: "Permitem dar saída ao produto antes de vencer." },
        { name: "Recomendações", users: ["supply", "Liderança"], impact: "Transformam a análise em ação." },
      ],
      areas: {
        client: {
          us: "O ritmo de compra dos clientes ajuda a projetar o consumo.",
          you: "Inventário antecipa faltas e excessos que mudam o que você pode oferecer.",
          example: "Um alerta de validade pode virar uma oportunidade comercial antes de o produto vencer.",
        },
        order: {
          us: "A carteira mostra o consumo já comprometido do estoque.",
          you: "Projeções confiáveis indicam quando haverá produto para os pedidos.",
          example: "Uma ruptura projetada para daqui a três semanas permite planejar os pedidos a tempo.",
        },
        fulfill: {
          us: "Cada faturamento muda o estoque e a projeção.",
          you: "Estoque equilibrado é atendimento sem falta e sem sobra.",
          example: "Faturamento abaixo do esperado em um produto acende o alerta de excesso.",
        },
        move: {
          us: "Avarias, bloqueios e movimentações mudam o estoque real.",
          you: "Menos excesso significa menos ocupação e menor custo de armazenagem.",
          example: "Um CD lotado de produto de baixa rotação limita o espaço para o que realmente gira.",
        },
        portfolio: {
          us: "Descontinuações exigem planejar o fim do estoque do produto antigo.",
          you: "Inventário evita que sobre produto descontinuado sem saída.",
          example: "Antes de um produto sair de linha, o estoque precisa ser reduzido aos poucos.",
        },
        returns: {
          us: "Devoluções aumentam o estoque, mas nem sempre o volume volta apto para venda.",
          you: "Tratar corretamente o que volta evita superestimar a disponibilidade.",
          example: "Um lote devolvido em análise de qualidade não pode ser contado como estoque disponível.",
        },
      },
      links: {
        demand: { gives: "Alertas que pedem revisar a demanda", gets: "O consumo futuro para projetar estoques" },
        supply: { gives: "Estoque atual e riscos que ajustam a produção", gets: "Disponibilidade futura" },
        drp: { gives: "Riscos de excesso ou ruptura por local", gets: "Movimentações que mudam a posição de estoque" },
        quotas: { gives: "Visão de estoque que apoia a distribuição", gets: "O consumo das cotas, que mostra a saída real" },
        digital: { gives: "Necessidade de alertas confiáveis", gets: "Projeções e alertas automatizados" },
      },
      quiz: [
        {
          q: "Por que Inventário olha para o estoque futuro, e não só para o atual?",
          options: [
            "Porque o estoque atual não importa",
            "Porque ruptura, excesso e vencimento aparecem na projeção, antes de acontecer",
            "Porque o futuro é mais fácil de medir",
          ],
          correct: 1,
          explain: "A projeção combina estoque atual, consumo futuro e disponibilidade futura. É ela que permite agir antes do problema.",
        },
        {
          q: "Qual é o dilema central da área?",
          options: ["Equilibrar disponibilidade e saúde financeira", "Escolher qual fábrica produz", "Definir rotas de transporte"],
          correct: 0,
          explain: "Pouco estoque gera ruptura e venda perdida. Muito estoque gera excesso, vencimento e capital parado.",
        },
        {
          q: "Um produto foi devolvido e está em análise de qualidade. Como ele deve ser visto?",
          options: ["Como estoque disponível para venda", "Descartado imediatamente", "Fora do disponível até estar apto"],
          correct: 2,
          explain: "Contar com um volume que não está apto superestima a disponibilidade, e o buraco aparece depois.",
        },
        {
          q: "O que acontece quando há estoque demais?",
          options: ["Nada, estoque é sempre seguro", "Capital parado, risco de vencimento e baixa rotação", "As vendas aumentam automaticamente"],
          correct: 1,
          explain: "Excesso também é risco. Por isso a área protege a saúde financeira tanto quanto a disponibilidade.",
        },
      ],
    },
    {
      id: "quotas",
      name: "Cotas",
      abbr: "COT",
      color: "#f0b429",
      img: "assets/chars/quotas.jpg",
      short: "Distribui com estratégia quando não há para todos",
      question: "Como distribuir quando não há para todos?",
      speech: "Quando a disponibilidade é limitada, a pior decisão é não decidir. Eu transformo restrição em estratégia.",
      pain: {
        headline: "Quando falta produto, quem decide quem recebe?",
        intro:
          "Há momentos em que a demanda supera a disponibilidade. Sem uma regra clara, quem pede primeiro leva tudo, e a estratégia comercial se perde.",
        without: [
          "São atendidos por ordem de chegada, não por prioridade.",
          "Disputam o mesmo volume sem transparência.",
          "Recebem pressão de todos os lados por um volume que não existe.",
          "Perde governança: cada decisão vira uma negociação caso a caso.",
        ],
      },
      mission: {
        statement: "Transformar restrições de disponibilidade em uma estratégia de distribuição.",
        reason: "Nem sempre existe produto suficiente para atender toda a demanda.",
        goal: "Distribuir da melhor forma possível quando não há para todos.",
        contribution: "Garantir governança, transparência e proteção da estratégia comercial.",
      },
      inputs: [
        { name: "Disponibilidade", from: "Supply Planning", why: "Define o tamanho do que pode ser distribuído." },
        { name: "Best Estimate", from: "Demand Planning", why: "Mostra a demanda que vai disputar esse volume." },
        { name: "Estratégia comercial", from: "Comercial", why: "Indica o que precisa ser protegido." },
        { name: "Prioridades do negócio", from: "Liderança", why: "Orientam as escolhas difíceis." },
        { name: "Necessidades regionais", from: "DRP e Units", why: "Mostram onde a falta dói mais." },
      ],
      doing: {
        questions: [
          "Quanto cada região ou canal deve receber?",
          "O que precisa ser protegido?",
          "Como manter a transparência para todos?",
          "Quando um volume pode ser remanejado?",
        ],
        thinking: [
          "Comparar demanda e disponibilidade",
          "Transformar restrição operacional em estratégia executável",
          "Alinhar Supply, Comercial e Mercado",
          "Acompanhar o consumo das cotas ao longo do mês",
        ],
        spotlight: "rateio",
        highlight: {
          title: "Devolução não devolve a cota",
          text: "Quando um cliente devolve, o produto volta ao estoque, mas a cota consumida no faturamento original não volta automaticamente. Para refaturar um item em restrição, pode ser preciso avaliar uma cota adicional.",
        },
      },
      value: {
        protects: ["A estratégia comercial", "Os clientes prioritários"],
        enables: ["Governança sobre o que é escasso", "Decisões transparentes"],
        improves: ["Distribuição equilibrada", "Confiança entre as áreas"],
      },
      outputs: [
        { name: "Cotas", users: ["Comercial", "Atendimento ao cliente"], impact: "Definem quanto cada um pode consumir." },
        { name: "Alocações", users: ["drp", "Comercial"], impact: "Direcionam o volume por região ou canal." },
        { name: "Rateios", users: ["Comercial", "Atendimento ao cliente"], impact: "Distribuem a falta de forma equilibrada e transparente." },
        { name: "Direcionamentos comerciais", users: ["Comercial"], impact: "Orientam onde vender com o que existe." },
      ],
      areas: {
        client: {
          us: "Pedidos e prioridades de clientes indicam onde a cota é mais necessária.",
          you: "A cota define quanto você pode vender de um produto em restrição, com regras claras.",
          example: "Com um produto em rateio, saber a cota disponível evita prometer o que não será faturado.",
        },
        order: {
          us: "Pedidos acima da cota sinalizam pressão real por volume.",
          you: "As regras de cota explicam por que um pedido aguarda ou sai parcial.",
          example: "Um pedido maior que a cota disponível pode precisar de um adicional aprovado.",
        },
        fulfill: {
          us: "O ritmo de consumo das cotas mostra para onde o volume está indo.",
          you: "Cotas bem distribuídas reduzem bloqueios no faturamento.",
          example: "Uma região que consome a cota rápido demais sinaliza a necessidade de revisão.",
        },
        move: {
          us: "A posição física do produto precisa sustentar as cotas definidas.",
          you: "Cotas alinhadas à rede evitam transferências de emergência.",
          example: "Remanejar cota entre regiões pode exigir movimentar o produto também.",
        },
        portfolio: {
          us: "Lançamentos com volume limitado precisam de estratégia de distribuição.",
          you: "As cotas garantem que um lançamento chegue aos clientes estratégicos.",
          example: "Um produto novo com pouca disponibilidade inicial é distribuído por prioridade.",
        },
        returns: {
          us: "Quando um cliente devolve, o produto volta, mas a cota consumida não volta automaticamente.",
          you: "Entender essa regra evita surpresas na hora de refaturar.",
          example: "Para refaturar um produto devolvido que está em rateio, pode ser preciso avaliar uma cota adicional.",
        },
      },
      links: {
        demand: { gives: "O consumo real, que mostra a demanda efetiva", gets: "O Best Estimate" },
        supply: { gives: "Prioridades quando não há para todos", gets: "As restrições de disponibilidade" },
        drp: { gives: "A distribuição que orienta o posicionamento", gets: "Produto posicionado para sustentar as cotas" },
        inventory: { gives: "O consumo das cotas", gets: "A visão de estoque" },
        digital: { gives: "Necessidade de acompanhar o consumo", gets: "Visibilidade diária das cotas" },
      },
      quiz: [
        {
          q: "Quando a área de Cotas se torna mais necessária?",
          options: ["Quando há produto de sobra", "Quando a demanda supera a disponibilidade", "Somente em lançamentos"],
          correct: 1,
          explain: "Cotas existe para responder: como distribuir da melhor forma quando não há para todos?",
        },
        {
          q: "Por que distribuir por ordem de chegada não é uma boa estratégia?",
          options: ["Porque ignora prioridades e a estratégia comercial", "Porque é mais lento", "Porque aumenta o estoque"],
          correct: 0,
          explain: "Quem pede primeiro não é necessariamente quem mais importa para a estratégia. A regra clara protege o negócio.",
        },
        {
          q: "Um cliente devolveu um produto em rateio e quer refaturar. O que acontece com a cota?",
          options: ["Volta automaticamente", "É cancelada para sempre", "Não volta sozinha: pode ser preciso avaliar um adicional"],
          correct: 2,
          explain: "O produto volta ao estoque, mas a cota foi consumida no faturamento original. O refaturamento exige avaliação.",
        },
        {
          q: "Qual é o principal valor da área para a Bayer?",
          options: ["Produzir mais rápido", "Governança e transparência sobre o que é escasso", "Reduzir o frete"],
          correct: 1,
          explain: "Cotas transforma restrição em estratégia, com regras claras e iguais para todos.",
        },
      ],
    },
    {
      id: "digital",
      name: "Digital",
      abbr: "DIG",
      color: "#b388ff",
      img: "assets/chars/digital.jpg",
      short: "Habilita decisões com dados confiáveis",
      question: "Estamos decidindo com a informação certa?",
      speech: "Eu não existo para criar painéis. Eu existo para que cada decisão da cadeia seja tomada com informação confiável.",
      pain: {
        headline: "Decisão rápida com dado errado é erro rápido.",
        intro:
          "Cada célula decide com base em números. Se cada uma olha para uma versão diferente, ou perde horas montando informação à mão, a cadeia fica lenta e desalinhada.",
        without: [
          "Recebem respostas lentas e informações conflitantes.",
          "Decidem com números diferentes dos de Planning.",
          "Recebem sinais tardios e inconsistentes.",
          "Gasta tempo com tarefas manuais em vez de analisar e decidir.",
        ],
      },
      mission: {
        statement: "Garantir que toda a cadeia tome decisões com informações confiáveis, estruturadas e acessíveis.",
        reason: "Sem informação confiável, nenhuma célula decide bem.",
        goal: "Habilitar decisões, não apenas criar painéis.",
        contribution: "Dar velocidade, padronização e escala para toda a cadeia de Planning.",
      },
      inputs: [
        { name: "Bases corporativas", from: "Fontes oficiais da empresa", why: "São a origem confiável dos dados." },
        { name: "Sistemas", from: "Sistemas da cadeia", why: "Registram o que acontece na operação." },
        { name: "Dados operacionais", from: "Operação do dia a dia", why: "Mostram a realidade como ela é." },
        { name: "Necessidades das células", from: "Todas as células de Planning", why: "Definem quais problemas resolver primeiro." },
      ],
      doing: {
        questions: [
          "A informação é confiável?",
          "Todos olham para o mesmo número?",
          "O que pode deixar de ser manual?",
          "Qual necessidade de uma célula pode virar solução?",
        ],
        thinking: [
          "Atuar como enabler de todas as células",
          "Garantir qualidade e consistência dos dados",
          "Transformar dados em informação útil",
          "Eliminar atividades manuais",
        ],
        spotlight: "pillars",
      },
      value: {
        protects: ["A confiabilidade das decisões"],
        enables: ["Velocidade", "Escalabilidade"],
        improves: ["Produtividade", "Padronização", "Visibilidade"],
      },
      outputs: [
        { name: "Dashboards e indicadores", users: ["demand", "supply", "drp", "inventory", "quotas"], impact: "Mostram a situação da cadeia de forma clara." },
        { name: "Bases estruturadas", users: ["demand", "supply", "drp", "inventory", "quotas"], impact: "Uma única fonte de verdade para todos." },
        { name: "Automações", users: ["demand", "supply", "drp", "inventory", "quotas"], impact: "Liberam tempo para analisar e decidir." },
        { name: "Soluções para tomada de decisão", users: ["Liderança", "demand", "supply", "drp", "inventory", "quotas"], impact: "Transformam necessidades em ação." },
      ],
      areas: {
        client: {
          us: "Informações registradas com qualidade alimentam as análises da cadeia.",
          you: "Dados confiáveis significam respostas mais rápidas e consistentes para o cliente.",
          example: "Quando todos olham o mesmo número de disponibilidade, a resposta ao cliente é uma só.",
        },
        order: {
          us: "A qualidade do registro do pedido afeta tudo o que vem depois.",
          you: "Visibilidade sobre a carteira ajuda a priorizar e acompanhar pedidos.",
          example: "Um pedido com dado incorreto pode distorcer a leitura de demanda de uma região inteira.",
        },
        fulfill: {
          us: "Os dados de atendimento mostram se o plano está funcionando.",
          you: "Indicadores claros mostram onde o atendimento está em risco.",
          example: "Um alerta antecipado de falta permite agir antes de o pedido travar.",
        },
        move: {
          us: "Dados de movimentação e estoque por local alimentam a visão da rede.",
          you: "Visibilidade da rede ajuda a planejar a operação com antecedência.",
          example: "Conhecer hoje as transferências da próxima semana organiza a operação.",
        },
        portfolio: {
          us: "Cadastros corretos de produtos sustentam todas as análises.",
          you: "Dados estruturados mostram o desempenho de cada produto.",
          example: "Um produto novo cadastrado corretamente entra nas análises desde o primeiro dia.",
        },
        returns: {
          us: "O registro correto do status do que volta evita leituras erradas de estoque.",
          you: "Visibilidade sobre devoluções revela padrões e causas.",
          example: "Devoluções registradas com motivo permitem identificar um problema recorrente.",
        },
      },
      links: {
        demand: { gives: "Bases estruturadas para construir a previsão", gets: "Necessidades de análise de mercado" },
        supply: { gives: "Visibilidade de riscos e restrições", gets: "Dados de capacidade e produção" },
        drp: { gives: "Visão da posição de estoque e da carteira", gets: "Necessidade de enxergar a rede" },
        inventory: { gives: "Projeções e alertas automatizados", gets: "Critérios para identificar riscos" },
        quotas: { gives: "Visibilidade diária do consumo de cotas", gets: "Necessidade de transparência na distribuição" },
      },
      quiz: [
        {
          q: "Qual é a principal razão de existir da área Digital?",
          options: ["Criar dashboards", "Habilitar decisões com informações confiáveis", "Operar os sistemas da empresa"],
          correct: 1,
          explain: "Painéis são um meio. O fim é que cada decisão da cadeia seja tomada com informação confiável.",
        },
        {
          q: "Duas células usam números diferentes para o mesmo produto. Qual pilar resolve isso?",
          options: ["Automação", "Visibilidade", "Governança de dados"],
          correct: 2,
          explain: "Governança garante qualidade e consistência: todos decidem a partir da mesma verdade.",
        },
        {
          q: "Por que a automação gera valor para a cadeia?",
          options: [
            "Elimina tarefas manuais e libera tempo para analisar e decidir",
            "Substitui as pessoas nas decisões",
            "Reduz a quantidade de dados",
          ],
          correct: 0,
          explain: "Automação aumenta produtividade: menos tempo montando informação, mais tempo pensando a cadeia.",
        },
        {
          q: "Por que Digital é chamado de enabler?",
          options: [
            "Porque decide pelas outras células",
            "Porque transforma necessidades das células em soluções que habilitam decisões",
            "Porque cuida só de tecnologia",
          ],
          correct: 1,
          explain: "Digital suporta Demand, Supply, DRP, Inventário e Cotas, convertendo necessidades operacionais em soluções.",
        },
      ],
    },
  ];

  const GUIDES = {
    lia: { name: "Lia", img: "assets/chars/lia.jpg" },
    theo: { name: "Theo", img: "assets/chars/theo.jpg" },
  };

  global.CDCData = { MODULES, AREA_PROFILES, IMPACT_WHO, CELLS, GUIDES };
})(window);
