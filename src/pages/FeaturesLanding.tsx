
import AiAnalytics from "./features/AiAnalytics";
import RealTimeInsights from "./features/RealTimeInsights";
import UserFeedback from "./features/UserFeedback";
import CustomDashboards from "./features/CustomDashboards";

const SolutionsLanding = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-white" style={{ paddingTop: "64px" }}>
      <AiAnalytics />
      <CustomDashboards />
      <RealTimeInsights />
      <UserFeedback />
      {/* Add more feature components here if needed */}
    </main>
  );
};

export default SolutionsLanding;
