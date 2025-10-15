import { useState, useEffect } from "react";
import Logo from "../assets/Logo/WhiteLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons/faPhoneVolume";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Blogs", id: "blogs" },
    { name: "Contact", id: "contact" },
  ];

  // Handle scroll for navbar background and active section
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) return;
      const heroHeight = hero.offsetHeight;
      setIsScrolled(window.scrollY > heroHeight - 80);

      // Determine active section
      let current = "home";
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const offsetTop = section.offsetTop - 90; // 90 = navbar offset
          if (window.scrollY >= offsetTop) {
            current = item.id;
          }
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80; // navbar height
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsOpen(false); // close mobile menu
    }
  };

  return (
    <nav
      className={`w-full py-6 px-4 md:px-12 flex justify-between items-center fixed top-0 z-50 transition-colors duration-700 ${
        isScrolled ? "bg-black/70" : "bg-black/70 lg:bg-[#FFFFFF19]"
      }`}
    >
      {/* Logo */}
      <section className="flex items-center flex-shrink-0 cursor-pointer">
        <img src={Logo} alt="Logo" className="h-12 w-auto" />
      </section>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex gap-12 font-1">
        {navItems.map((item) => (
          <li key={item.id} className="cursor-pointer w-fit">
            <button
              onClick={() => scrollToSection(item.id)}
              className="relative text-white font-semibold px-3 py-2 group cursor-pointer w-fit"
            >
              <span className="relative z-10">{item.name}</span>
              <span
                className={`absolute left-0 bottom-0 h-1 w-full rounded-lg bg-[#4BAF47] transition-transform origin-left duration-300 ${
                  activeSection === item.id ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            </button>
          </li>
        ))}
      </ul>

      {/* Separator */}
      <div className="hidden lg:block w-px h-10 bg-white mx-6"></div>

      {/* Call Button */}
      <section className="hidden lg:flex items-center gap-4 cursor-pointer">
        <a
          href="tel:+917822815169"
          className="flex justify-center items-center gap-3 cursor-pointer"
        >
          <button className="border-[#EEC044] border rounded-full h-10 w-10 p-2 flex justify-center items-center cursor-pointer">
            <FontAwesomeIcon
              icon={faPhoneVolume}
              className="text-[#EEC044]"
              fontSize={18}
            />
          </button>
          <div className="flex flex-col">
            <h3 className="text-white font-1 text-sm">Call Anytime</h3>
            <label className="text-white font-1 text-sm">
              +91 7822 81 5169
            </label>
          </div>
        </a>
      </section>

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden text-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} size="lg" />
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className={`absolute top-24 left-0 w-full ${   isScrolled ? "bg-black/70" : "bg-black/70"} flex flex-col items-center gap-6 py-6 lg:hidden z-50`}>
          <ul className="flex flex-col gap-6 font-1 w-full px-6">
            {navItems.map((item) => (
              <li key={item.id} className="w-fit mx-auto cursor-pointer">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-white font-semibold px-3 py-2 group cursor-pointer w-fit"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span
                    className={`absolute left-0 bottom-0 h-1 w-full rounded-lg bg-[#4BAF47] transition-transform origin-left duration-300 ${
                      activeSection === item.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  ></span>
                </button>
              </li>
            ))}
          </ul>
          <a
            href="tel:+917822815169"
            className="flex justify-center items-center gap-3 mt-4 cursor-pointer"
          >
            <button className="border-[#EEC044] border rounded-full h-10 w-10 p-2 flex justify-center items-center cursor-pointer">
              <FontAwesomeIcon
                icon={faPhoneVolume}
                className="text-[#EEC044]"
                fontSize={18}
              />
            </button>
            <div className="flex flex-col">
              <h3 className="text-white font-1 text-sm">Call Anytime</h3>
              <label className="text-white font-1 text-sm">
                +91 7822 81 5169
              </label>
            </div>
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
