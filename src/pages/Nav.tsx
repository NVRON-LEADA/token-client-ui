import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";

type DropdownItem = { href: string; label: string };

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          })
        );
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const navLinkClass = isScrolled
    ? "text-white hover:text-indigo-500"
    : "text-white hover:text-indigo-300";

  const dropdownClass =
    "absolute left-0 top-full mt-2 flex-col bg-white text-gray-800 rounded-md shadow-lg z-50 py-4 px-6 min-w-[200px]";

  const handleEnter = (menu: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenDropdown(menu);
  };

  const handleLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 250);
  };

  const renderDropdown = (items: DropdownItem[], menu: string) => (
    <div
      className={dropdownClass}
      onMouseEnter={() => handleEnter(menu)}
      onMouseLeave={handleLeave}
      tabIndex={0}
      onFocus={() => handleEnter(menu)}
      onBlur={handleLeave}
    >
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className="block mt-1 first:mt-0 hover:text-indigo-600"
          onClick={() => setOpenDropdown(null)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="fixed top-4 left-4 right-4 z-40">
      <nav
        className={`rounded-xl px-6 py-3 transition-colors duration-500 backdrop-blur-md border ${
          isScrolled
            ? "bg-black/80 shadow-gray-500/90 shadow-md border-white/20 shadow-lg"
            : "bg-transparent border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-12">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
              <span className="text-2xl select-none text-indigo-600">⚡</span>
              <span className="text-lg font-semibold select-none text-white">LEADA AI</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 font-medium items-center">
              {/* Features Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleEnter("features")}
                onMouseLeave={handleLeave}
                tabIndex={0}
              >
                <span className={`${navLinkClass} cursor-pointer`}>{t("features")}</span>
                {openDropdown === "features" &&
                  renderDropdown(
                    [
                      { href: "/features/ai-analytics", label: t("AiAnalytics") },
                      { href: "/features/dashboards", label: t("Dashboards") },
                      { href: "/features/feedback", label: t("Feedback") },
                      { href: "/features/insights", label: t("Insights") },
                    ],
                    "features"
                  )}
              </div>

              <Link to="/pricing" className={`transition duration-200 ${navLinkClass}`}>
                {t("pricing")}
              </Link>

              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleEnter("solutions")}
                onMouseLeave={handleLeave}
                tabIndex={0}
              >
                <span className={`${navLinkClass} cursor-pointer`}>{t("solutions")}</span>
                {openDropdown === "solutions" &&
                  renderDropdown(
                    [
                      { href: "/solutions/ecommerce", label: t("Ecommerce") },
                      { href: "/solutions/saas", label: t("SaaS") },
                      { href: "/solutions/enterprise", label: t("Enterprise") },
                      { href: "/solutions/startups", label: t("Startups") },
                    ],
                    "solutions"
                  )}
              </div>

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleEnter("resources")}
                onMouseLeave={handleLeave}
                tabIndex={0}
              >
                <span className={`${navLinkClass} cursor-pointer`}>{t("resources")}</span>
                {openDropdown === "resources" &&
                  renderDropdown(
                    [
                      { href: "/blog", label: t("Blog") },
                      { href: "/help-center", label: t("HelpCenter") },
                      { href: "/resources/docs", label: t("Documentation") },
                      { href: "/community", label: t("Community") },
                    ],
                    "resources"
                  )}
              </div>
            </div>

            {/* Right Side: Language & Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-transparent text-white border border-white px-2 py-1 rounded text-sm"
              >
                <option value="en">EN</option>
                <option value="ta">TA</option>
              </select>

              {user ? (
                <div className="relative">
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border-2 border-white cursor-pointer"
                    onClick={() =>
                      setOpenDropdown(openDropdown === "user" ? null : "user")
                    }
                  />
                  {openDropdown === "user" && (
                    <div
                      className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-md shadow-lg z-50 py-4 px-6 text-sm"
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <p className="font-semibold mb-1">{user.displayName || "No Name"}</p>
                      <p className="text-xs text-gray-500 mb-4">{user.email}</p>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition"
                      >
                        {t("logout")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/signup")}
                    className={`px-4 py-1.5 rounded-md font-medium transition duration-200 ${
                      isScrolled
                        ? "bg-transparent border border-white text-white hover:bg-white hover:text-black"
                        : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                    }`}
                  >
                    {t("signup")}
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className={`px-4 py-1.5 rounded-md font-medium transition duration-200 ${
                      isScrolled
                        ? "bg-black text-white border-white hover:bg-white hover:text-black"
                        : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
                    }`}
                  >
                    {t("login")}
                  </button>
                </>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden focus:outline-none text-white"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black text-white px-6 py-4 space-y-2">
            <Link to="/features" onClick={() => setIsMenuOpen(false)} className="block hover:text-indigo-400">
              {t("features")}
            </Link>
            <Link to="/pricing" onClick={() => setIsMenuOpen(false)} className="block hover:text-indigo-400">
              {t("pricing")}
            </Link>
            <Link to="/solutions" onClick={() => setIsMenuOpen(false)} className="block hover:text-indigo-400">
              {t("solutions")}
            </Link>
            <Link to="/resources" onClick={() => setIsMenuOpen(false)} className="block hover:text-indigo-400">
              {t("resources")}
            </Link>

            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="w-full mt-2 bg-black border border-white text-white rounded px-2 py-1"
            >
              <option value="en">EN</option>
              <option value="ta">TA</option>
            </select>

            {!user ? (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block hover:text-indigo-400">
                  {t("login")}
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block font-bold text-indigo-400">
                  {t("signup")}
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3 mt-3">
                  <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border-2 border-white" />
                  <span>{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mt-3 w-full px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 transition"
                >
                  {t("logout")}
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
