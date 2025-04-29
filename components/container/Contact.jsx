import React, { useState } from "react";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";
import { CheckCircle, Loader, TextQuote } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zipcode: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    
    // Phone validation
    const phoneRegex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.replace(/[-()\s]/g, ''))) {
      newErrors.phone = "Valid phone number is required";
    }
    
    // Zipcode validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!formData.zipcode.trim() || !zipRegex.test(formData.zipcode)) {
      newErrors.zipcode = "Valid zipcode is required";
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(formData);
      setFormSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          zipcode: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle submission error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const FormSuccess = () => (
    <div className="h-full flex flex-col items-center justify-center text-center py-12" role="alert" aria-live="polite">
      <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h3 className="text-3xl font-bold text-white mb-4">
        Thank You!
      </h3>
      <p className="text-white text-xl max-w-md">
        Your request has been submitted successfully. We'll contact
        you shortly with your personalized quote.
      </p>
    </div>
  );

  const FormField = ({ label, name, type = "text", placeholder, required = true }) => (
    <div>
      <label htmlFor={name} className="block text-lg font-bold mb-1">
        {label} {required && <span className="text-red-300">*</span>}
      </label>
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            rows={4}
            className={`w-full max-h-[100px] pl-4 py-2 border-0 bg-gray-50 rounded-md outline-none text-black ${
              errors[name] ? "border-2 border-red-500" : ""
            }`}
            placeholder={placeholder}
            required={required}
            aria-invalid={!!errors[name]}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
          />
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={`w-full pl-4 py-2 border-0 bg-gray-50 rounded-md outline-none text-black ${
              errors[name] ? "border-2 border-red-500" : ""
            }`}
            placeholder={placeholder}
            required={required}
            aria-invalid={!!errors[name]}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
          />
        )}
        {errors[name] && (
          <p id={`${name}-error`} className="text-red-300 text-sm mt-1">
            {errors[name]}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <FullContainer id="contact-us" className="pb-4 relative">
      <Container className="relative z-10">
        <div>
          <div className="bg-primary gap-0 rounded-[20px] overflow-hidden mb-5 shadow-lg">
            <div className="p-7 pt-6 md:pt-10 md:p-10 lg:p-12 bg-primary text-white font-barlow">
              {formSubmitted ? (
                <FormSuccess />
              ) : (
                <>
                  <h4 className="text-3xl leading-none md:text-4xl md:leading-7 font-bold mb-4 text-white text-center">
                    10% Off Total Price for Online Booking
                  </h4>
                  <h3 className="text-[25px] leading-none md:text-4xl md:leading-7 font-bold mb-7 text-white text-center">
                    Ask For A Quote Here
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField 
                        label="Name"
                        name="name"
                        placeholder="Your full name"
                      />
                      <FormField 
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                      />
                      <FormField 
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="(123) 456-7890"
                      />
                      <FormField 
                        label="Zip Code"
                        name="zipcode"
                        placeholder="12345"
                      />
                    </div>
                    
                    <FormField 
                      label="How can we help you?"
                      name="message"
                      type="textarea"
                      placeholder="Tell us about your project or request"
                    />

                    <div className="flex flex-col text-center justify-center items-center mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-fit mx-auto bg-white text-black py-3 px-8 rounded-md transition-all duration-300 font-medium flex text-xl items-center justify-center shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
                        aria-busy={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader className="animate-spin mr-3 h-5 w-5" />
                            Processing...
                          </>
                        ) : (
                          <div className="flex items-center gap-2">
                            <TextQuote className="w-6 h-6" />
                            Get A Quote
                          </div>
                        )}
                      </button>
                    </div>
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
