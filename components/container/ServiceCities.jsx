"use client";
import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";
import Heading from "../common/Heading";
import location_image from "../../public/st-images/location.png";
export default function ServiceCities({ data }) {
  const cities = data?.list || [];

  return (
    <FullContainer
      className="pt-6 overflow-hidden"
      id="locations"
    >
      {/* Background Map */}

      <Container className="relative pb-14 pr-4">
        <div className="absolute inset-0 z-0">
          <Image
            title="Service Cities Map"
            src="https://tampa-chimney.com/wp-content/uploads/2025/02/172991-map-usa-png-download-free1-1.webp"
            alt="Service Cities"
            className="w-full h-full object-cover object-center opacity-10"
            fill
          />
          <div className="absolute inset-0 bg-white/40"></div>
        </div>
        {/* Header Section */}
        <div className="relative ">
          <Heading text="Service Cities" className="pb-6 pt-12" />

          <div className="grid md:px-2 z-30 grid-cols-3 gap-y-[6px] gap-x-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  ">
            {cities.map((city, index) => (
              <div key={index} className="flex items-center">
               <div className="w-[14px] h-[14px] md:w-[20px] md:h-[20px] mr-[10px]">
                <Image title="Location Image" src={location_image} alt={city} width={500} height={500} className="w-full h-full" /> 
               </div>
                <div className="text-primary text-[13.5px] md:text-[19.5px] font-barlow font-[500] leading-tight md:leading-none transition-colors cursor-pointer">
                  {city}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
