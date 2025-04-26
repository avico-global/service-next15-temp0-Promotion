import React, { useState, useEffect, useRef } from "react";
import Container from "../common/Container";
import Heading from "../common/Heading";
import Logo from "@/components/Logo";

const Testimonials = ({ data,logo,imagePath }) => {
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
            const maxAllowedIndex = Math.max(0, testimonials.length - visibleSlides);
            
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

    if (direction === 'next') {
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

  // Get visible testimonials
  const getCurrentTestimonials = () => {
    if (isMobile) {
      // On mobile, show just the active one
      return [testimonials[activeIndex]];
    } else {
      // On desktop, show the active one and the next one
      const nextIndex = (activeIndex + 1) % testimonials.length;
      return [testimonials[activeIndex], testimonials[nextIndex]];
    }
  };

  return (
    <>
      {data.design ? (
        <section className="testimonials-section py-12 bg-white">
          <Container className="mx-auto px-4">
            <div className="grid grid-cols-testimonial">


            <div className="flex items-center gap-4 mb-8">
              <div className="w-[180px]">
                <Logo logo={logo} imagePath={imagePath} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{data?.reviewCount || "16"} Google Reviews</p>
              </div>
            </div>

            <div className="testimonial-slider-container overflow-hidden mb-8">
              <div 
                ref={sliderRef}
                className={`testimonial-slider ${isDragging ? 'grabbing' : ''} gap-4`}
                style={{ transform: `translateX(${currentTranslate}%)` }}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-slide px-2">
                    <div className="flex-1 p-6 rounded-xl bg-gray-50 shadow-sm h-full border border-gray-100">
                      {/* Profile and Google Icon Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <img 
                            src={testimonial.avatar || "https://via.placeholder.com/40"} 
                            alt={testimonial.name} 
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h4 className="text-gray-800 font-semibold">{testimonial.name}</h4>
                            <p className="text-gray-500 text-sm">{testimonial.date || "2025-03-17"}</p>
                          </div>
                        </div>
                        <img 
                          src="/google-icon.png" 
                          alt="Google Review" 
                          className="w-5 h-5"
                        />
                      </div>
                      
                      {/* Star Rating */}
                      <div className="flex gap-0.5 mb-3">
                        {[1,2,3,4,5].map((star) => (
                          <span key={star} className="text-yellow-400 text-sm">★</span>
                        ))}
                      </div>
                      
                      {/* Review Text */}
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {testimonial.quote || testimonial.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>


            {/* Updated Navigation Arrows */}
            <div className="flex justify-center gap-2 mt-6">
              <button 
                onClick={() => handleArrowClick('prev')}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
              >
                ←
              </button>
              <button 
                onClick={() => handleArrowClick('next')}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
              >
                →
              </button>
            </div>
          </Container>
          
          <style jsx>{`
            .testimonial-slider {
              display: flex;
              transition: ${isDragging ? 'none' : 'transform 0.5s ease'};
              cursor: grab;
              will-change: transform;
              gap: 1rem;
            }
            
            .testimonial-slider.grabbing {
              cursor: grabbing;
              transition: none;
            }
            
            .testimonial-slide {
              width: ${isMobile ? '100%' : '33.333%'};
              box-sizing: border-box;
              flex-shrink: 0;
            }
          `}</style>
        </section>
      ) : (
        <section className="testimonials-section py-8 overflow-hidden bg-gradient-to-b from-white to-gray-50">
          <Container className="mx-auto px-4">
            <Heading
              text={data?.heading || "Our Happy Clients"}
              className="pb-6"
            />

            <div className="testimonial-slider-container overflow-hidden mb-8">
              <div
                ref={sliderRef}
                className={`testimonial-slider ${isDragging ? "grabbing" : ""}`}
                style={{ transform: `translateX(${currentTranslate}%)` }}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-slide px-1.5">
                    <div className="flex-1 py-6 px-10 border border-blue-900 rounded-3xl flex flex-col bg-white shadow-md h-full">
                      <p className="text-center text-gray-900 italic mb-8 text-base md:text-lg leading-relaxed">
                        "{testimonial.quote || testimonial.text}"
                      </p>

                      <div className="mt-auto text-center">
                        <h4 className="text-2xl text-blue-800 font-bold mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>

          <style jsx>{`
            .testimonials-section {
              background: linear-gradient(to bottom, #ffffff, #f8f9fa);
            }

            .testimonials-section h2 {
              color: #0a3161;
              font-size: 2.25rem;
              margin-bottom: 2.5rem;
            }

            .testimonial-slider-container {
              overflow: hidden;
              position: relative;
            }

            .testimonial-slider {
              display: flex;
              transition: ${isDragging ? "none" : "transform 0.5s ease"};
              cursor: grab;
              will-change: transform;
            }

            .testimonial-slider.grabbing {
              cursor: grabbing;
              transition: none;
            }

            .testimonial-slide {
              width: ${isMobile ? "100%" : "50%"};
              box-sizing: border-box;
              flex-shrink: 0;
            }

            .testimonials-section .flex-1 {
              border-radius: 20px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
              background-color: white;
            }

            .testimonials-section h4 {
              color: #0a3161;
              font-weight: 700;
              font-size: 1.5rem;
              margin-bottom: 0.25rem;
            }

            .testimonials-section p.text-gray-600 {
              color: #6b7280;
            }
          `}</style>
        </section>
      )}
    </>
  );
};

export default Testimonials;
