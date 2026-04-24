const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

const adminEmail = "admin@portfolio.com";
const adminPassword = "admin123";

const techStackItems = [
  {
    name: "React",
    description:
      "Popular JavaScript library for building interactive user interfaces and modern single-page applications.",
    category: "Framework",
    year: "2013",
    paradigm: "Component-based",
    features: ["JSX", "Hooks", "Virtual DOM", "Reusable Components"],
    useCases: [
      "Single Page Applications",
      "Dashboard Interfaces",
      "Admin Panels",
    ],
    icon: "FaReact",
    gradient: "from-cyan-400 to-blue-500",
    difficulty: "Intermediate",
    topics: [
      {
        id: 0,
        title: "Introduction to React",
        description: "Core overview of React and why it is useful.",
        content:
          "## React\n\nReact helps build UI with reusable components and predictable state-driven rendering.",
        subtopics: [],
        isIntro: true,
      },
      {
        id: 1,
        title: "Hooks",
        description: "State and lifecycle logic in function components.",
        content:
          "### Hooks\n\n- `useState`\n- `useEffect`\n- `useContext`\n- custom hooks",
        subtopics: ["useState", "useEffect", "Custom Hooks"],
        isIntro: false,
      },
    ],
    resources: [
      {
        title: "React Documentation",
        url: "https://react.dev",
        type: "Official",
      },
      {
        title: "React Learn",
        url: "https://react.dev/learn",
        type: "Documentation",
      },
    ],
    isActive: true,
  },
  {
    name: "TypeScript",
    description:
      "Strongly typed superset of JavaScript for building maintainable frontend and backend applications.",
    category: "Frontend",
    year: "2012",
    paradigm: "Static Typing",
    features: ["Interfaces", "Generics", "Type Inference", "Safer Refactors"],
    useCases: [
      "Large React Apps",
      "API Contracts",
      "Maintainable Codebases",
    ],
    icon: "SiTypescript",
    gradient: "from-blue-500 to-blue-700",
    difficulty: "Advanced",
    topics: [
      {
        id: 0,
        title: "Introduction to TypeScript",
        description: "Type safety and tooling for JavaScript projects.",
        content:
          "## TypeScript\n\nTypeScript improves confidence with types, editor tooling, and safer changes.",
        subtopics: [],
        isIntro: true,
      },
    ],
    resources: [
      {
        title: "TypeScript Docs",
        url: "https://www.typescriptlang.org/docs/",
        type: "Official",
      },
    ],
    isActive: true,
  },
  {
    name: "Node.js",
    description:
      "JavaScript runtime used to build APIs, tooling, and backend services.",
    category: "Backend",
    year: "2009",
    paradigm: "Event-driven",
    features: ["Event Loop", "NPM", "Streams", "Fast I/O"],
    useCases: ["REST APIs", "Realtime Services", "CLI Tools"],
    icon: "FaNodeJs",
    gradient: "from-green-500 to-green-700",
    difficulty: "Intermediate",
    topics: [
      {
        id: 0,
        title: "Introduction to Node.js",
        description: "Backend JavaScript with a runtime built for network apps.",
        content:
          "## Node.js\n\nNode.js enables JavaScript on the server and powers many API backends.",
        subtopics: [],
        isIntro: true,
      },
    ],
    resources: [
      {
        title: "Node.js Docs",
        url: "https://nodejs.org/en/docs",
        type: "Official",
      },
    ],
    isActive: true,
  },
  {
    name: "PostgreSQL",
    description:
      "Powerful relational database commonly used for transactional systems and structured app data.",
    category: "Database",
    year: "1996",
    paradigm: "Relational",
    features: ["SQL", "Indexes", "JSON Support", "Transactions"],
    useCases: ["Application Databases", "Analytics", "Structured Data"],
    icon: "SiPostgresql",
    gradient: "from-blue-600 to-indigo-600",
    difficulty: "Intermediate",
    topics: [
      {
        id: 0,
        title: "Introduction to PostgreSQL",
        description: "A reliable open-source relational database.",
        content:
          "## PostgreSQL\n\nPostgreSQL is a production-grade relational database with strong SQL support.",
        subtopics: [],
        isIntro: true,
      },
    ],
    resources: [
      {
        title: "PostgreSQL Documentation",
        url: "https://www.postgresql.org/docs/",
        type: "Official",
      },
    ],
    isActive: true,
  },
];

async function seedAdminUser() {
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Admin",
      role: "admin",
      isActive: true,
    },
    create: {
      id: uuidv4(),
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    },
  });

  return admin;
}

async function seedTechStack() {
  for (const item of techStackItems) {
    await prisma.techStack.upsert({
      where: { name: item.name },
      update: {
        description: item.description,
        category: item.category,
        year: item.year,
        paradigm: item.paradigm,
        features: item.features,
        useCases: item.useCases,
        icon: item.icon,
        gradient: item.gradient,
        difficulty: item.difficulty,
        topics: item.topics,
        resources: item.resources,
        isActive: item.isActive,
      },
      create: {
        id: uuidv4(),
        ...item,
      },
    });
  }
}

async function main() {
  console.log("Seeding database...");

  const admin = await seedAdminUser();
  await seedTechStack();

  console.log("Seed complete.");
  console.log(`Admin email: ${admin.email}`);
  console.log(`Admin password: ${adminPassword}`);
  console.log("Change the admin password after first login.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
