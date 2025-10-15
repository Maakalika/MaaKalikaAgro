import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BgImage1 from "../assets/Contact/BgImage.png";
import BgImage2 from "../assets/Contact/LeftImage.jpg"
function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/contact", formData);

      if (res.data.isSuccess) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for contacting us. We’ll get back to you soon.",
          confirmButtonColor: "#011575",
        });
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.message || "Something went wrong!",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error.response?.data?.message || "Server error. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2 py-16 px-6 md:px-20 lg:px-30 gap-10"
      id="contact"
      style={{
        backgroundImage: `url(${BgImage1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Google Map */}
      <section>
        {/* <iframe
          src="https://www.google.com/maps/place/21%C2%B032'44.8%22N+74%C2%B028'25.6%22E/@21.545774,74.4711887,17z/data=!3m1!4b1!4m4!3m3!8m2!3d21.545774!4d74.4737636?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D"
          className="w-full h-116 rounded-md shadow-lg"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe> */}
        <img src={BgImage2}  className="w-full h-116 rounded-md shadow-lg" />
      </section>

      {/* Contact Form */}
      <section className="space-y-6 flex flex-col justify-center bg-white/80 p-4 md:p-8 rounded-xl shadow-lg">
        <header>
          <h1 className="sub-heading-1">Contact Us</h1>
          <h2 className="heading-2">Write Message</h2>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-3">
            <div>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Name"
                className="text-[#878680] w-full border-2 border-[#878680] px-3 py-3 rounded-md focus:outline-none focus:border-black"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="text-[#878680] w-full border-2 border-[#878680] px-3 py-3 rounded-md focus:outline-none focus:border-black"
                required
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="text-[#878680] w-full border-2 border-[#878680] px-3 py-3 rounded-md focus:outline-none focus:border-black"
              required
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="text-[#878680] resize-none border-2 border-[#878680] w-full px-3 py-3 rounded-md focus:outline-none focus:border-black max-h-full overflow-y-auto"
              rows={4}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`primary-button w-full flex items-center justify-center ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
              ) : null}
              {loading ? "Sending..." : "Send a Message"}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}

export default Contact;
