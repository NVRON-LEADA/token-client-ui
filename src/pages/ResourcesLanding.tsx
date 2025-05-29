// src/pages/Features.tsx
import Community from "./resources/Community";
import Blog from "./resources/Blog";
import Documentation from "./resources/Documentation";
import HelpCenter from "./resources/HelpCenter";

const ResourcesLanding = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-white" style={{ paddingTop: "64px" }}>
      <Blog />
      <Community />
      <Documentation />
      <HelpCenter />
      {/* Add more feature components here if needed */}
    </main>
  );
};

export default ResourcesLanding;
