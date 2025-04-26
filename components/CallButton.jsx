import { Phone } from "lucide-react";
import Link from "next/link";
import { Barlow_Condensed } from "next/font/google";

const barlow = Barlow_Condensed({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const CallButton = ({ phone }) => {
  return (
    <Link
      title="Call Button"
      href={`tel:${phone}`}
      className="bg-primary flex hover:bg-secondary text-white py-1 md:py-3 px-3 md:px-8 font-medium rounded-full items-center justify-center text-[17px] md:text-2xl w-fit font-barlow"
    >
      <Phone className="w-4 h-4 md:w-6 md:h-6 " />
      <div>

      {phone}
      </div>
    </Link>
  );
};

export default CallButton;
