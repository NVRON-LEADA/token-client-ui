
const communityLinks = [
  {
    href: "https://discord.gg/yourcommunity",
    label: "Join our Discord",
    description: "Chat live with other users and the Leada AI team.",
  },
  {
    href: "https://github.com/yourrepo",
    label: "GitHub Repository",
    description: "Explore our open source projects and contribute.",
  },
  {
    href: "https://forum.leadaai.com",
    label: "Community Forum",
    description: "Ask questions, share ideas, and get help from users.",
  },
  {
    href: "https://twitter.com/leada_ai",
    label: "Follow us on Twitter",
    description: "Stay updated with the latest news and announcements.",
  },
];

const Community = () => {
  return (
    <section className="max-w-6xl mx-auto px-8 py-16 text-white">
      <h1 className="text-5xl font-extrabold mb-8 text-indigo-500 text-center">
        Join the Leada AI Community
      </h1>
      <p className="text-center max-w-3xl mx-auto mb-12 text-gray-300 text-lg leading-relaxed">
        Connect, collaborate, and grow with other Leada AI users and enthusiasts. Explore the
        channels below to get involved.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {communityLinks.map(({ href, label, description }) => (
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

export default Community;
