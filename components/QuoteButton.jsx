"use client";

import { useState } from "react";
import {
  TextQuote,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Loader,
  Clock,
  PiggyBank,
  MapPin,
  Award,
} from "lucide-react";
import Link from "next/link";
import Modal from "./Modal"; // Import the Modal component

export default function QuoteButton({ phone }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zipcode: "",
    message: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
    setError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          zipcode: "",
          message: "",
        });
        setFormSubmitted(false);
        closeModal();
      }, 2000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit your request. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {formSubmitted ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Thank You!
            </h3>
            <p className="text-gray-600 text-xl max-w-md">
              Your request has been submitted successfully. We'll contact you
              shortly with your personalized quote.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white rounded-2xl overflow-hidden shadow-2xl mb-5 max-w-4xl w-full mx-4">
            {/* LEFT SIDE / INFO */}
            <div className="lg:col-span-2 bg-gradient-to-br from-primary to-secondary p-10 relative">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Exclusive Online Offer
                  </h2>
                  <div className="bg-blue-600/30 p-4 rounded-lg border border-blue-500/30 mb-8">
                    <p className="text-white text-xl font-semibold">
                      10% Off Total Price
                    </p>
                    <p className="text-blue-200 text-sm">
                      For all online bookings this month
                    </p>
                  </div>

                  <ul className="space-y-6 mt-8">
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-2 rounded-full mr-4">
                        <Award className="h-6 w-6 text-blue-300" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          Professional Service
                        </h3>
                        <p className="text-blue-200 text-sm">
                          Expert team with years of experience
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-2 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-blue-300" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          Quick Response
                        </h3>
                        <p className="text-blue-200 text-sm">
                          We'll get back to you within 24 hours
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-2 rounded-full mr-4">
                        <PiggyBank className="h-6 w-6 text-blue-300" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          Free Estimates
                        </h3>
                        <p className="text-blue-200 text-sm">
                          No obligation quotes for your project
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-blue-700/50">
                  <p className="text-blue-200 text-sm mb-1">
                    Questions? Call us directly:
                  </p>
                  <p className="text-white text-xl font-semibold">{phone}</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-600/10 rounded-full -ml-12 -mb-12" />
            </div>

            {/* RIGHT SIDE / FORM */}
            <div className="lg:col-span-3 p-10 lg:p-12 bg-white">
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
                  <h3 className="text-2xl font-bold text-gray-800 mb-8">
                    Tell Us About Your Project
                  </h3>

                  {/* ERROR MESSAGE */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded mb-4">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* NAME */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">
                          Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-blue-500" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-12 py-2.5 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                            placeholder="Your name"
                            required
                          />
                        </div>
                      </div>

                      {/* PHONE */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">
                          Phone
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-blue-500" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 py-2.5 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                            placeholder="(123) 456-7890"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* EMAIL */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-blue-500" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-12 py-2.5 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>

                      {/* ZIPCODE */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">
                          Zip Code
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-blue-500" />
                          </div>
                          <input
                            type="text"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={handleChange}
                            className="w-full pl-12 py-2.5 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                            placeholder="Your zip code"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Message
                      </label>
                      <div className="relative">
                        <div className="absolute top-3.5 left-4 pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-blue-500" />
                        </div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full pl-12 py-2.5 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                          placeholder="Describe your project needs..."
                          required
                        />
                      </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-secondary hover:bg-primary text-white py-2.5 px-6 rounded-lg transition-all duration-300 font-bold flex items-center justify-center group shadow-lg hover:shadow-blue-500/30"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="animate-spin mr-3 h-5 w-5" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Request A Quote
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 text-center pt-3">
                      By submitting, you agree to our{" "}
                      <Link
                        title="terms and conditions"
                        href="/terms-and-conditions"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        terms & privacy policy
                      </Link>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      <button
        onClick={openModal}
        className=" w-auto inline-flex min-w-[160px]  bg-[#6B9FE4] rounded-full text-md md:text-2xl font-barlow py-1 md:py-3 px-3 md:px-6 font-bold text-black transition-colors hover:bg-[#6B9FE4]/80 "
      >
        <div className="flex items-center gap-2 ">
          <TextQuote className="w-6 h-6 " />
          <h2 className="text-md font-thin md:text-2xl">GET A QUOTE</h2>
        </div>
      </button>
    </div>
  );
}
