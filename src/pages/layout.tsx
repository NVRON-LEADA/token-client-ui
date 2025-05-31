import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import ClinicNavbar from "../clinic/components/Navbar";
import Footer from "./footer";

const Layout = () => {
  const location = useLocation(); // ✅ Hook that updates on route change
  const pathname = location.pathname.toLowerCase();

  const hideNavBar = ["/dashboard",
    "/clinic/",
    "/clinic",
    "/clinic/token",
    "/clinic/doctor/login",
    "/clinic/reception/login",
    "/clinic/",
    ].includes(pathname);
  const hideNavBar2 = [
    "/pricing",
    "/",
    "/features/ai-analytics",
    "/features/dashboards",
    "/features",
    "/features/feedback",
    "/features/insights",
    "/signup",
    "/login",
    "/solutions",
    "/solutions/ecommerce",
    "/solutions/saas",
    "/solutions/enterprise",
    "/solutions/startups",
    "/blog",
    "/help-center",
    "/resources/docs",
    "/community",


  ].includes(pathname);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {!hideNavBar && <Nav />}
      {!hideNavBar2 && <ClinicNavbar />}
      <main className="flex-grow min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
