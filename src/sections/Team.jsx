import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Memeber1 from "../assets/Team/Member1.jpeg";
import Member2 from "../assets/Team/Member2.jpeg"
import { Share2, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import React from "react";

function Team() {
  const [isIdSelected, setIsIdSelected] = React.useState(0);

  const handleSelect = (id) => {
    setIsIdSelected(isIdSelected === id ? 0 : id); // toggle on click
  };

  const handleHover = (id) => {
    setIsIdSelected(id); // open on hover
  };

  const handleLeave = (id) => {
    if (isIdSelected === id) {
      setIsIdSelected(0); // close on mouse leave
    }
  };

  const teamData = [
    {
      id: 1,
      image: Memeber1,
      name: "Hrishikesh Mahendra Patil",
      position: "Director",
      socialLinks: {
        instagram: "https://www.instagram.com/hri_shi61/",
        // facebook: "https://www.facebook.com/jessica.brown.farmer",
        linkedin: "https://www.linkedin.com/in/hrishikesh-patil-296496276/",
        // twitter: "https://twitter.com/jessica_farmer",
      },
    },
    {
      id: 2,
      image: Member2,
      name: "Sangitaben Mahendra Patil",
      position: "Director",
      socialLinks: {
        instagram: "https://www.instagram.com/hri_shi61/",
        facebook: "https://www.facebook.com/jessica.brown.farmer",
        linkedin: "https://www.linkedin.com/in/hrishikesh-patil-296496276/",
      },
    },
  ];

  return (
    <section className="px-6 md:px-20 lg:px-30 py-10 md:py-16 space-y-3">
      {/* Heading */}
      <header className="space-y-3">
        <h2 className="sub-heading-1 text-center">Our Team</h2>
        <h3 className="heading-2 text-center">Meet Our Farmers</h3>
      </header>

      {/* Team Section with Flex */}
      <section className="flex justify-center gap-10 flex-wrap">
        {teamData?.map((data) => (
          <div
            key={data.id}
            className="relative h-[400px] w-full sm:w-[320px] md:w-[300px] lg:w-[320px]"
          >
            <img
              src={data?.image}
              className="w-full h-full object-cover rounded-lg"
              alt={data.name}
            />

            {/* Social Menu */}
            {isIdSelected === data?.id && (
              <div
                className="absolute left-5 font-1 bottom-18 bg-white rounded-xl shadow-md border border-gray-200 p-4 min-w-[180px] z-20"
                onMouseLeave={() => handleLeave(data.id)}
              >
                <a
                  className="flex items-center gap-2 p-2 px-3 cursor-pointer border-b border-gray-200 hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-800"
                  href={data.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram size={16} color="#E4405F" />
                  Instagram
                </a>
                <a
                  className="flex items-center gap-2 p-2 px-3 cursor-pointer border-b border-gray-200 hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-800"
                  href={data.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook size={16} color="#1877F2" />
                  Facebook
                </a>
                <a
                  className="flex items-center gap-2 p-2 px-3 cursor-pointer border-b border-gray-200 hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-800"
                  href={data.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} color="#0077B5" />
                  LinkedIn
                </a>
                {/* <a
                  className="flex items-center gap-2 p-2 px-3 cursor-pointer hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-800"
                  href={data.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter size={16} color="#1DA1F2" />
                  Twitter
                </a> */}
              </div>
            )}

            {/* Bottom Section */}
            <section className="bg-white max-w-70 absolute right-0 bottom-0 rounded-tl-lg p-1 py-1 text-end px-10">
              <button
                className="bg-[#4BAF47] p-0.5 rounded-xl text-white absolute -left-5 bottom-3 cursor-pointer"
                onClick={() => handleSelect(data?.id)}
                onMouseEnter={() => handleHover(data?.id)}
              >
                <Share2 size={40} />
              </button>
              <h1 className="heading-3">{data?.name}</h1>
              <p className="paragraph-1">{data?.position}</p>
            </section>
          </div>
        ))}
      </section>
    </section>
  );
}

export default Team;
