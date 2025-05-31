import "./pages/i18n"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import SubscriptionPage from "./pages/subscriptionpage";
import LoginPage from "./components/GoogleLogin";
import Signup from "./pages/signup";
import Homepage from "./pages/homepage";

import { Navigate } from 'react-router-dom';
import "./styles/global.css";
import { roleMap } from './constants/roles';


// Feature pages
import FeaturesLanding from "./pages/FeaturesLanding";
import AiAnalytics from "./pages/features/AiAnalytics";
import CustomDashboards from "./pages/features/CustomDashboards";
import UserFeedback from "./pages/features/UserFeedback";
import RealTimeInsights from "./pages/features/RealTimeInsights";

// Solution pages
import SolutionsLanding from "./pages/SolutionsLanding";
import Ecommerce from "./pages/solutions/Ecommerce";
import Saas from "./pages/solutions/Saas";
import Enterprise from "./pages/solutions/Enterprise";
import Startups from "./pages/solutions/Startups";

// Resource pages
import ResourcesLanding from "./pages/ResourcesLanding";
import Blog from "./pages/resources/Blog";
import HelpCenter from "./pages/resources/HelpCenter";
import Documentation from "./pages/resources/Documentation";
import Community from "./pages/resources/Community";

//Clinic pages
import Home from './clinic/pages/Home';
import PatientToken from './clinic/pages/PatientToken';
import DoctorDashboard from './clinic/pages/DoctorDashboard';
import ReceptionDashboard from './clinic/pages/ReceptionDashboard';
import DoctorLogin from './clinic/pages/Login';
import ReceptionLogin from './clinic/pages/ReceptionLogin';


import "./styles/global.css";
import Dashboard from "./pages/dashboard";  // import your Dashboard component

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRole: string; // or a union type like 'admin' | 'staff'
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => { ;


  // Get token and user info from localStorage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Check if authenticated and role matches
  const isAuthorized = token && user?.role === roleMap[allowedRole];

  if (!isAuthorized) {
    // Redirect to login page of that role
    return <Navigate to={`/${allowedRole}/login`} replace />;
  }

  return children;
};


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home */}
          <Route index element={<Homepage />} />

          {/* Authentication */}
          <Route path="pricing" element={<SubscriptionPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<Signup />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Features */}
          <Route path="features" element={<FeaturesLanding />} />
          <Route path="features/ai-analytics" element={<AiAnalytics />} />
          <Route path="features/dashboards" element={<CustomDashboards />} />
          <Route path="features/feedback" element={<UserFeedback />} />
          <Route path="features/insights" element={<RealTimeInsights />} />

          {/* Solutions */}
          <Route path="solutions" element={<SolutionsLanding />} />
          <Route path="solutions/ecommerce" element={<Ecommerce />} />
          <Route path="solutions/saas" element={<Saas />} />
          <Route path="solutions/enterprise" element={<Enterprise />} />
          <Route path="solutions/startups" element={<Startups />} />

          {/* Resources */}
          <Route path="resources" element={<ResourcesLanding />} />
          <Route path="blog" element={<Blog />} />
          <Route path="help-center" element={<HelpCenter />} />
          <Route path="resources/docs" element={<Documentation />} />
          <Route path="community" element={<Community />} />

          {/* clinic */}
 
          <Route path="/clinic" element={<Home />} />
          <Route path="/clinic/token" element={<PatientToken />} />
          <Route path="/clinic/doctor/login" element={<DoctorLogin />} />
          <Route path="/clinic/reception/login" element={<ReceptionLogin />} />

          {/* Protected Reception Dashboard */}
          <Route
            path="/clinic/reception"
            element={
              <ProtectedRoute allowedRole="reception">
                <ReceptionDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Doctor Dashboard */}
          <Route
            path="/clinic/doctor"
            element={
              <ProtectedRoute allowedRole="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />


        </Route>
      </Routes>
    </Router>
  );
};

export default App;
