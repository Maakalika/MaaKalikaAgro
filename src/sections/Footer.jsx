import { useState } from "react";
import Logo from "../assets/Logo/WhiteLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faPinterest,
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLeaf,
  faLocationDot,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { icon } from "@fortawesome/fontawesome-svg-core";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Contact", id: "contact" },
  ];

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80; // Adjust for navbar height
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Newsletter subscription
  const handleSubscribe = async () => {
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Missing Email",
        text: "Please enter a valid email address.",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("https://your-api.com/api/subscribe", {
        email,
      });
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: response.data.message || "You have been subscribed successfully.",
      });
      setEmail("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Subscription Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#24231D] text-white px-6 py-10 md:px-20 md:py-16 lg:px-30 lg:py-16 flex flex-col lg:flex-row justify-between items-start gap-10 md:gap-16">
      {/* Logo & Social */}
      <div className="flex flex-col gap-4">
        <img src={Logo} className="h-16 w-40" />
        <p className="text-[#A5A49A] text-sm max-w-xs">
          There are many variations of passages of lorem ipsum available, but
          the majority suffered.
        </p>
        <div className="flex gap-3 mt-2">
          {[{icon: faInstagram,link:"https://www.instagram.com/hri_shi61/"},{icon:faLinkedin,link:"https://www.linkedin.com/in/hrishikesh-patil-296496276/"}].map((data, i) => (
            <a
              key={i}
              href={data?.link}
              className="bg-[#1F1E17] p-2.5 cursor-pointer rounded-full flex justify-center items-center hover:bg-[#4BAF47] transition-colors"
            >
              <FontAwesomeIcon
                icon={data?.icon}
                className="text-white"
                fontSize={20}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Explore Section */}
      <div className="flex flex-col gap-3">
        <h2 className="font-1 font-bold text-white text-lg">Explore</h2>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-12 h-1 rounded-lg bg-[#4BAF47]"></div>
          <div className="w-1 h-1 rounded-full bg-[#4BAF47]"></div>
        </div>
        <ul className="flex flex-col gap-2">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="text-[#A5A49A] cursor-pointer flex items-center text-sm gap-2 w-fit relative group"
            >
              <FontAwesomeIcon icon={faLeaf} className="text-[#EEC044]" />
              <button
                onClick={() => scrollToSection(item.id)}
                className="relative cursor-pointer"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#4BAF47] transition-all duration-300 rounded-lg group-hover:w-full"></span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col gap-3">
        <h2 className="font-1 font-bold text-white text-lg">Contact</h2>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-12 h-1 rounded-lg bg-[#4BAF47]"></div>
          <div className="w-1 h-1 rounded-full bg-[#4BAF47]"></div>
        </div>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-2 text-[#A5A49A] group text-sm">
            <FontAwesomeIcon icon={faPhone} className="text-[#EEC044]" />
            <a href="tel:+917822815169" className="group-hover:underline">
              +91 7822 81 5169
            </a>
          </li>
          <li className="flex items-center gap-2 text-[#A5A49A] group text-sm">
            <FontAwesomeIcon icon={faEnvelope} className="text-[#EEC044]" />
            <a
              href="mailto:phrishikesh172@gmail.com"
              target="_blank"
              className="group-hover:underline"
            >
              phrishikesh172@gmail.com
            </a>
          </li>
          <li className="flex items-center gap-2 text-[#A5A49A] group text-sm">
            <FontAwesomeIcon icon={faLocationDot} className="text-[#EEC044]" />
            <a
              href="https://www.google.com/maps/place/21%C2%B032'44.8%22N+74%C2%B028'25.6%22E/@21.545774,74.4711887,17z/data=!3m1!4b1!4m4!3m3!8m2!3d21.545774!4d74.4737636?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="group-hover:underline"
            >
              Shop 29, KKP Business Centre, Shahada, 425409
            </a>
          </li>

          {/* Newsletter Form */}
          <li className="relative w-full max-w-xs mt-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#F8F7F0] text-[#878680] pl-4 pr-12 py-2.5 w-full rounded-xl font-semibold h-12 focus:outline-none focus:ring-2 focus:ring-[#4BAF47]"
              placeholder="Your Email Address"
              disabled={loading}
            />
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-[#4BAF47] w-11 h-12 rounded-r-xl flex justify-center items-center absolute top-0 right-0 hover:bg-[#3a9e3c] cursor-pointer transition-colors disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
