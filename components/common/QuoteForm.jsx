import React, { useState, useEffect } from "react";
import { CheckCircle, Loader, FileText, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function QuoteForm({
  data,
  form_head,
  showArrowInButton = false,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userIP, setUserIP] = useState("");
  const [formStarted, setFormStarted] = useState(false);

  // Function to get user's IP address
  const getUserIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP:", error);
      return "";
    }
  };

  // Get user IP on component mount
  useEffect(() => {
    getUserIP().then((ip) => setUserIP(ip));
  }, []);

  // Function to handle first form interaction
  const handleFirstInteraction = () => {
    if (!formStarted) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form start",
        url: window.location.href,
      });

      setFormStarted(true);
    }
  };

  // Function to fire GTM event
  const fireGTMEvent = (submittedFormData, userIP) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "form submitted",
        url: window.location.href,
        formData: {
          name: `${submittedFormData.firstName} ${submittedFormData.lastName}`,
          email: submittedFormData.email,
          phone: submittedFormData.phone,
          message: submittedFormData.message,
          userIP: userIP || "",
        },
      });
    }
  };

  // Function to fire Lead Submitted GTM event
  const fireLeadSubmittedEvent = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "Lead Submitted",
        url: window.location.href,
      });
    }
  };

  // Function to close thank you popup and reset form
  const closeThankYouPopup = () => {
    // Fire Lead Submitted event when user acknowledges the thank you message
    fireLeadSubmittedEvent();

    setFormSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
    setFieldErrors({
      phone: "",
    });
  };

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
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        user_ip: userIP,
      };

      const response = await fetch(
        "https://api.logicalcrm.com/web_api/web/web_query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! Please Contact support status: ${response.status}`
        );
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      // Fire GTM event for successful form submission
      fireGTMEvent(formData, userIP);

      // Show success toast
      toast.success(
        "Your request has been submitted successfully! We'll contact you shortly."
      );

      // Set form as submitted
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      // Show error toast instead of setting inline error
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)] relative font-barlow rounded-[15px] px-4 md:px-10 pb-8 md:pb-10 pt-10 md:pt-14">
      <div className="bg-gradient-to-br absolute -top-10 -left-5 md:-left-10 from-blue-800 via-sky-400 from-20% to-green-400 rounded-full p-3 text-4xl md:text-5xl font-bold aspect-square h-20 w-20 md:h-24 md:w-24 flex items-center justify-center text-white">
        <sup className="text-xl">$</sup>
        {data?.price || "89"}
      </div>

      <h3 className="text-3xl md:text-4xl leading-7 md:leading-[30px] font-bold text-center mb-2 text-primary">
        {form_head?.title || "10% Off Total Price for Online Booking"}
      </h3>
      <h4 className="text-lg pt-3 font-bold text-center mb-6 text-[#11121A]">
        {form_head?.sub_title || "Request a Quote"}
      </h4>

      {formSubmitted ? (
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600 max-w-md mb-6">
            Your request has been submitted successfully. We'll contact you
            shortly with your personalized quote.
          </p>
          <button
            onClick={closeThankYouPopup}
            className="bg-[#6B9FE4] hover:bg-[#5B88C4] text-black py-2 px-6 rounded-md font-medium transition-colors duration-200"
          >
            OK Thanks
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 text-black">
          <div className="grid grid-cols-2 gap-[10px]">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onFocus={handleFirstInteraction}
              className="w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600"
              placeholder="First name"
              required
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onFocus={handleFirstInteraction}
              className="w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600"
              placeholder="Last name"
              required
            />
          </div>

          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className={`w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600 ${
              fieldErrors.phone ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="(123) 456-7890"
            required
          />
          {fieldErrors.phone && (
            <div className="text-red-500 text-sm font-medium">
              {fieldErrors.phone}
            </div>
          )}

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            className="w-full pl-3 py-2 bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600"
            placeholder="your@email.com"
            required
          />

          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={handleFirstInteraction}
            rows="3"
            className="w-full pl-3 py-2 max-h-[75px] bg-white border border-gray-200 rounded-md outline-none placeholder:text-gray-600"
            placeholder="Message"
            required
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#6B9FE4] hover:bg-[#5B88C4] text-black py-3 px-6 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin mr-2 h-4 w-4" />
                Sending...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                GET A QUOTE
                {showArrowInButton && (
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
