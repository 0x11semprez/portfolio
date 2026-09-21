// Each stack is a "product". `what` explains the tech to a recruiter who
// doesn't know it, `how` is what you actually do with it, both `{ en, fr }`
// (the language switch in the header picks one). `link` is the
// official site, shown as a ↗ next to the name (`icon` is kept for reference,
// the page no longer shows brand logos).
// `category` is one of STACK_CATEGORIES (spelled exactly the same, that's what
// the filter matches on), or an array when a stack belongs to several (Solidity
// is both a language and a blockchain tool). Order here = grid order.
export const STACK_CATEGORIES = [
  "languages",
  "tools",
  "databases",
  "blockchain tools",
];

export const STACKS = [
  {
    slug: "cpp",
    icon: "cplusplus",
    name: "C++",
    category: "languages",
    image: "/images/stacks/cpp.svg",
    link: "https://isocpp.org",
    what: {
      en: "The language underneath everything that has to be fast: game engines, trading systems, browsers, operating systems. Direct control over memory and hardware, no safety net.",
      fr: "Le langage sous tout ce qui doit être rapide : moteurs de jeu, systèmes de trading, navigateurs, systèmes d'exploitation. Contrôle direct de la mémoire et du matériel, sans filet.",
    },
    how: {
      en: "Low-latency systems, performance-critical code, anything where every microsecond counts.",
      fr: "Systèmes basse latence, code critique en performance, tout ce où chaque microseconde compte.",
    },
    level: "primary",
  },
  {
    slug: "go",
    icon: "go",
    name: "Go",
    category: "languages",
    image: "/images/stacks/go.svg",
    link: "https://go.dev",
    what: {
      en: "Google's language for backend services. Simple syntax, built-in concurrency, compiles to a single binary. Most cloud infrastructure (Docker, Kubernetes) is written in it.",
      fr: "Le langage de Google pour les services backend. Syntaxe simple, concurrence intégrée, compile en un seul binaire. La plupart de l'infrastructure cloud (Docker, Kubernetes) est écrite avec.",
    },
    how: {
      en: "APIs, CLIs, infrastructure tooling.",
      fr: "APIs, CLIs, outillage d'infrastructure.",
    },
    level: "working",
  },
  {
    slug: "rust",
    icon: "rust",
    name: "Rust",
    category: "languages",
    image: "/images/stacks/rust.svg",
    link: "https://www.rust-lang.org",
    what: {
      en: "A systems programming language with no garbage collector and no runtime. Memory safety is checked at compile time, so the class of bugs that crashes C/C++ programs simply cannot be written.",
      fr: "Un langage système sans ramasse-miettes ni runtime. La sûreté mémoire est vérifiée à la compilation : la classe de bugs qui fait planter les programmes C/C++ ne peut tout simplement pas s'écrire.",
    },
    how: {
      en: "Networking layers, cryptographic transports, anything where latency and correctness both matter.",
      fr: "Couches réseau, transports cryptographiques, tout ce où latence et exactitude comptent autant.",
    },
    level: "primary",
  },
  {
    slug: "python",
    icon: "python",
    name: "Python",
    category: "languages",
    image: "/images/stacks/python.svg",
    link: "https://python.org",
    what: {
      en: "General-purpose scripting language. The default for automation, data work and prototyping.",
      fr: "Langage de script généraliste. Le choix par défaut pour l'automatisation, la donnée et le prototypage.",
    },
    how: {
      en: "Glue scripts, automation, quick experiments before rewriting in Rust.",
      fr: "Scripts de liaison, automatisation, expériences rapides avant réécriture en Rust.",
    },
    level: "working",
  },
  {
    slug: "noir",
    icon: "link",
    name: "Noir",
    category: ["languages", "blockchain tools"],
    image: "/images/stacks/noir.png",
    link: "https://noir-lang.org",
    what: {
      en: "A language for writing zero-knowledge circuits: programs that prove a statement is true without revealing the data behind it.",
      fr: "Un langage pour écrire des circuits à divulgation nulle : des programmes qui prouvent qu'une affirmation est vraie sans révéler les données derrière.",
    },
    how: {
      en: "Privacy primitives and proof circuits in research work.",
      fr: "Primitives de confidentialité et circuits de preuve en travaux de recherche.",
    },
    level: "working",
  },
  {
    slug: "solidity",
    icon: "solidity",
    name: "Solidity",
    category: ["languages", "blockchain tools"],
    image: "/images/stacks/solidity.svg",
    link: "https://soliditylang.org",
    what: {
      en: "The language of Ethereum smart contracts: programs that run on the blockchain and move real money. Every instruction costs gas, so efficiency is measured in cents.",
      fr: "Le langage des smart contracts Ethereum : des programmes qui tournent sur la blockchain et déplacent de l'argent réel. Chaque instruction coûte du gas, l'efficacité se mesure en centimes.",
    },
    how: {
      en: "Gas-optimized contracts, low-level Yul/assembly, Foundry test suites.",
      fr: "Contrats optimisés en gas, Yul/assembleur bas niveau, suites de tests Foundry.",
    },
    level: "primary",
  },
  {
    slug: "postgres",
    icon: "postgresql",
    name: "Postgres",
    category: "databases",
    image: "/images/stacks/postgresql.svg",
    link: "https://www.postgresql.org",
    what: {
      en: "The most trusted open-source relational database. Strict about data integrity, extensible, and it scales further than most teams will ever need.",
      fr: "La base de données relationnelle open source la plus fiable. Stricte sur l'intégrité des données, extensible, et elle monte en charge bien plus loin que la plupart des équipes n'en auront besoin.",
    },
    how: {
      en: "Schema design, indexing, query tuning. Default database for every service I build.",
      fr: "Conception de schémas, indexation, optimisation de requêtes. Base par défaut de chaque service que je construis.",
    },
    level: "working",
  },
  {
    slug: "aws",
    icon: "link",
    name: "AWS",
    category: "tools",
    image: "/images/stacks/aws.svg",
    link: "https://aws.amazon.com",
    what: {
      en: "Amazon's cloud: rented servers, storage, networking and hundreds of managed services, billed by the hour.",
      fr: "Le cloud d'Amazon : serveurs, stockage, réseau et des centaines de services managés, facturés à l'heure.",
    },
    how: {
      en: "Architecture design, cost optimisation (FinOps), IAM and networking.",
      fr: "Conception d'architecture, optimisation des coûts (FinOps), IAM et réseau.",
    },
    level: "primary",
  },
  {
    slug: "docker",
    icon: "docker",
    name: "Docker",
    category: "tools",
    image: "/images/stacks/docker.svg",
    link: "https://docker.com",
    what: {
      en: "Packages an application with everything it needs into a container, so it runs identically on a laptop and in production.",
      fr: "Empaquette une application avec tout ce dont elle a besoin dans un conteneur, pour qu'elle tourne à l'identique sur un portable et en production.",
    },
    how: {
      en: "Every service I ship is containerised. Multi-stage builds, minimal images.",
      fr: "Chaque service que je livre est conteneurisé. Builds multi-étapes, images minimales.",
    },
    level: "primary",
  },
  {
    slug: "git",
    icon: "git",
    name: "Git",
    category: "tools",
    image: "/images/stacks/git.svg",
    link: "https://git-scm.com",
    what: {
      en: "Version control: the full history of every change to a codebase, and the way teams collaborate on it.",
      fr: "Gestion de versions : l'historique complet de chaque changement d'un code, et la façon dont les équipes collaborent dessus.",
    },
    how: {
      en: "Daily. Clean history, small commits, reviewable branches.",
      fr: "Tous les jours. Historique propre, petits commits, branches relisibles.",
    },
    level: "primary",
  },
  {
    slug: "ci-cd",
    icon: "githubactions",
    name: "CI / CD",
    category: "tools",
    image: "/images/stacks/githubactions.svg",
    link: "https://github.com/features/actions",
    what: {
      en: "Continuous integration and delivery: every change is automatically tested and deployed, without a human clicking buttons.",
      fr: "Intégration et livraison continues : chaque changement est testé et déployé automatiquement, sans qu'un humain clique.",
    },
    how: {
      en: "GitHub Actions pipelines: lint, test, build, deploy.",
      fr: "Pipelines GitHub Actions : lint, test, build, déploiement.",
    },
    level: "working",
  },
];

// Always an array, whatever shape `category` was written in.
export const stackCategories = (s) => [].concat(s.category);
