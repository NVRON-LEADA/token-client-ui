
import Ecommerce from "./solutions/Ecommerce";
import Enterprise from "./solutions/Enterprise";
import SaaS from "./solutions/Saas";
import Startups from "./solutions/Startups";

const SolutionsLanding = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-white" style={{ paddingTop: "64px" }}>
      <Ecommerce />
      <Enterprise />
      <SaaS />
      <Startups />
      {/* Add more feature components here if needed */}
    </main>
  );
};

export default SolutionsLanding;
