import React from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import QuoteForm from "@/components/common/QuoteForm";

import {
  Clock,
  Star,
  Shield,
  Award,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
} from "lucide-react";

export default function Banner({ image, data, form_head, features, niche }) {
  const iconMap = {
    Clock,
    Star,
    Shield,
    Award,
    Trophy,
    ThumbsUp,
    Phone,
    FileText,
    MessageSquare,
  };

  return (
    <FullContainer className="relative bg-white overflow-hidden min-h-[700px] sm:min-h-[800px] md:h-[790px]">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={image}
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "No Banner Found"}
          priority={true}
          fill
          sizes="100vw"
          className="object-cover object-center"
          fetchPriority="high"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGxEiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        <div className="absolute inset-0 bg-gray-950/70"></div>
      </div>

      <Container className="py-6 sm:py-10 md:py-20 font-barlow relative z-10 h-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-banner gap-6 sm:gap-8 md:gap-[66px] text-white h-full">
          <div className="relative flex flex-col justify-center text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 md:pl-0">
              <div
                className={`${
                  data?.price !== "Free Estimate"
                    ? "text-5xl sm:text-6xl md:text-8xl h-24 sm:h-32 md:h-36 w-24 sm:w-32 md:w-36 rounded-full"
                    : "text-lg sm:text-2xl text-center drop-shadow-lg uppercase font-poppins h-16 w-28 sm:h-20 sm:w-32 md:h-24 md:w-44 rounded-full"
                } font-bold aspect-square flex items-center justify-center bg-gradient-to-br from-blue-800 via-sky-500 from-20% to-green-400`}
              >
                {data?.price !== "Free Estimate" && (
                  <sup className="text-xl sm:text-2xl md:text-3xl">$</sup>
                )}
                {data?.price !== "Free Estimate" ? (
                  data?.price || "89"
                ) : (
                  <span className="flex items-center gap-2 relative">
                    <Star className="w-3 h-3 text-white/50 absolute top-0 left-0" />{" "}
                    Free <br /> Estimate
                  </span>
                )}
              </div>
            </div>

            {niche?.toLowerCase()?.replaceAll("-", " ") !==
              "carpet cleaning" && (
              <p className="text-xl md:text-3xl font-semibold mt-3 text-white">
                Special Complete Inspection
              </p>
            )}

            <h1 className="font-[900] uppercase text-2xl sm:text-4xl mt-3 md:text-6xl leading-tight text-shadow-lg">
              {data?.title}
            </h1>
            <h2 className="text-xl sm:text-3xl md:text-6xl uppercase font-[900] leading-tight text-white mt-2">
              {data?.tagline}
            </h2>
            <p className="text-base sm:text-lg md:text-3xl mb-1">
              {data?.description}
            </p>

            <ul className="mb-4 sm:mb-6 md:mb-9 space-y-1 md:space-y-2 mx-auto md:mx-0">
              {(Array.isArray(features) ? features : [])?.map(
                (feature, idx) => {
                  const IconComponent = iconMap[feature.icon];
                  return (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-white font-medium text-base md:text-[17px]"
                    >
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-white" />
                      )}
                      {feature.text}
                    </li>
                  );
                }
              )}
            </ul>
          </div>

          <div
            className="flex flex-col justify-center px-3"
            id="quote-form-section"
          >
            <QuoteForm
              data={data}
              form_head={form_head}
              showArrowInButton={false}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
