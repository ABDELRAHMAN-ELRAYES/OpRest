// AdvantagesSection.tsx
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import React, { useState } from "react";

interface TabType {
  id: string;
  label: string;
  title: string;
  description: string;
}

const COURT_IMAGES = {
  restaurants: "/images/court1.jpg", // استكشف أفضل المطاعم
  offers: "/images/court2.jpg", // عروض وخصومات
  orders: "/images/court3.jpg", // متابعة الطلبات
};

const CourtCarouselCard: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  const slides = [
    {
      id: "restaurants",
      image: COURT_IMAGES.restaurants,
      title: "استكشف أفضل المطاعم",
      description:
        "تصفح قوائم متنوعة من المطاعم المحلية والعالمية مع تجربة سلسة وسريعة.",
    },
    {
      id: "offers",
      image: COURT_IMAGES.offers,
      title: "عروض وخصومات حصرية",
      description: "استمتع بعروض يومية مميزة وخصومات على وجباتك المفضلة.",
    },
    {
      id: "orders",
      image: COURT_IMAGES.orders,
      title: "إدارة طلباتك بسهولة",
      description: "تابع طلباتك خطوة بخطوة من المطعم لحد باب بيتك.",
    },
  ];

  const activeSlide = slides[currentSlide - 1];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length ? 1 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 1 ? slides.length : prev - 1));
  };

  return (
    <div className="relative">
      <div className="bg-black rounded-3xl p-4 relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 min-w-[20rem] min-h-[30rem]">
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8A9A87]/20 to-transparent" />
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="flex flex-col justify-between p-4">
            <div className="flex flex-col justify-center items-end">
              <h2 className="text-3xl lg:text-4xl font-light text-white mb-6 leading-tight">
                {activeSlide.title}
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                {activeSlide.description}
              </p>
              <button className="max-h-[50px] group bg-white text-black px-8 py-4 rounded-full w-fit hover:bg-[#fda839] transition-all duration-500 shadow-lg flex items-center gap-3">
                <div className="bg-[#fda839] text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-500 group-hover:-translate-x-2">
                  <ChevronLeft />
                </div>
                <span>ابدأ الآن</span>
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-6 mt-6">
              <span className="text-white/80 text-sm font-medium">
                {String(currentSlide).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="backdrop-blur-sm text-white border border-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextSlide}
                  className="backdrop-blur-sm text-white border border-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ExcellenceDescriptionProps {
  activeTab: string;
}

const ExcellenceDescription: React.FC<ExcellenceDescriptionProps> = ({
  activeTab,
}) => {
  const content = {
    restaurants: {
      title: "منصة ذكية لاكتشاف المطاعم",
      description:
        "في أوبيريست، بنقدملك منصة ذكية تجمع كل المطاعم في مكان واحد. تقدر تكتشف أطباق جديدة وتوصل بسهولة لاختيارك المثالي.",
    },
    offers: {
      title: "عروض يومية مميزة",
      description:
        "مع أوبيريست، هتلاقي دايمًا الجديد. من الخصومات الموسمية لباقة العروض اليومية، بنوفرلك تجربة أكل أوفر وأغنى.",
    },
    orders: {
      title: "سهولة متابعة الطلبات",
      description:
        "أوبيريست مش بس منصة للمنيو، دي كمان أداة ذكية لمتابعة طلباتك لحظة بلحظة، وتسهيل عملية الدفع والتواصل مع المطعم.",
    },
  };

  const currentContent =
    content[activeTab as keyof typeof content] || content.restaurants;

  return (
    <div className="relative">
      <h2 className="text-5xl lg:text-6xl font-light leading-tight mb-8">
        {currentContent.title}
      </h2>
      <div className="flex gap-8 items-start">
        <div className="w-[15rem]">
          <div className="relative min-w-[15rem]">
            <img
              src="/images/court2.jpg"
              alt="Food experience"
              className="rounded-2xl shadow-lg h-[15rem] w-[15rem] object-cover"
            />
            <div className="absolute top-[5rem] left-[-3rem] bg-[#fda839] text-white rounded-full w-24 h-24 flex items-center justify-center text-2xl font-light hover:rotate-[225deg] duration-500 cursor-pointer">
              <Plus />
            </div>
          </div>
        </div>
        <div>
          <p className="text-gray-700 text-lg leading-relaxed">
            {currentContent.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const AdvantagesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("restaurants");

  return (
    <div className="py-20 px-8">
      <section>
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Right Column - Tabs + Description */}
            <div>
              <ExcellenceDescription activeTab={activeTab} />
              <div className="flex gap-2 mt-8 justify-end">
                <button
                  onClick={() => setActiveTab("restaurants")}
                  className={`px-6 py-2 rounded-full text-md font-medium transition-all duration-300 ${
                    activeTab === "restaurants"
                      ? "bg-[#fda839] text-white shadow-lg transform scale-105"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-md"
                  }`}
                >
                  المطاعم
                </button>
                <button
                  onClick={() => setActiveTab("offers")}
                  className={`px-6 py-2 rounded-full text-md font-medium transition-all duration-300 ${
                    activeTab === "offers"
                      ? "bg-[#fda839] text-white shadow-lg transform scale-105"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-md"
                  }`}
                >
                  العروض
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`px-6 py-2 rounded-full text-md font-medium transition-all duration-300 ${
                    activeTab === "orders"
                      ? "bg-[#fda839] text-white shadow-lg transform scale-105"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:shadow-md"
                  }`}
                >
                  الطلبات
                </button>
              </div>
            </div>

            {/* Left Column - Carousel */}
            <div>
              <CourtCarouselCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvantagesSection;
