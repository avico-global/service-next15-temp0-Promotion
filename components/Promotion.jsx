import Container from "./common/Container";
import FullContainer from "./common/FullContainer";

const PromotionCard = ({
  title,
  price,
  originalPrice,
  serviceTitle,
  features,
  isMainCard = false,
}) => {
  return (
    <div
      className={`border-2 border-dashed border-blue-900 p-6 rounded-lg ${
        isMainCard ? "bg-blue-900 text-white" : "bg-white"
      }`}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          {title === "WHY CHOOSE US?" && (
            <p className="text-lg font-semibold">Key Advantages</p>
          )}
        </div>
      )}

      {price && (
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">Now </span>
            <span className="text-5xl font-bold ml-1">${price}</span>
          </div>
          {originalPrice && (
            <div className="mt-2">
              <span className="text-lg">ORIGINAL PRICE </span>
              <span className="line-through">${originalPrice}</span>
            </div>
          )}
          {serviceTitle && (
            <div className="text-xl font-bold mt-2">{serviceTitle}</div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <svg
              className={`w-5 h-5 ${
                isMainCard ? "text-white" : "text-blue-900"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full mt-6 py-3 rounded-lg font-bold text-center ${
          isMainCard ? "bg-white text-blue-900" : "bg-blue-900 text-white"
        }`}
      >
        Call For Redeem
      </button>
    </div>
  );
};

const FullMonthPromotion = () => {
  return (
    <FullContainer>
      <Container>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
            Full Month Promotion
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Card */}
            <PromotionCard
              title="WHY CHOOSE US?"
              features={[
                "Protect your home with cleaner indoor air",
                "Boost airflow and enhance HVAC performance",
                "Say goodbye to indoor dust and allergens",
                "Keep your family healthier and breathing easier",
                "Enjoy long-term savings through energy efficiency",
              ]}
            />

            {/* Middle Card */}
            <PromotionCard
              price="89"
              originalPrice="339"
              serviceTitle="FULL AIR DUCT CLEANING & SYSTEM SANITIZATION"
              features={[
                "Per Unit",
                "Complete Air Duct Cleaning",
                "HVAC System Check",
                "Air Flow Optimization",
                "Mold & Dust Inspection",
                "Vent Cover Cleaning",
              ]}
              isMainCard={true}
            />

            {/* Right Card */}
            <PromotionCard
              price="69"
              originalPrice="259"
              serviceTitle="FULL INSPECTION"
              features={[
                "Air Duct Inspection",
                "System Efficiency Check",
                "Air Flow Test",
                "Dust & Debris Analysis",
                "Vent Cover Condition Check",
                "Filter Condition Assessment",
              ]}
            />
          </div>
        </div>
      </Container>
    </FullContainer>
  );
};

export default FullMonthPromotion;
