"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
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

export default function ServiceBanner({ image, data, form_head, features }) {
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

  const router = useRouter();
  const { service } = router.query;

  return (
    <FullContainer className="relative bg-white overflow-hidden md:!h-[790px]">
      <div className="absolute inset-0 h-[600px] md:min-h-[790px] overflow-hidden">
        <Image
          src={image}
          title={data?.imageTitle || data?.title || "Banner"}
          alt={data?.altImage || data?.tagline || "No Banner Found"}
          priority={true}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gray-950/70"></div>
      </div>
      <Container className="py-10 font-barlow relative z-10 mt-10 md:mt-0">
        <div className="w-full grid grid-cols-1 md:grid-cols-banner gap-10 md:gap-[66px] text-white">
          <div className="flex flex-col justify-center md:justify-start">
            {/* Price and Pickup Section */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
              <div className="bg-gradient-to-br from-[#2d6db2] to-[#44b0df] rounded-full text-7xl md:text-8xl font-bold aspect-square h-32 md:h-36 w-32 md:w-36 flex items-center justify-center">
                <sup className="text-3xl">$</sup>
                {data?.price || "89"}
              </div>
              {service?.toLowerCase()?.replaceAll("-", " ") ===
                "rug cleaning" && (
                <div className="bg-white rounded-full text-xl md:text-3xl py-4 px-5 shadow-md text-center uppercase w-fit text-primary flex items-center justify-center font-bold gap-2">
                  <Image
                    src="/st-images/truck.png"
                    alt="Truck"
                    width={20}
                    height={20}
                    className="w-8 h-5 md:w-11 md:h-7"
                  />
                  Free pickup and delivery
                </div>
              )}
            </div>

            {/* Text Content Section */}
            <div className="flex flex-col text-center md:text-left">
              <h1 className="font-[900] uppercase text-3xl md:text-6xl leading-tight text-shadow-lg mt-2">
                {data?.heading?.replaceAll(
                  "##service##",
                  service?.replace(/-/g, " ")
                )}
              </h1>

              <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-white mt-1 mb-3 max-w-lg">
                {data?.tagline?.replaceAll(
                  "##service##",
                  service?.replace(/-/g, " ")
                )}
              </h2>

              <ul className="mb-9 space-y-1 md:space-y-2 md:mx-0 mx-auto text-left">
                {(Array.isArray(features) ? features : [])?.map((feature, idx) => {
                  const IconComponent = iconMap[feature.icon];
                  return (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-white font-medium text-base md:text-[20px]"
                    >
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-white" />
                      )}
                      {feature.text}
                    </li>
                  );
                })}
              </ul>
            </div>
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
