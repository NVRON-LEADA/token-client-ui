import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import ClinicNav from "../clinic/Navbar"
import Footer from "./footer";

const Layout = () => {

  const hideNavBar = ["/dashboard", "/home"].includes(location.pathname.toLowerCase());
  const hideNavBar2=location.pathname ==="/pricing";

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {!hideNavBar && <Nav   />}
      {!hideNavBar2 && <ClinicNav />}
      <main className="flex-grow min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
