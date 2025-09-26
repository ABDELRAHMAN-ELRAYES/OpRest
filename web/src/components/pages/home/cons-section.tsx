"use client";

import { ChevronRight } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

export default function ConsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderCards = [
    {
      id: 1,
      title: "سهولة الاستخدام",
      description: "منيو رقمي بسيط وسلس يسهّل على عملاءك التصفح والطلب.",
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1200&auto=format&fit=crop&q=80", // شخص يستخدم جهاز تابلت في مطعم
    },
    {
      id: 2,
      title: "تجربة عصرية",
      description: "تصميم حديث يبرز علامتك التجارية ويجذب عملاء جدد.",
      image:
        "https://images.unsplash.com/photo-1601924582971-df3f3e6f5f3d?w=1200&auto=format&fit=crop&q=80", // مطعم بتصميم حديث
    },
    {
      id: 3,
      title: "إدارة فعالة",
      description: "تحكم كامل في الطلبات والمنتجات والتحديثات في أي وقت.",
      image:
        "https://images.unsplash.com/photo-1556742400-b5b7c5121f4e?w=1200&auto=format&fit=crop&q=80", // شخص يدير الطلبات من لابتوب
    },
    {
      id: 4,
      title: "تعدد اللغات",
      description: "ادعم جميع عملاءك بسهولة مع واجهة متعددة اللغات.",
      image:
        "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1200&auto=format&fit=crop&q=80", // تواصل بين أشخاص بلغات مختلفة
    },
    {
      id: 5,
      title: "تحليلات وتقارير",
      description: "اعرف أداء مطعمك وطور قراراتك بناءً على بيانات دقيقة.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80", // شاشة تحليلات وبيانات
    },
  ];

  const infiniteCards = [...sliderCards, ...sliderCards, ...sliderCards];
  const cardWidth = 260; // Card width + gap

  // Mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Infinite scroll effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const totalOriginalWidth = sliderCards.length * cardWidth;

      if (slider.scrollLeft >= totalOriginalWidth * 2) {
        slider.scrollLeft = totalOriginalWidth;
      } else if (slider.scrollLeft <= 0) {
        slider.scrollLeft = totalOriginalWidth;
      }
    };

    slider.addEventListener("scroll", handleScroll);
    slider.scrollLeft = sliderCards.length * cardWidth;

    return () => slider.removeEventListener("scroll", handleScroll);
  }, [sliderCards.length]);

  // Auto-scroll effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      slider.scrollBy({ left: cardWidth, behavior: "smooth" });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 px-8 min-h-[80vh] flex items-center justify-center">
      <section className="max-w-[90rem] mx-auto flex flex-col items-end">
        <h2 className="text-right max-w-7xl text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 lg:mb-10 leading-tight">
          مزايا <span className="text-[#fda839]">أوبيريست</span>
        </h2>

        <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Slider Section */}
          <div>
            <div
              ref={sliderRef}
              className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex gap-4 pb-2 w-max">
                {infiniteCards.map((card, index) => (
                  <div
                    key={`${card.id}-${index}`}
                    className="flex-shrink-0 w-64 h-72 rounded-2xl overflow-hidden relative shadow-lg transition-transform duration-300 ease-out"
                    style={{
                      backgroundImage: `url(${card.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/50 p-5 flex flex-col justify-between text-white">
                      <div>
                        <h4 className="font-bold text-lg mb-2">{card.title}</h4>
                        <p className="text-sm opacity-90">{card.description}</p>
                      </div>
                      <div className="flex justify-end">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="my-4 text-base sm:text-lg text-gray-700 leading-relaxed text-right">
                في <span className="font-bold text-[#fda839]">أوبيريست</span>{" "}
                بنوفر لعملاءك تجربة طلب سهلة وسلسة من خلال منيو رقمي جذاب يسهّل
                التصفح ويعكس هوية مطعمك.
              </p>
              <p className="my-4 text-base sm:text-lg text-gray-700 leading-relaxed text-right">
                ومن جهة الإدارة، نمنحك أدوات قوية لإدارة الطلبات والمنتجات
                ومتابعة الأداء بشكل لحظي يساعدك في زيادة المبيعات وتحسين
                القرارات.
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-right">
              في <span className="font-bold text-[#fda839]">أوبيريست</span>{" "}
              نساعد المطاعم والمقاهي على تقديم تجربة رقمية مميزة لعملائهم من
              خلال منيو تفاعلي سهل الإدارة يعكس علامتك التجارية ويزيد من
              مبيعاتك.
            </p>

            <div className="relative h-80 min-h-[30rem] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/slider/details.jpg"
                alt="منيو رقمي عصري"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white text-xl font-bold mb-2">
                  واجهة تفاعلية عصرية
                </h3>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-medium transition">
                  اعرف المزيد
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
