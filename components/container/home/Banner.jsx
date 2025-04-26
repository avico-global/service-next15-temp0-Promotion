import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { Barlow_Condensed } from "next/font/google";
import {
  Phone,
  User,
  Mail,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Loader,
  MapPin,
} from "lucide-react";
import CallButton from "@/components/CallButton";
const Barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Banner({ image, data, contact_info }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    zip: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Validate phone number
  const validatePhone = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate phone field as user types
    if (name === "phone") {
      if (value.length > 0 && !validatePhone(value)) {
        setFieldErrors((prev) => ({
          ...prev,
          phone: "Phone number must be exactly 10 digits",
        }));
      } else {
        setFieldErrors((prev) => ({
          ...prev,
          phone: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone before submission
    if (!validatePhone(formData.phone)) {
      setFieldErrors((prev) => ({
        ...prev,
        phone: "Phone number must be exactly 10 digits",
      }));
      return; // Prevent form submission
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        industry_code: "103",
        ...formData,
      };

      const response = await fetch(
        process.env.NEXT_PUBLIC_LOGICAL_CRM_API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer 202_86a297be5455",
          },
          body: JSON.stringify(payload),
        }
      );

      // Check if response is OK regardless of the response format
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Don't try to parse the response if it's not valid JSON
      try {
        const data = await response.json();
        console.log(data);
      } catch (jsonError) {
        console.warn("API didn't return valid JSON:", jsonError);
      }

      // Set form as submitted
      setFormSubmitted(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          zip: "",
          message: "",
        });
      }, 2000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit your request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FullContainer className="relative bg-white overflow-hidden md:!h-[790px]">
      <div className="absolute inset-0 h-[460px] md:h-[790px] overflow-hidden">
        <Image
          src={image}
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "No Banner Found"}
          priority={true}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gray-900/60"></div>
      </div>
      <Container className="py-20 font-barlow relative z-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-banner gap-10 md:gap-[66px] text-white lg:min-h-[630px]">
          <div className="relative -mt-10 flex flex-col lg:pr-10 justify-center">
            {data.price ? (
              <div className="bg-gradient-to-r  from-blue-800 via-blue-500 to-blue-300 rounded-full p-3 text-7xl font-bold aspect-square h-32 w-32 flex items-center justify-center">
                <span className="text-5xl font-semibold">$</span>80
              </div>
            ) : (
              <div className="flex items-center md:items-start  justify-center md:justify-start mb-4">
                <Image
                  title="Google"
                  src="/st-images/google.webp"
                  width={100}
                  height={30}
                  alt="Google"
                  className="w-[67.5px] md:w-[100px] h-[22.5px] md:h-[30px]"
                />

                <Image
                  title="Trustpilot"
                  src="/st-images/trustpilot.webp"
                  width={100}
                  height={30}
                  alt="Trustpilot"
                  className="ml-2 md:ml-6 w-[67.5px] md:w-[100px] h-[22.5px] md:h-[30px]"
                />

                <Image
                  title="Capterra"
                  src="/st-images/capterra.webp"
                  width={100}
                  height={30}
                  alt="Capterra"
                  className="ml-2 w-[67.5px] md:w-[100px] h-[22.5px] md:h-[30px]"
                />
              </div>
            )}

            <h1 className="font-[900] uppercase text-[28px] px-4 md:px-0 md:text-6xl leading-tight text-center md:text-start lg:text-left text-shadow-lg">
              {data?.title}
            </h1>
            <h2 className="text-[28px] md:px-0 md:text-6xl uppercase font-[900] leading-tight text-[#90D4E1] text-center md:text-start lg:text-left mt-2">
              {data?.tagline}
            </h2>
            <p className="text-[16px] md:text-3xl text-center md:text-start lg:text-left mt-4 mb-1">
              {data?.description}
            </p>

            {data?.list?.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {data.list.map((item, index) => (
                  <li key={index} className="flex items-center text-xl font-semibold  gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center md:items-start pt-3">
                <CallButton phone={contact_info?.phone} />
                <p className="text-[22px] md:text-4xl leading-none mt-4 md:mt-2 font-bold">
                  Call Us Today
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            {data.price ? (
              <div className="bg-gradient-to-r relative from-blue-800 via-blue-500 to-blue-300 -mb-9 -ml-8 rounded-full p-3 text-5xl font-bold aspect-square h-24 w-24 flex items-center justify-center text-white">
                <span className="text-3xl font-semibold">$</span>80
              </div>
            ) : null}
            <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)] font-barlow rounded-[20px] px-4 md:px-12 pb-8 md:pb-12 pt-10 md:pt-14">
              <h3 className="text-3xl md:text-4xl leading-7 md:leading-[30px] font-bold text-center mb-2 text-primary">
                10% Off Total Price for Online Booking
              </h3>
              <h4 className="text-[26px] md:text-4xl pt-4 font-extrabold text-center mb-6 text-[#11121A]">
                Request a Quote
              </h4>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-6">
                  <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    Your request has been submitted successfully. We'll contact
                    you shortly with your personalized quote.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-black">
                  <div className="grid grid-cols-2 gap-[10px]">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-md font-thin mb-1 text-gray-700 "
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3  pointer-events-none"></div>
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          className="w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none "
                          placeholder="First name"
                          required
                        />
                      </div>
                    </div>
                    {/* <div>
                      <label
                        htmlFor="last_name"
                        className="block text-sm mb-1 text-gray-700 font-medium"
                      >
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-blue-500" />
                        </div>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          className="w-full pl-10 py-2 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 shadow-sm"
                          placeholder="Last name"
                          required
                        />
                      </div>
                    </div> */}

                    <div className="">
                      <label
                        htmlFor="phone"
                        className="block text-md font-thin mb-1 text-gray-700 "
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-3 py-2 bg-white border ${
                            fieldErrors.phone
                              ? "border-red-500"
                              : "border-gray-200"
                          } rounded-md outline-none`}
                          placeholder="(123) 456-7890"
                          required
                        />
                      </div>
                      {fieldErrors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2 md:col-span-1">
                      <label
                        htmlFor="zip"
                        className="block text-md font-thin mb-1 text-gray-700 "
                      >
                        Zip Code
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className="w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none "
                          placeholder="Zip Code"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label
                        htmlFor="email"
                        className="block text-md font-thin mb-1 text-gray-700 "
                      >
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none "
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-md font-thin mb-1 text-gray-700 "
                    >
                      Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none"></div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        className="w-full pl-3 py-2 max-h-[75px] bg-white border border-gray-200 rounded-md outline-none "
                        placeholder="Message"
                        required
                      ></textarea>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#6B9FE4] hover:bg-[#5B88C4] text-black py-3 px-6 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin mr-2 h-4 w-4" />
                        Processing...
                      </>
                    ) : (
                      <>
                        GET A QUOTE
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
