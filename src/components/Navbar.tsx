import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { RiCloseLine } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import { IconContext } from "react-icons";
import kwoc_logo from "../assets/kwoc_logo.png";
import { GH_OAUTH_URL, ROUTER_PATHS } from "../util/constants";

const Links = [
  { name: "HOME", link: ROUTER_PATHS.HOME },
  { name: "MENTOR", link: ROUTER_PATHS.MENTOR_FORM },
  { name: "PROJECTS", link: ROUTER_PATHS.PROJECTS_LIST },
  { name: "TESTIMONIALS", link: ROUTER_PATHS.TESTIMONIALS },
  { name: "FAQs", link: ROUTER_PATHS.FAQ },
];

function Navbar() {
  const location = useLocation();
  const isLinkActive = (path: string) => location.pathname === path;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="fixed inset-x-0 z-50 w-full">
      <nav
        className={`flex shadow-md mt-4 items-center justify-between max-w-7xl gap-4 mx-auto border border-[#FFFFFF]/[0.16] px-4 py-2 rounded-lg w-[95%] inset-x-0 backdrop-blur-md z-50 ${mobileMenuOpen ? "hidden" : "null"}`}
      >
        <div className="font-bold flex items-center font-Poppins text-white">
          <span className="mr-1">
            <img
              className="object-contain h-12 w-12"
              src={kwoc_logo}
              alt="KWoC Logo"
            />
          </span>
        </div>

        <div className="lg:hidden ml-auto -mr-5">
          <button
            className="flex items-center text-blue-600 p-3"
            onClick={toggleMobileMenu}
          >
            <CiMenuBurger size="2em" color="#3b82f6" />
          </button>
        </div>

        <div className={`${mobileMenuOpen ? "hidden" : null}`}>
          <ul
            className={`lg:flex lg:items-center lg:w-auto lg:space-x-6 ${mobileMenuOpen ? "block" : "hidden"}`}
          >
            {Links.map((link) => (
              <li key={link.name} className="md:ml-4 md:mr-4">
                <Link
                  to={link.link}
                  className={`px-2 py-1 ${
                    isLinkActive(link.link)
                      ? "text-blue-500 hover:drop-shadow-glow duration-500"
                      : "text-white opacity-80 hover:drop-shadow-glow duration-500 active:text-blue-700"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <IconContext.Provider value={{ size: "3em" }}>
              <Link to={GH_OAUTH_URL}>
                <CiLogin
                  color="#dc2626"
                  className={`transition-transform transform ${isHovered ? "drop-shadow-glow scale-110" : "scale-100"}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                />
              </Link>
            </IconContext.Provider>
          </ul>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="w-full z-50 h-screen transition-transform transform ease-in-out duration-500 translate-x-0 p-2 flex justify-end">
          <div className="navbar-backdrop fixed bg-gray-800 opacity-25"></div>
          <nav className="h-full flex flex-col w-5/6 max-w-sm py-5 px-5 border border-[#FFFFFF]/[0.16] rounded-lg backdrop-blur-md overflow-y-auto">
            <div className="flex-items-center flex flex-row mb-8 mx-2">
              <span className="mr-auto text-3xl font-bold leading-none">
                <img
                  className="object-contain h-12 w-12"
                  src={kwoc_logo}
                  alt="KWoC Logo"
                />
              </span>
              <button onClick={toggleMobileMenu}>
                <RiCloseLine size="2.5em" color="#3b82f6" />
              </button>
            </div>
            <div>
              <ul className="mr-4 text-right">
                {Links.map((link) => (
                  <li key={link.name} className="mb-1" onClick={toggleMobileMenu}>
                    <Link
                      to={link.link}
                      className={`block p-3 text-sm font-semibold ${
                        isLinkActive(link.link)
                          ? "text-blue-500 hover:drop-shadow-glow duration-500"
                          : "text-white opacity-80 hover:drop-shadow-glow duration-500 active:text-blue-700"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <IconContext.Provider value={{ size: "2.5em" }}>
                  <Link to={GH_OAUTH_URL} className="flex justify-end pr-2 pt-2">
                    <CiLogin
                      color="#dc2626"
                      className={`transition-transform transform ${
                        isHovered ? "drop-shadow-glow scale-110" : "scale-100"
                      }`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    />
                  </Link>
                </IconContext.Provider>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;
