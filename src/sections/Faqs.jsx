import { useState } from "react";
import BgImage1 from "../assets/Faqs/BackgroundImage.png"
import Image1 from "../assets/Faqs/Image2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Faqs() {
  const [selectedIndex, setSelectedIndex] = useState(-1);

const faqData = [
  {
    question: "Best Kharif crops?",
    answer: "Rice, maize, cotton, soybeans, groundnut, and pulses thrive in monsoon.",
  },
  {
    question: "How to improve soil naturally?",
    answer: "Use crop rotation, organic manure, and green manures.",
  },
  {
    question: "Benefits of drip irrigation?",
    answer: "Saves water, improves yield, reduces weeds, and feeds roots directly.",
  },
  {
    question: "Does MaaKalika Agro offer training?",
    answer: "Yes, we provide workshops for sustainable farming.",
  },
  {
    question: "Are the products fully organic?",
    answer: "Yes, all methods are chemical-free and safe.",
  },
];



  return (
    <section className="relative  max-w-screen    md:h-screen   ">
      {/* Background Image */}
      <div className="hidden lg:block lg:absolute inset-0 left-0   ">
        <img
          src={BgImage1}
          alt="FAQ Background"
          className="w-lg h-full  object-cover"
        />
      </div>

      {/* FAQ content on top of image */}
      <div className="relative  z-10 py-10 md:py-16 px-6 md:px-20 lg:px-30  h-full ">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10  items-center  justify-center">
          {/* Left Side Image (keep as is) */}
          <div className="flex justify-center  lg:translate-x-34  items-center h-fit  md:justify-start  relative">
            <img
              src={Image1}
              className="rounded-lg md:w-3/4  h-120 transition-all duration-400  "
              alt="FAQ"
            />
            <section className="bg-[#EEC044] rounded-t-2xl absolute bottom-0 left-[10%] px-8 py-3 cursor-pointer"
              onClick={() => window.location.href = "tel:7822815169"}
            >
                <h2 className="sub-heading-1 !text-white text-center">Call us anytime</h2>
                <h3 className="heading-2 !text-white">7822 81 5169</h3>

            </section>
          </div>

          {/* Right Side FAQs */}
          <div className="space-y-3  ">
            <header className="mb-4">
              <h1 className="sub-heading-1">Frequently Asked Questions</h1>
              <h2 className="heading-2">Your Agriculture Queries Answered</h2>
            </header>

            {/* FAQ Items */}
            <section className="space-y-2 ">
              {faqData.map((data, index) => {
                const isOpen = index === selectedIndex;
                return (
                  <div
                    key={index}
                    className="bg-[#F8F7F0] rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                    onClick={() => setSelectedIndex(isOpen ? -1 : index)}
                  >
                    <div className="flex items-center">
                      {/* Question text */}
                      <h3 className="heading-3 flex-1 pr-4">{data.question}</h3>

                      {/* Chevron button */}
                      <button className="bg-[#C5CE38] rounded-md p-2 flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className={`transition-transform duration-300 ${
                            isOpen ? "rotate-90" : "rotate-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Answer with smooth expand */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className=" paragraph-1">{data.answer}</p>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Faqs;