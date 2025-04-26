import React, { useState } from "react";
import Container from "../../common/Container";
import Link from "next/link";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import FullContainer from "../../common/FullContainer";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { sanitizeUrl } from "@/lib/myFun";
import { Barlow_Condensed } from "next/font/google";
import CallButton from "@/components/CallButton";

const barlow = Barlow_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function Navbar({ logo, imagePath, contact_info, services }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

  const navLinks = [
    { title: "Locations", link: "locations" },
    { title: "About Us", link: "about-us" },
    { title: "Contact", link: "contact-us" },
    { title: "FAQs", link: "faqs" },
  ];

  const handleNavigation = (id) => {
    const element = document.getElementById(id);

    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    } else {
      router.push("/");
      setTimeout(() => {
        const newElement = document.getElementById(id);
        if (newElement) {
          const offset = 80;
          const elementPosition =
            newElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - offset,
            behavior: "smooth",
          });
        }
      }, 500);
    }
  };

  const scrollDropdown = () => {
    const dropdown = document.querySelector('.dropdown-services-container');
    if (dropdown) {
      dropdown.scrollBy({
        top: 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <FullContainer className="shadow-sm w-full sticky top-0 z-20 bg-white py-2 h-[82px] md:h-[112px]">
      <Container>
        <div className="flex flex-row justify-between h-full items-center w-full  md:pr-8">
          <div className="h-full flex items-center justify-center ">
            <Logo logo={logo} imagePath={imagePath} />
          </div>

          <div className="hidden lg:flex items-center text-[26px] font-barlow justify-center font-semibold gap-4 ">
            <div
              className="relative h-full"
              onMouseEnter={() => setShowServices(true)}
              onMouseLeave={() => setShowServices(false)}
            >
              <button
                className={`flex items-center h-full gap-1 ${
                  showServices ? "text-[#002B5B]" : "text-black"
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4" />
              </button>

              <div
                className={`absolute top-full left-0 w-auto min-w-[300px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] py-4 
                transition-all duration-300 ease-in-out flex flex-col lg:max-h-[540px]
                ${
                  showServices
                    ? "opacity-100 visible transform translate-y-0"
                    : "opacity-0 invisible transform -translate-y-2"
                }`}
              >
                <div className="flex-grow dropdown-services-container overflow-y-auto scrollbar-hide" 
                     style={{ 
                       scrollbarWidth: 'none', 
                       msOverflowStyle: 'none',
                       '::-webkit-scrollbar': { display: 'none' } 
                     }}>
                  {services?.map((service, index) => (
                    <Link
                      title={service?.title}
                      key={index}
                      href={sanitizeUrl(service?.title)}
                      className="text-black text-xl py-1 font-medium px-4 hover:bg-primary hover:text-white cursor-pointer transition-all duration-100 block"
                    >
                      {service?.title}
                    </Link>
                  ))}
                </div>
                
                <div className="sticky bottom-0 w-full bg-white py-2 mt-2 flex justify-center border-t">
                  <div 
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-[#002B5B] transition-colors"
                    onClick={scrollDropdown}
                  >
                    <ChevronDown className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.link)}
                className="cursor-pointer text-black hover:text-[#002B5B] transition-colors"
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className=" flex items-center justify-end flex-row">
            <div className="flex flex-col gap-1 md:gap-2 justify-center items-center">
              <div className="">
                <CallButton phone={contact_info?.phone} />
              </div>
              <h2
                className={`text-primary font-bold text-lg md:text-[25px] font-barlow leading-none`}
              >
                Call Us Today
              </h2>
            </div>

            <div className="lg:hidden text-white pl-5 cursor-pointer" onClick={toggleMenu}>
              {isOpen ? (
                <div className="bg-primary  pt-1.5 rounded-[3px] p-0.5">
                <X className="w-7 h-6" />
                </div>
              ) : (
                <div className="bg-primary  pt-1.5 rounded-[3px] p-0.5">
                  <Menu className="w-7 h-6" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div className={`lg:hidden py-2 bg-white absolute top-[75px] left-0 right-0 w-full transition-all duration-300 ${isOpen ? 'h-fit opacity-100 visible' : 'h-0 opacity-0 invisible overflow-hidden'}`}>
        <div className="flex flex-col font-barlow font-[600] text-[18px]">
          <Link
            title="Home"
            href="/"
            className={`px-4 py-1 ${pathname === '/' ? 'bg-primary text-white' : 'text-black bg-transparent'}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          
          <div className="">
            <div 
              className={`px-4 py-1 flex items-center cursor-pointer ${pathname.includes('/services') ? 'bg-primary text-white' : 'text-black bg-transparent'}`}
              onClick={() => setShowServices(!showServices)}
            >
              Services
              <ChevronDown className="w-4 h-4" />
            </div>
            
            {showServices && (
              <div className=" mt-2 flex flex-col max-h-[300px] overflow-y-auto gap-2">
                {services?.map((service, index) => {
                  const serviceUrl = sanitizeUrl(service?.title);
                  return (
                    <Link
                      title={service?.title}
                      key={index}
                      href={serviceUrl}
                      className={`py-1 pl-7 px-4 ${pathname.includes(serviceUrl) ? 'bg-primary text-white' : 'text-black hover:text-primary'} text-lg`}
                      onClick={() => setIsOpen(false)}
                    >
                      {service?.title}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          
          {navLinks.map((item, index) => {
            const linkPath = `/${item.link}`;
            return (
              <button
                key={index}
                className={`px-4 py-1 cursor-pointer text-left ${pathname.includes(linkPath) ? 'bg-primary text-white' : 'text-black bg-transparent'}`}
                onClick={() => {
                  handleNavigation(item.link);
                  setIsOpen(false);
                }}
              >
                {item.title}
              </button>
            );
          })}
          
        </div>
      </div>
    </FullContainer>
  );
}
