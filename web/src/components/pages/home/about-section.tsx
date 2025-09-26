// AboutSection.tsx
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronsUp,
} from "lucide-react";
import React, { useState, useEffect } from "react";

// Types
interface ActivityCardProps {
  tag: string;
  title: string;
  imageSrc: string;
  isFeatured?: boolean;
}

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

// Dummy images
const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540753003857-32e72ed2e2d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
];

const ACTIVITY_IMAGES = {
  featured:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  outdoor:
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
};

// Sub-components
const IntroTextBlock: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-end h-full text-right">
      <span className="text-gray-600 text-sm font-medium mb-4 tracking-widest uppercase">
        منصة المطاعم
      </span>
      <h1 className="text-5xl lg:text-6xl font-light leading-tight mb-8">
        مرحباً بك في{" "}
        <span className="font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          أوبيريست
        </span>
        ، حيث نوفر لك تجربة رقمية متكاملة لإدارة وعرض قوائم الطعام.
      </h1>
      <button className="max-h-[50px] group flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full w-fit hover:bg-gray-900 transition-all duration-500 shadow-lg">
        <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center transition-all duration-500 group-hover:-translate-x-2">
          <ChevronLeft />
        </div>
        <span className="font-medium">تواصل معنا</span>
      </button>
    </div>
  );
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  tag,
  title,
  imageSrc,
  isFeatured = false,
}) => {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden group ${
        isFeatured ? "h-[480px]" : "h-[420px]"
      }`}
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute top-6 left-6">
        <span className="bg-white/95 backdrop-blur-md text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          {tag}
        </span>
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
        <button className="bg-white/20 backdrop-blur-sm text-white rounded-full w-12 h-12 flex items-center justify-center hover:-translate-y-3 transition-all duration-500 border border-white/30">
          <ChevronsUp size={24} />
        </button>
        <h3 className="text-white text-2xl font-light leading-tight mb-4 max-w-[20rem]">
          {title}
        </h3>
      </div>
    </div>
  );
};

const ImageSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      image: SLIDER_IMAGES[0],
      title: "اكتشف",
      subtitle: "تجربة رقمية حديثة لإدارة قوائم الطعام",
    },
    {
      id: 2,
      image: SLIDER_IMAGES[1],
      title: "إدارة احترافية",
      subtitle: "أدوات متكاملة لأصحاب المطاعم والكافيهات",
    },
    {
      id: 3,
      image: SLIDER_IMAGES[2],
      title: "مجتمع أوبيريست",
      subtitle: "انضم إلى شبكة من أفضل المطاعم والعلامات التجارية",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      {/* Slider Container */}
      <div className="relative rounded-3xl overflow-hidden h-[350px] mb-6">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-white/80 text-sm font-medium mb-2 block">
                الغلاف
              </span>
              <h3 className="text-white text-2xl font-light mb-2">
                {slide.title}
              </h3>
              <p className="text-white/90 text-lg">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Centered below the slider */}
      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="hover:bg-black hover:text-white rounded-full w-14 h-14 flex items-center justify-center border border-black transition-all duration-500"
          >
            <ArrowLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="hover:bg-black hover:text-white rounded-full w-14 h-14 flex items-center justify-center border border-black transition-all duration-500 "
          >
            <ArrowRight size={24} />
          </button>
        </div>
        <div className="text-right">
          <p>
            نحن في <strong>أوبيريست</strong> نسعى لتسهيل تجربة العملاء
            وأصحاب الأعمال عبر توفير منصة مبتكرة لعرض القوائم والتفاعل مع
            الزبائن.
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Component
const AboutSection: React.FC = () => {
  return (
    <section className="py-20 px-4 lg:px-8">
      <div className="max-w-[90rem] mx-auto">
        <div className="grid items-center grid-cols-1 lg:grid-cols-3 gap-[2rem] mb-20">
          <div className="lg:col-span-2 flex items-center gap-4">
            <div className="flex-1">
              <ImageSlider />
            </div>
            <div className="flex-[1.5]">
              <ActivityCard
                tag="المطاعم"
                title="مساحة مرنة لعرض قوائم الطعام بطريقة جذابة وسهلة"
                imageSrc={ACTIVITY_IMAGES.featured}
                isFeatured={true}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <IntroTextBlock />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
