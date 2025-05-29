
const docSections = [
  {
    href: "https://docs.leadaai.com/api",
    label: "API Reference",
    description: "Detailed information about our API endpoints, requests, and responses.",
  },
  {
    href: "https://docs.leadaai.com/getting-started",
    label: "Getting Started Guide",
    description: "Learn how to integrate and use Leada AI in your projects quickly.",
  },
  {
    href: "https://docs.leadaai.com/tutorials",
    label: "Tutorials",
    description: "Step-by-step tutorials to explore different features and workflows.",
  },
  {
    href: "https://docs.leadaai.com/faq",
    label: "FAQ",
    description: "Answers to frequently asked questions about Leada AI.",
  },
];

const Documentation = () => {
  return (
    <section className="max-w-6xl mx-auto px-8 py-16 text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-indigo-500 text-center">
        Leada AI Documentation
      </h1>
      <p className="text-center max-w-3xl mx-auto mb-12 text-gray-300 text-lg leading-relaxed">
        Find detailed documentation, guides, and resources to help you make the most of Leada AI.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {docSections.map(({ href, label, description }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col p-8 bg-gray-900 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-indigo-400 mb-3">{label}</h2>
            <p className="text-gray-400 leading-relaxed flex-grow">{description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Documentation;
