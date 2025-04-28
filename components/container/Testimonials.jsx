import React, { useState, useEffect, useRef } from "react";
import Container from "../common/Container";
import Heading from "../common/Heading";
import Logo from "@/components/Logo";
import Image from "next/image";

const Testimonials = ({ data, logo, imagePath }) => {
  const testimonials = data?.list || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const animationRef = useRef(null);

  // Generate random avatars for testimonials
  const getRandomAvatar = (seed) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
  };

  // Add random avatars to testimonials if they don't have one
  const testimonialsWithAvatars = testimonials.map((testimonial, index) => ({
    ...testimonial,
    avatar: testimonial.avatar || getRandomAvatar(testimonial.name || `user-${index}`)
  }));

  // Default avatar using DiceBear
  const defaultAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=default";

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Maximum index calculation (always slide one at a time)
  const maxIndex = Math.max(0, testimonials.length - 1);

  // Calculate slide width as percentage
  const slideSize = isMobile ? 100 : 50;

  // Reset position when active index changes
  useEffect(() => {
    setPrevTranslate(activeIndex * -slideSize);
    setCurrentTranslate(activeIndex * -slideSize);
  }, [activeIndex, slideSize]);

  // Auto slide
  useEffect(() => {
    const startAutoSlide = () => {
      autoSlideRef.current = setInterval(() => {
        if (testimonials.length > 1) {
          setActiveIndex((prev) => {
            // Check if we're at the last possible position
            const visibleSlides = isMobile ? 1 : 3;
            const maxAllowedIndex = Math.max(
              0,
              testimonials.length - visibleSlides
            );

            // If at max, go back to 0, otherwise increment
            return prev >= maxAllowedIndex ? 0 : prev + 1;
          });
        }
      }, 5000);
    };

    if (!isDragging) {
      startAutoSlide();
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isDragging, testimonials.length, isMobile]);

  // Animation for smooth movement
  const animation = () => {
    if (sliderRef.current) {
      setSliderPosition();
      if (isDragging) {
        animationRef.current = requestAnimationFrame(animation);
      }
    }
  };

  const setSliderPosition = () => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${currentTranslate}%)`;
    }
  };

  // Manual drag handlers
  const handleDragStart = (e) => {
    e.preventDefault();
    if (testimonials.length <= 1) return;

    setIsDragging(true);
    setStartX(getPositionX(e));

    // Cancel auto slide and start animation frame
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }

    animationRef.current = requestAnimationFrame(animation);
  };

  const getPositionX = (e) => {
    return e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const currentX = getPositionX(e);
    const moveX = currentX - startX;
    // Convert pixel movement to percentage of slide width
    const containerWidth = sliderRef.current?.clientWidth || 1;
    const movePercent = (moveX / containerWidth) * 100;

    // Update current translate based on movement
    setCurrentTranslate(movePercent + prevTranslate);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    cancelAnimationFrame(animationRef.current);

    const movedPercent = currentTranslate - prevTranslate;
    const threshold = -15;
    const visibleSlides = isMobile ? 1 : 3;
    const maxAllowedIndex = Math.max(0, testimonials.length - visibleSlides);

    if (movedPercent < threshold) {
      // Moving forward
      if (activeIndex >= maxAllowedIndex) {
        // If at the end, go back to start
        setActiveIndex(0);
      } else {
        // Otherwise, go to next
        setActiveIndex(activeIndex + 1);
      }
    } else if (movedPercent > Math.abs(threshold)) {
      // Moving backward
      if (activeIndex <= 0) {
        // If at start, go to last valid position
        setActiveIndex(maxAllowedIndex);
      } else {
        // Otherwise, go to previous
        setActiveIndex(activeIndex - 1);
      }
    } else {
      // Not enough movement, snap back
      setCurrentTranslate(prevTranslate);
      setSliderPosition();
    }

    setIsDragging(false);
  };

  // Update the handleDragEnd function and add a new function to handle arrow clicks
  const handleArrowClick = (direction) => {
    const visibleSlides = isMobile ? 1 : 3;
    const maxAllowedIndex = Math.max(0, testimonials.length - visibleSlides);

    if (direction === "next") {
      if (activeIndex >= maxAllowedIndex) {
        // If at the end, go back to start
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    } else {
      if (activeIndex <= 0) {
        // If at start, go to last valid position
        setActiveIndex(maxAllowedIndex);
      } else {
        setActiveIndex(activeIndex - 1);
      }
    }
  };

  return (
    <>
      <section className="testimonials-section py-12 bg-white">
        <Container className="mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#002B5B] mb-2">
              Our Happy Clients
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-testimonial">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-[160px] h-auto">
                  <Logo logo={logo} imagePath={imagePath} />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-600 font-bold">
                    {logo.value.logoText}
                  </p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm font-medium">
                    {data?.reviewCount || "16"} Google Reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows for larger screens */}
            <div className="relative h-80 w-full">
              <div className="hidden md:flex gap-3 w-full absolute items-center justify-between z-20 h-80">
                <button
                  onClick={() => handleArrowClick("prev")}
                  className="w-10 h-10 flex items-center -ml-3 justify-center rounded-full bg-gray-100 border border-gray-300 hover:bg-primary hover:text-white transition-colors"
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  onClick={() => handleArrowClick("next")}
                  className="w-10 h-10 flex items-center -mr-3 justify-center rounded-full bg-gray-100 border border-gray-300 hover:bg-primary hover:text-white transition-colors"
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
              {/* Slide Indicators */}
              {testimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-6 absolute bottom-0 w-full">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeIndex === index
                          ? "bg-primary w-6"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
              <div className="testimonial-slider-container overflow-hidden mb-8 absolute bottom-0 w-full">
                <div
                  ref={sliderRef}
                  className={`testimonial-slider ${
                    isDragging ? "grabbing" : ""
                  } gap-4`}
                  style={{ transform: `translateX(${currentTranslate}%)` }}
                  onTouchStart={handleDragStart}
                  onTouchMove={handleDragMove}
                  onTouchEnd={handleDragEnd}
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                >
                  {testimonialsWithAvatars.map((testimonial, index) => (
                    <div key={index} className="testimonial-slide px-2">
                      <div className="flex-1 p-6 rounded-xl bg-gray-100 shadow-md h-full border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                        {/* Profile and Google Icon Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-primary">
                              <Image
                                src={testimonial.avatar || defaultAvatar}
                                alt={testimonial.name}
                                width={48}
                                height={48}
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div>
                              <h4 className="text-gray-800 font-semibold">
                                {testimonial.name}
                              </h4>
                              <p className="text-gray-500 text-xs">
                                {testimonial.date || "2025-03-17"}
                              </p>
                            </div>
                          </div>
                          <div className="w-6 h-6 relative">
                            <Image
                              src="/images/google-icon.svg"
                              alt="Google Review"
                              width={24}
                              height={24}
                            />
                          </div>
                        </div>

                        {/* Star Rating */}
                        <div className="flex gap-0.5 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-yellow-400">
                              ★
                            </span>
                          ))}
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-700 text-sm leading-relaxed italic">
                          "{testimonial.quote || testimonial.text}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Navigation Arrows */}
              <div className="flex md:hidden justify-between gap-3 mt-4 absolute bottom-0 w-full bg-green-600">
                <button
                  onClick={() => handleArrowClick("prev")}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-primary hover:text-white transition-colors"
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  onClick={() => handleArrowClick("next")}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-primary hover:text-white transition-colors"
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </Container>

        <style jsx>{`
          .testimonial-slider {
            display: flex;
            transition: ${isDragging ? "none" : "transform 0.5s ease"};
            cursor: grab;
            will-change: transform;
            gap: 1rem;
          }

          .testimonial-slider.grabbing {
            cursor: grabbing;
            transition: none;
          }

          .testimonial-slide {
            width: ${isMobile ? "100%" : "33.333%"};
            box-sizing: border-box;
            flex-shrink: 0;
          }
        `}</style>
      </section>
    </>
  );
};

export default Testimonials;
