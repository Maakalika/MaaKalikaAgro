import Image1 from "../assets/About/Image1.png";
import Image2 from "../assets/About/Image2.png";
import Image3 from "../assets/About/Image3.jpg";
import BgImage from "../assets/About/BgImage1.png";
function About() {
  return (
    <section className=" px-6 py-10 lg:py-16  md:px-20 lg:px-30" id="about">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <section className="space-y-6">
          <header>
            <h1 className="sub-heading-1">Get to know us</h1>
            <h2 className="heading-2">About MaaKalika Agro Pvt Ltd</h2>
          </header>
          <p className="paragraph-1">
          MaaKalika Agro Pvt Ltd blends modern technology with sustainable farming to deliver healthy, chemical-free produce.
          </p>
          <section className=" grid md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <h1 className="sub-heading-1 !text-[#4BAF47]">
                Cultivating Future with Innovation
              </h1>
              <p className="paragraph-1">
             We empower farmers and promote eco-friendly practices, cultivating a greener future for all.
              </p>
            </div>
            <div>
              <img src={Image1} className="rounded-lg" />
            </div>
          </section>
          <div>
            <button className="primary-button">Discover More</button>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* First Image Section */}
          <div>
            <img src={Image2} className="w-full  h-auto " />
            <section className="relative flex justify-center ">
              <h2 className="font-2 absolute -top-5  text-[#1F1E17] text-5xl font-extrabold">
                20
              </h2>
              <img src={BgImage} />
              <h3 className="font-1 text-[#4BAF47] absolute  bottom-0 font-medium">PARTNERS IN WORLD WIDE</h3>
            </section>
          </div>
          <div>
            <img src={Image3} className="w-full h-104 md:h-auto" />
          </div>
        </section>
      </section>
    </section>
  );
}

export default About;
