import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./footer";

const Layout = () => {

  const hideNavBar = location.pathname === "/dashboard";
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {!hideNavBar && <Nav   />}
      <main className="flex-grow min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
