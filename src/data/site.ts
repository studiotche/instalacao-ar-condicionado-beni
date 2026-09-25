export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface TrustItem {
  readonly title: string;
  readonly description: string;
  readonly icon: "tool" | "gear" | "team" | "location";
}

export interface ServiceItem {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly tag: string;
  readonly image: string;
  readonly alt: string;
}

export interface InstallationPillar {
  readonly title: string;
  readonly description: string;
}

export interface ProcessStep {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface SolutionData {
  readonly badge: string;
  readonly headline: string;
  readonly text: string;
  readonly image: string;
  readonly alt: string;
  readonly highlights: readonly string[];
}

export interface DifferentialItem {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface ProjectItem {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly location: string;
  readonly image: string;
  readonly alt: string;
  readonly highlights?: readonly string[];
}

export interface AboutPillar {
  readonly label: string;
  readonly text: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface TestimonialItem {
  readonly id: string;
  readonly author: string;
  readonly city: string;
  readonly text: string;
  readonly rating: number;
  readonly source: string;
}

export const siteData = {
  company: {
    name: "Beni Climatização",
    legalName: "Beni Climatização Ltda.",
    city: "Ivoti",
    state: "RS",
    locationString: "Ivoti — Rio Grande do Sul",
    regionCovered: "Ivoti e região",
    phone: "051996684483",
    phoneRaw: "5551996684483",
    whatsapp: "051996684483",
    whatsappRaw: "5551996684483",
    email: "contato@beniclimatizacao.com.br",
    instagram: "@beniclimatizacao",
    instagramUrl: "https://www.instagram.com/beniclimatizacao/",
    mapsUrl: "https://www.google.com/search?q=BENI+ar+condicionado&rlz=1C1HKFL_pt-PTBR1212BR1212&oq=BENI+ar+condicionado",
    rating: "4,9",
    reviewsCount: "77 avaliações no Google",
    hours: {
      weekdays: "Segunda a Sexta: 08:00 às 19:00",
      saturday: "Sábado: 08:00 às 12:00",
      sunday: "Plantão Emergencial via WhatsApp",
    },
    address: {
      street: "Ivoti",
      neighborhood: "Centro",
      city: "Ivoti",
      state: "RS",
      zip: "93900-000",
      country: "Brasil",
      plusCode: "Ivoti - RS",
    },
  },
  seo: {
    title: "Beni Climatização | Ar-Condicionado Residencial e Comercial em Ivoti/RS",
    description: "Beni Climatização: Empresa de ar-condicionado em Ivoti com técnicos qualificados. Instalação, manutenção, conserto, PMOC, VRF/VRV, câmara fria e rapel.",
    canonicalUrl: "https://beniclimatizacao.com.br/",
    ogImage: "/assets/images/og-beni-climatizacao.jpg",
    keywords: "ar-condicionado Ivoti, instalação de ar-condicionado em Ivoti, manutenção de ar-condicionado Ivoti, higienização de ar-condicionado, PMOC Ivoti, VRF, VRV, câmara fria, rapel, Beni Climatização",
  },
  navigation: [
    { label: "Serviços", href: "#servicos" },
    { label: "Como trabalhamos", href: "#processo" },
    { label: "Projetos", href: "#projetos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Contato", href: "#contato" },
  ] as const satisfies readonly NavItem[],
  hero: {
    eyebrow: "REFRIGERAÇÃO E CLIMATIZAÇÃO PROFISSIONAL • IVOTI/RS",
    headlinePart1: "Instalação, manutenção",
    headlinePart2: "e revisão de ar-condicionado em Ivoti com a",
    headlineHighlight: "Beni Climatização.",
    description: "Empresa de ar-condicionado com técnicos qualificados, prontos para oferecer serviços residenciais e comerciais. Diagnóstico completo, eficiência e segurança para cada situação.",
    primaryCta: "Solicitar orçamento",
    secondaryCta: "Conheça nossos serviços",
    image: {
      url: "/assets/images/instalador-ar-condicionado-beni.webp",
      alt: "Instalador profissional de ar-condicionado da Beni Climatização realizando serviço técnico",
      width: 1924,
      height: 994,
    },
    imageMobile: {
      url: "/assets/images/instalador-ar-condicionado-beni-m.webp",
      alt: "Instalador profissional de ar-condicionado da Beni Climatização em atendimento técnico",
      width: 779,
      height: 813,
    },
  },
  trustBar: [
    { title: "Técnicos qualificados", description: "Profissionalismo, confiança e diagnóstico completo", icon: "team" },
    { title: "Residencial e Comercial", description: "Atendimento completo para residências e empresas", icon: "location" },
    { title: "Soluções Técnicas", description: "PMOC, VRF / VRV, Câmara fria e Rapel", icon: "gear" },
    { title: "Manutenção e Limpeza", description: "Ambientes mais saudáveis e confortáveis", icon: "tool" },
  ] as const satisfies readonly TrustItem[],
  services: {
    eyebrow: "Serviços Especializados",
    title: "Climatização profissional de ponta a ponta.",
    description: "De instalações residenciais simples a projetos comerciais complexos como PMOC e VRF. Oferecemos soluções completas para o seu conforto.",
    items: [
      {
        number: "01",
        title: "Instalação de ar-condicionado",
        description: "Execução no padrão oficial dos fabricantes. Trabalhamos com Split, Multi-split e instalações complexas em altura (Rapel).",
        tag: "Split • Multi • Rapel",
        image: "/assets/images/instalcao-ar-condicionado.webp",
        alt: "Técnico da Beni Climatização realizando instalação de ar-condicionado em Ivoti",
      },
      {
        number: "02",
        title: "Higienização e Limpeza",
        description: "Serviços de limpeza e higienização garantindo ambientes mais saudáveis, confortáveis e eliminando ácaros, fungos e odores.",
        tag: "Saúde • Sanitização",
        image: "/assets/images/servico-higienizacao.webp",
        alt: "Higienização profunda executada pela Beni Climatização",
      },
      {
        number: "03",
        title: "Manutenção e Conserto",
        description: "Antes de qualquer ação, realizamos um diagnóstico completo para escolher o método mais seguro e eficiente de conserto ou revisão.",
        tag: "Diagnóstico Rápido • Peças",
        image: "/assets/images/manutencao-preventiva.webp",
        alt: "Técnico da Beni Climatização realizando manutenção corretiva e diagnóstico",
      },
      {
        number: "04",
        title: "PMOC (Plano de Manutenção)",
        description: "Implementação e gestão do Plano de Manutenção, Operação e Controle (PMOC) para empresas, exigido por lei, garantindo a qualidade do ar.",
        tag: "Comercial • Legislação",
        image: "/assets/images/servico-climatizacao.webp",
        alt: "Manutenção comercial PMOC pela Beni Climatização",
      },
      {
        number: "05",
        title: "Sistemas VRF / VRV",
        description: "Instalação e manutenção de sistemas de fluxo de refrigerante variável (VRF/VRV), ideais para climatização central de edifícios e empresas.",
        tag: "Alta Capacidade • Eficiência",
        image: "/assets/images/instalacao-detalhe.webp",
        alt: "Serviço especializado de VRF / VRV em Ivoti",
      },
      {
        number: "06",
        title: "Câmara Fria",
        description: "Projetos, instalação e manutenção de câmaras frigoríficas para conservação de produtos, garantindo temperatura exata e confiabilidade.",
        tag: "Refrigeração • Conservação",
        image: "/assets/images/servico-carga-gas.webp",
        alt: "Instalação de câmara fria com a Beni Climatização",
      },
    ] as const satisfies readonly ServiceItem[],
  },
  installation: {
    headline: "Uma climatização eficiente começa com uma escolha técnica segura.",
    text: "Na Beni Climatização, antes de qualquer ação, realizamos um diagnóstico completo para escolher o método mais seguro e eficiente para cada situação, seja em um quarto residencial ou em uma grande rede de VRF.",
    image: {
      url: "/assets/images/intalacao-bem-executada.webp",
      alt: "Técnico da Beni Climatização executando instalação técnica",
      width: 640,
      height: 800,
    },
    pillars: [
      {
        title: "Técnicos Qualificados",
        description: "Nossa equipe está pronta para lidar com qualquer desafio, desde splits simples até trabalhos em altura com rapel.",
      },
      {
        title: "Diagnóstico Completo",
        description: "Avaliamos minuciosamente o ambiente e o equipamento antes de sugerir qualquer conserto ou nova instalação.",
      },
      {
        title: "Soluções Comerciais",
        description: "Expertise em PMOC, Câmaras Frias e sistemas VRF/VRV para atender empresas com máxima qualidade.",
      },
      {
        title: "Ambientes Saudáveis",
        description: "Higienização profunda que garante a qualidade do ar que você e seus clientes respiram diariamente.",
      },
    ] as const satisfies readonly InstallationPillar[],
  },
  process: {
    eyebrow: "Metodologia Transparente",
    headline: "Do orçamento ao conforto, sem complicações.",
    description: "Atendimento transparente e diagnóstico preciso para que você saiba exatamente o que será feito no seu equipamento.",
    steps: [
      { number: "01", title: "Contato", description: "Você nos chama e relata sua necessidade comercial ou residencial." },
      { number: "02", title: "Diagnóstico", description: "Avaliamos o ambiente ou o equipamento para identificar o método mais eficiente." },
      { number: "03", title: "Orçamento", description: "Apresentamos a proposta com os serviços adequados de forma clara e profissional." },
      { number: "04", title: "Execução", description: "Nossos técnicos qualificados realizam o trabalho com segurança e organização." },
      { number: "05", title: "Entrega", description: "Sistema testado, higienizado e operando perfeitamente nas melhores condições." },
    ] as const satisfies readonly ProcessStep[],
  },
  solutions: {
    eyebrow: "Soluções Sob Medida",
    title: "Residencial e Comercial",
    description: "Atendemos tanto residências quanto empresas, com qualidade, confiança e profissionalismo para qualquer demanda.",
    residential: {
      badge: "RESIDENCIAL",
      headline: "Conforto térmico e saúde para o seu lar.",
      text: "Instalação, manutenção, higienização e conserto de aparelhos de ar-condicionado na sua casa.",
      image: "/assets/images/residencial-comercial.webp",
      alt: "Ambiente residencial com climatização instalada pela Beni Climatização",
      highlights: [
        "Instalação de splits com acabamento de alto padrão",
        "Limpeza profunda para eliminar mofo e odores dos quartos",
        "Diagnóstico rápido para aparelhos que pararam de gelar",
      ],
    } satisfies SolutionData,
    corporate: {
      badge: "COMERCIAL",
      headline: "Climatização profissional pesada para o seu negócio.",
      text: "Sistemas VRF/VRV, Câmaras Frias, PMOC e manutenções em altura.",
      image: "/assets/images/climatizacao-profissional-para-seu-comercio-ou-escritorio.webp",
      alt: "Instalação comercial executada pela Beni Climatização",
      highlights: [
        "Elaboração e execução de PMOC exigido por lei",
        "Trabalhos em altura com equipe especializada em Rapel",
        "Manutenção de Câmaras Frias para garantia da sua operação",
      ],
    } satisfies SolutionData,
  },
  differentials: {
    eyebrow: "Nosso Diferencial",
    headline: "Por que escolher a Beni Climatização?",
    description: "Somos uma empresa de ar-condicionado em Ivoti reconhecida pela excelência em todas as áreas da refrigeração.",
    items: [
      {
        number: "01",
        title: "Técnicos Qualificados",
        description: "Equipe preparada para lidar com os equipamentos mais complexos do mercado.",
      },
      {
        number: "02",
        title: "Rapel e Altura",
        description: "Instalação e manutenção em locais de difícil acesso com total segurança usando técnicas de rapel.",
      },
      {
        number: "03",
        title: "Diagnóstico Completo",
        description: "Não fazemos 'achismos'. Realizamos análises técnicas precisas antes de qualquer ação.",
      },
      {
        number: "04",
        title: "Amplo Portfólio",
        description: "Atendemos de residências a indústrias, com PMOC, Câmaras Frias e sistemas centrais.",
      },
      {
        number: "05",
        title: "Avaliação 4,9 no Google",
        description: "Mais de 77 avaliações positivas comprovando nosso padrão de qualidade e confiança.",
      },
      {
        number: "06",
        title: "Foco na Saúde",
        description: "Higienização avançada que garante ambientes mais saudáveis e confortáveis.",
      },
    ] as const satisfies readonly DifferentialItem[],
  },
  projects: {
    eyebrow: "Execuções Reais",
    title: "Serviços realizados",
    description: "Trabalhos que atestam nossa qualidade técnica em Ivoti e região.",
    items: [
      {
        id: "proj-1",
        title: "Manutenção Profissional e Diagnóstico",
        category: "Manutenção",
        location: "Ivoti — RS",
        image: "/assets/images/projeto-split-samsung.webp",
        alt: "Atendimento técnico especializado da Beni Climatização",
      },
      {
        id: "proj-2",
        title: "Higienização e Limpeza de Ar-Condicionado",
        category: "Higienização",
        location: "Ivoti — RS",
        image: "/assets/images/higienizacao-completa.webp",
        alt: "Limpeza de equipamento de ar-condicionado para melhor qualidade do ar",
      },
    ] as const satisfies readonly ProjectItem[],
  },
  about: {
    eyebrow: "Quem Somos",
    headline: "Qualidade, confiança e profissionalismo em cada atendimento.",
    copy: "Somos uma empresa de ar-condicionado em Ivoti com técnicos qualificados, prontos para oferecer serviços de instalação, manutenção, conserto e revisão residencial e comercial. Nossa assistência técnica atende desde pequenas manutenções em splits até PMOC, Câmaras Frias, VRF e trabalhos em altura com rapel. Garantimos ambientes mais saudáveis e confortáveis para todos os nossos clientes.",
    image: {
      url: "/assets/images/sobre-fundador.webp",
      alt: "Técnico da Beni Climatização em atendimento",
      width: 700,
      height: 525,
    },
    facilityImage: {
      url: "/assets/images/equipe.webp",
      alt: "Equipe técnica da Beni Climatização",
      label: "Equipe Qualificada",
      width: 320,
      height: 200,
    },
    vehicleImage: {
      url: "/assets/images/sobre-ferramental.webp",
      alt: "Ferramentas profissionais da Beni Climatização",
      label: "Estrutura Completa",
      width: 320,
      height: 200,
    },
    pillars: [
      {
        label: "Compromisso Técnico",
        text: "Diagnóstico completo antes de qualquer ação para escolher o método mais seguro e eficiente.",
      },
      {
        label: "Atendimento em Ivoti",
        text: "Base local em Ivoti/RS, prestando serviços de qualidade na região para empresas e residências.",
      },
      {
        label: "Segurança e Confiança",
        text: "Garantia de serviço bem feito, refletida nas nossas avaliações positivas de clientes satisfeitos.",
      },
    ] as const satisfies readonly AboutPillar[],
  },
  testimonials: {
    eyebrow: "DEPOIMENTOS NO GOOGLE",
    title: "O que nossos clientes dizem",
    description: "Com uma nota 4,9 baseada em mais de 77 avaliações, a Beni Climatização tem o reconhecimento de quem confia no nosso trabalho.",
    googleRating: "4,9",
    reviewsCount: "77 avaliações no Google",
    items: [
      {
        id: "test-1",
        author: "Jeferson Salles",
        city: "Ivoti / RS",
        rating: 5,
        source: "Avaliação Google",
        text: "Atendimento top, demostra segurança e entendimento no assunto, desde o primeiro contato até o encerramento dos trabalhos, parabéns, e com certeza recomendo",
      },
      {
        id: "test-2",
        author: "Rodrigo Machado",
        city: "Ivoti / RS",
        rating: 5,
        source: "Avaliação Google",
        text: "Boa tarde. Atendimento 100%! Superou as expectativas! Foi feita a retirada das peças a serem substituídas no sábado e do domingo foi feita a montagem das novas. Serviço perfeito.",
      },
      {
        id: "test-3",
        author: "Tiessa Staudt",
        city: "Ivoti / RS",
        rating: 5,
        source: "Avaliação Google",
        text: "Atendimento muito bom, com agilidade resolveu o problema do nosso ar condicionado e esta funcionando tudo certinho! Também é perceptível que o trabalho é honesto e transparente, o Beni explica tudo certinho sobre o que precisa ser feito!",
      },
      {
        id: "test-4",
        author: "Laerti Manske",
        city: "Ivoti / RS",
        rating: 5,
        source: "Avaliação Google",
        text: "O Beni já realizou a instalação e a limpeza dos aparelhos de ar-condicionado na minha residência. É um profissional altamente qualificado, com amplo conhecimento técnico e muito caprichoso na execução do serviço. Recomendo pelo excelente trabalho e pela dedicação.",
      },
      {
        id: "test-5",
        author: "Thiago Santos",
        city: "Ivoti / RS",
        rating: 5,
        source: "Avaliação Google",
        text: "Ótimo profissional. Fez o dimensionamento e instalação de um Ar Inverter 36.000btus Piso Teto Gree na minha loja.",
      },
      {
        id: "test-6",
        author: "Alison Vogel",
        city: "Ivoti / RS",
        rating: 5,
        source: "Avaliação Google",
        text: "Excelente profissional. Conheço o Beni já a muitos anos. Um dos únicos na região capacitados para trabalho em altura.",
      },
    ] as const satisfies readonly TestimonialItem[],
  },
  faq: [
    {
      question: "Vocês atendem apenas residências ou também empresas?",
      answer: "Nossa assistência técnica de ar-condicionado atende tanto residências quanto empresas. Oferecemos serviços residenciais (splits, limpeza) e comerciais de alta complexidade como PMOC, VRF/VRV, Câmaras Frias e instalações em altura com rapel.",
    },
    {
      question: "Qual o foco do diagnóstico completo de vocês?",
      answer: "Antes de qualquer conserto, instalação ou revisão, realizamos um diagnóstico completo para escolher o método mais seguro e eficiente para cada situação. Não fazemos trocas desnecessárias de peças, garantimos a melhor solução técnica.",
    },
    {
      question: "O que é PMOC e vocês realizam?",
      answer: "Sim. O PMOC (Plano de Manutenção, Operação e Controle) é um conjunto de documentos e procedimentos exigidos por lei para edifícios e empresas. Nós implementamos e gerenciamos o PMOC do seu negócio com excelência.",
    },
    {
      question: "Por que contratar a higienização da Beni Climatização?",
      answer: "Oferecemos serviços de limpeza e higienização profunda que removem ácaros, mofo e bactérias, garantindo ambientes mais saudáveis e confortáveis para sua casa ou escritório, além de melhorar o rendimento do equipamento.",
    },
    {
      question: "Vocês realizam instalações em locais de difícil acesso?",
      answer: "Sim! Um dos nossos diferenciais é a qualificação para trabalhos em altura. Nossa equipe realiza instalações e manutenções com técnicas de rapel, garantindo que mesmo os serviços difíceis sejam feitos com segurança.",
    },
    {
      question: "Quais cidades a Beni Climatização atende?",
      answer: "Nossa base e foco principal de atendimento estão em Ivoti — RS. Atuamos fortemente na cidade e região, trazendo qualidade, confiança e profissionalismo para quem busca uma empresa de ar-condicionado completa.",
    },
    {
      question: "Como funciona o agendamento de orçamento?",
      answer: "Basta clicar em qualquer botão de WhatsApp na página ou ligar para (51) 99668-4483. Nos diga qual serviço precisa (instalação, manutenção, conserto ou limpeza) e agendaremos uma visita técnica com nossos especialistas.",
    },
  ] as const satisfies readonly FaqItem[],
  finalCta: {
    eyebrow: "Fale Diretamente Conosco",
    headline: "A solução certa para o seu conforto térmico e do seu negócio.",
    text: "Fale com a Beni Climatização e agende um diagnóstico técnico rápido pelo WhatsApp.",
    buttonText: "Solicitar orçamento pelo WhatsApp",
    secondaryButtonText: "Ver nossas avaliações",
    location: "Ivoti • RS",
  },
} as const;

export const buildWhatsAppUrl = (message: string): string => {
  return `https://wa.me/${siteData.company.whatsappRaw}?text=${encodeURIComponent(message)}`;
};

export interface QuoteOption {
  readonly value: string;
  readonly label: string;
  readonly hint?: string;
}

export const quoteFunnel = {
  services: [
    { value: "Instalação de ar-condicionado", label: "Instalação", hint: "Split • Multi • Rapel" },
    { value: "Higienização e limpeza", label: "Higienização", hint: "Saúde • Odores" },
    { value: "Manutenção e conserto", label: "Manutenção", hint: "Não gela • Defeito" },
    { value: "PMOC", label: "PMOC", hint: "Empresas • Lei" },
    { value: "VRF / VRV", label: "VRF / VRV", hint: "Central • Edifícios" },
    { value: "Câmara fria", label: "Câmara fria", hint: "Refrigeração" },
  ] as const satisfies readonly QuoteOption[],
  propertyTypes: [
    { value: "Casa", label: "Casa" },
    { value: "Apartamento", label: "Apartamento" },
    { value: "Comércio / Empresa", label: "Comércio" },
    { value: "Indústria", label: "Indústria" },
  ] as const satisfies readonly QuoteOption[],
  installOwnership: [
    { value: "Já tenho Split", label: "Já tenho Split" },
    { value: "Já tenho Janela", label: "Já tenho Janela" },
    { value: "Não tenho — preciso de indicação", label: "Não tenho" },
  ] as const satisfies readonly QuoteOption[],
  roomCounts: [
    { value: "1 ambiente", label: "1 ambiente" },
    { value: "2 a 3 ambientes", label: "2 a 3" },
    { value: "4 ou mais ambientes", label: "4+" },
  ] as const satisfies readonly QuoteOption[],
  maintenanceIssues: [
    { value: "Não gela / gelando pouco", label: "Não gela" },
    { value: "Pingando / vazando água", label: "Pingando" },
    { value: "Barulho / mau cheiro", label: "Barulho / cheiro" },
    { value: "Não liga", label: "Não liga" },
    { value: "Outro defeito", label: "Outro" },
  ] as const satisfies readonly QuoteOption[],
  hygieneCounts: [
    { value: "1 aparelho", label: "1 aparelho" },
    { value: "2 a 3 aparelhos", label: "2 a 3" },
    { value: "4 ou mais aparelhos", label: "4+" },
  ] as const satisfies readonly QuoteOption[],
  lastCleaning: [
    { value: "Nunca foi limpo", label: "Nunca" },
    { value: "Há mais de 1 ano", label: "+1 ano" },
    { value: "Há menos de 1 ano", label: "<1 ano" },
  ] as const satisfies readonly QuoteOption[],
  commercialSizes: [
    { value: "Pequeno comércio", label: "Peq. comércio" },
    { value: "Edifício / escritório", label: "Edifício" },
    { value: "Indústria / grande porte", label: "Indústria" },
  ] as const satisfies readonly QuoteOption[],
  urgencies: [
    { value: "Preciso essa semana", label: "Essa semana", hint: "Prioritário" },
    { value: "Próximos 15 dias", label: "15 dias", hint: "Em breve" },
    { value: "Só pesquisando preço", label: "Pesquisando", hint: "Orçamento" },
  ] as const satisfies readonly QuoteOption[],
  cities: [
    "Ivoti",
    "Dois Irmãos",
    "Estância Velha",
    "Novo Hamburgo",
    "Lindolfo Collor",
    "Presidente Lucena",
    "Outra cidade",
  ] as const,
} as const;

export const getLeadTag = (urgency: string): string => {
  if (urgency.includes("semana")) return "[QUENTE]";
  if (urgency.includes("15 dias")) return "[MORNO]";
  return "[PESQUISA]";
};
