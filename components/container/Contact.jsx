import React, { useState } from "react";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Loader,
  Award,
  Clock,
  PiggyBank,
  MapPin,
  TextQuote,
} from "lucide-react";
import Link from "next/link";
import Heading from "../common/Heading";
import { Barlow_Condensed, Inter, Montserrat } from "next/font/google";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export default function Contact({ contact_info }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zipcode: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(formData);
      setIsSubmitting(false);
      setFormSubmitted(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          zipcode: "",
          message: "",
        });
      }, 2000);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <FullContainer id="contact-us" className="pb-4 relative">
      <Container className="relative z-10">
        <div className="">
          <div className="bg-primary gap-0 rounded-[20px] overflow-hidden  mb-5">
            <div className={`lg:col-span-3 p-7 pt-6 md:pt-10 md:p-10 lg:p-12 bg-primary text-white font-barlow`}>
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 text-xl max-w-md">
                    Your request has been submitted successfully. We'll contact
                    you shortly with your personalized quote.
                  </p>
                </div>
              ) : (
                <>
                  <h4
                    className={`text-3xl leading-none md:text-4xl md:leading-7 font-bold mb-7 text-white text-center`}
                  >
                    10% Off Total Price for Online Booking
                  </h4>
                  <h3
                    className={`text-[25px] leading-none md:text-4xl md:leading-7 font-bold mb-7 text-white text-center`}
                  >
                    Ask For A Quote Here
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex flex-col gap-3 ">
                      <div>
                        <label className="block text-lg  font-bold mb-1">
                          Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-4 py-2 border-0 bg-gray-50 rounded-md outline-none text-black "
                            placeholder="Name"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-lg  font-bold mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-4 py-2 border-0 bg-gray-50 rounded-md outline-none text-black"
                            placeholder="Email"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg  font-bold mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-4 py-2 border-0 bg-gray-50 rounded-md outline-none text-black"
                            placeholder="Phone Number"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg  font-bold mb-1">
                          Zip Code
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={handleChange}
                            className="w-full pl-4 py-2 border-0 bg-gray-50 rounded-md outline-none text-black"
                            placeholder="Zip Code"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg  font-bold mb-1">
                          How can we help you ?
                        </label>
                        <div className="relative">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="w-full max-h-[100px] pl-4 py-2 border-0 bg-gray-50 rounded-md outline-none text-black"
                            placeholder="Message"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col text-center justify-center items-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-fit  mx-auto bg-white text-black py-2.5 px-6 rounded-md transition-all duration-300 font-medium flex text-xl items-center justify-center group shadow-lg hover:shadow-blue-500/30"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="animate-spin mr-3 h-5 w-5" />
                            Processing...
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <TextQuote className="w-6 h-6 " />
                            Get A Quote
                          </div>
                        )}
                      </button>
                    </div>

                    {/* <p className="text-sm text-gray-500 text-center pt-3">
                      By submitting, you agree to our{" "}
                      <Link
                        href="#"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        terms & privacy policy
                      </Link>
                    </p> */}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
