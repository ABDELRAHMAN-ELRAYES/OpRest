import { ChevronLeft } from "lucide-react";
import React from "react";

const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      id: 1,
      title: "خدمة عملاء مميزة",
      subtitle: "ندعمك على مدار الساعة لتحقيق أهدافك بسهولة",
      description:
        "فريق الدعم لدينا متاح دائمًا لضمان تجربة سلسة وموثوقة لعملائنا.",
      badge: "الأكثر ثقة",
      backgroundType: "image", // use background image
      backgroundImage:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      coaches: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      ],
    },
    {
      id: 2,
      title: "جودة استثنائية",
      subtitle: "نقدّم لك أفضل الحلول بخبرة واحترافية عالية",
      description:
        "نلتزم بتقديم معايير عالية من الجودة في كل خطوة، بدءًا من التخطيط وحتى التنفيذ.",
      badge: "الأكثر تميزًا",
      backgroundType: "color", // solid background
      backgroundColor: "bg-black",
      coaches: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      ],
    },
  ];

  return (
    <div className="px-8 py-20">
      <div className="max-w-[90rem] mx-auto bg-white">
        {/* Header Section */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            لماذا <span className="text-[#fda839]">تختارنا؟</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            في أوبيريست نؤمن إن ثقة عملائنا هي أساس نجاحنا. عشان كده بنوفر تجربة
            مميزة تجمع بين الجودة العالية، خدمة العملاء الممتازة، والدعم المستمر
            علشان نكون دايمًا اختيارك الأول.
          </p>

          <div className="flex items-center justify-center">
            <button className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full group hover:bg-gray-800 transition-colors">
              <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center group-hover:-translate-x-2 duration-500">
                <ChevronLeft size={20} />
              </div>
              <span className="font-medium">اكتشف المزيد</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="min-w-[680px] min-h-[500px] relative overflow-hidden rounded-3xl shadow-2xl group hover:shadow-3xl transition-all duration-300"
            >
              {/* Background */}
              <div className="absolute inset-0">
                {reason.backgroundType === "color" ? (
                  <div className={`${reason.backgroundColor} w-full h-full`} />
                ) : (
                  <img
                    src={reason.backgroundImage}
                    alt={reason.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[400px]">
                {/* Header */}
                <div>
                  {/* Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {reason.badge}
                    </span>

                    {/* Icons */}
                    <div className="flex flex-col items-end">
                      <div className="flex -space-x-2 mb-1">
                        {reason.coaches.map((coach, index) => (
                          <img
                            key={index}
                            src={coach}
                            alt={`icon-${index + 1}`}
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                      <span className="text-white/90 text-xs">
                        موصى به من
                        <br />
                        عملائنا
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {reason.title}
                  </h2>
                  <p className="text-white/90 text-lg mb-4">
                    {reason.subtitle}
                  </p>
                  <p className="text-white/70 text-sm">{reason.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-right mt-12 flex justify-between">
          <button className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full group hover:bg-gray-800 transition-colors">
            <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center group-hover:-translate-x-2 duration-500">
              <ChevronLeft size={20} />
            </div>
            <span className="font-medium"> تواصل معنا</span>
          </button>
          <p className="text-gray-600 mb-4">
            نحن هنا لنجعل رحلتك أسهل وأكثر نجاحًا.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
