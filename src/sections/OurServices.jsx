import { useRef, useState, useEffect } from "react";
import SustainableFarmingImgae from "../assets/OurServices/SustainableFarming.jpg"
import AgriTechImage from "../assets/OurServices/AgriTech.jpeg"
import OrganicCropProductionImage from "../assets/OurServices/OrganicCropProduction.jpeg"
import AgroSupplyChainImage from "../assets/OurServices/AgroSupplyChain.jpg"
import TraningImage from "../assets/OurServices/TrainingFarmer.jpg"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTractor } from "@fortawesome/free-solid-svg-icons";

function OurServices() {
  const servicesData = [
    {
      heading: "Sustainable Farming Solutions",
      description:
        "Helping farmers adopt eco-friendly and high-yield methods for a better tomorrow.",
      image: SustainableFarmingImgae,
    },
    {
      heading: "Organic Crop Production",
      description:
        "From seeds to harvest – pure, chemical-free farming that ensures healthy produce.",
      image: OrganicCropProductionImage,
    },
    {
      heading: "Agri-Tech Consulting",
      description:
        "Introducing modern tools, irrigation systems, and smart practices for maximum productivity.",
      image: AgriTechImage,
    },
     {
      heading: "Agro Supply Chain & Distribution",
      description:
        "Connecting farmers directly with markets for fair pricing and faster delivery.",
      image: AgroSupplyChainImage,
    },
     {
      heading: "Training & Farmer Education",
      description:
        "Workshops, awareness programs, and training sessions for modern agricultural innovation.",
      image: TraningImage,
    },
  ];

  // store heights for each card
  const [imageHeights, setImageHeights] = useState([]);
  const imageRefs = useRef([]);

  useEffect(() => {
    const heights = imageRefs.current.map((img) => img?.clientHeight || 0);
    setImageHeights(heights);
  }, []);

  return (
    <section
      className="px-6 md:px-20 lg:px-30  py-10 md:py-16 bg-[#F8F7F0] space-y-8"
      id="services"
    >
      <header>
        <h1 className="sub-heading-1 text-center">Our Services</h1>
        <h2 className="heading-2 text-center">What We Offer</h2>
      </header>

      <section className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((data, index) => (
          <div
            key={index}
            className="relative transition-all duration-300 hover:translate-y-3 cursor-pointer"
          >
            <img
              ref={(el) => (imageRefs.current[index] = el)}
              src={data.image}
              className="w-full max-h-72 rounded-t-lg"
              alt=""
            />

            <section className="bg-white shadow-md p-6 space-y-2 rounded-b-lg mt-0  h-44">
              <h2 className="heading-3">{data.heading}</h2>
              <p className="paragraph-1">{data.description}</p>
            </section>

            {/* Button positioned based on image height */}
            <button
              className="absolute right-4 bg-[#C5CE38] text-white p-3 rounded-lg shadow-md"
              style={{
                top: imageHeights[index]
                  ? `${imageHeights[index] - 20}px`
                  : "140px",
              }}
            >
              <FontAwesomeIcon icon={faTractor} fontSize={22} />
            </button>
          </div>
        ))}
      </section>
    </section>
  );
}

export default OurServices;
