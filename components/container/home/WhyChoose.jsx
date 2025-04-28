import React from "react";
import Image from "next/image";
import Container from "../../common/Container";
import {
  Clock,
  Star,
  Shield,
  Award,
  CheckCircle,
  Trophy,
  ThumbsUp,
  Phone,
  FileText,
  MessageSquare,
} from "lucide-react";
import FullContainer from "@/components/common/FullContainer";

export default function WhyChoose({ image, contact_info, phone, data }) {
  const iconMap = {
    Clock,
    Star,
    Shield,
    Award,
    CheckCircle,
    Trophy,
    ThumbsUp,
    Phone,
    FileText,
    MessageSquare,
  };

  return (
    <FullContainer className="py-8 md:py-12 bg-white mt-4">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left: Text & Features */}
          <div className="w-5/12 flex flex-col items-start justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A2956] mb-4">
              Why Choose Us
            </h2>
            <ul className="mb-6 space-y-3">
              {data?.map((feature, idx) => {
                const IconComponent = iconMap[feature.icon];
                return (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-[#1A2956] font-medium text-base md:text-[17px]"
                  >
                    {IconComponent && (
                      <IconComponent className="w-5 h-5 text-[#1A2956]" />
                    )}
                    {feature.text}
                  </li>
                );
              })}
            </ul>
            <div className="flex gap-4 w-full mt-2">
              <a
                href={`tel:${contact_info?.phone}`}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A2956] text-white font-semibold text-lg shadow hover:bg-[#22397a] transition-all"
              >
                <Phone className="w-5 h-5" />
                {phone}
              </a>
              <a
                href="#quote"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#6B9AED] text-[#1A2956] font-semibold text-lg shadow hover:bg-[#4d7edc] transition-all"
              >
                <FileText className="w-5 h-5" />
                GET A QUOTE
              </a>
            </div>
          </div>
          {/* Right: Image */}
          <div className="w-7/12 flex justify-center relative">
            <div className="rounded-lg overflow-hidden w-full h-[320px] bg-gray-200 relative">
              <Image
                src={image}
                alt="Professional air duct cleaning"
                fill
                className="object-cover"
                style={{ position: "absolute" }}
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}
