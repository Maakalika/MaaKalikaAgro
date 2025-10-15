import BgImage from "../assets/Hero/BgImage3.jpg";
import ArrowImage from "../assets/Hero/ArrowImage.png";

function Hero() {
  return (
    <section
    id="home"
      className="py-10 lg:py-16 px-6 md:px-20 lg:px-30  bg-cover bg-no-repeat h-screen "
      style={{
        backgroundImage: `url(${BgImage})`,
        
      }}
    >
      <div className="h-full flex justify-center items-center">
        <h2 className="heading-1">
       
          Cultivating Future{" "}
        <br />
          <span className="relative inline-block">
            <span className="inline-block text-[#EEC044]">with Innovation</span>
            <img
              src={ArrowImage}
              alt="Arrow"
              className="absolute -bottom-2 right-0 "
            />
          </span>
          <br /> Modern & Vintage Agriculture
        </h2>
      </div>
    </section>
  );
}

export default Hero;
