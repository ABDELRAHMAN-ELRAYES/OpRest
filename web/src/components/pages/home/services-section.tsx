"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

interface Service {
  id: number;
  name: string;
  tags: string[];
  description: string;
  image: string;
}
const services: Service[] = [
  {
    id: 1,
    name: "شيف التطوير",
    tags: ["ابتكار وصفات", "نكهات فريدة", "هوية المطعم"],
    description:
      "نقدّم لك مهارات متخصصة لصنع وصفات مبتكرة تميّز مطعمك عن المنافسين، مع التركيز على المزج بين النكهات المحلية والعالمية. فريقنا يساعدك في بناء هوية طعام فريدة تلهم الزبائن وتزيد من ولائهم لتجربتك.",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "مدير التشغيل الذكي",
    tags: ["إدارة يومية", "تنسيق الأداء", "عمل متكامل"],
    description:
      "نوفّر لك إدارة متكاملة لتشغيل مطعمك بفعالية، بدءًا من الجداول اليومية للموظفين وحتى متابعة الجودة في كل طبق يُقدَّم. هدفنا ضمان عمل سلس، إنتاجية عالية، وتجربة خالية من العشوائية أو الأخطاء.",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "تحليل تكلفة المنتجات",
    tags: ["هوامش الربح", "تحليل دقيق", "تسعير استراتيجي"],
    description:
      "نساعدك على حساب تكلفة كل طبق أو منتج بشكل دقيق، مع تحليل مفصل لهوامش الربح. من خلال هذه الخدمة، نوفر لك رؤى عملية لتحديد أسعار ذكية تحافظ على التوازن بين جاذبية الأسعار للزبون وربحية مطعمك.",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "توثيق الوصفات",
    tags: ["دقة المكونات", "إجراءات واضحة", "تعليمات مفصلة"],
    description:
      "نوثّق وصفاتك بدقة واحترافية عالية، بدءًا من تحديد المكونات الأساسية مرورًا بخطوات التحضير وحتى طرق التقديم. هذه الخدمة تضمن لك جودة ثابتة عبر جميع الفروع والموظفين، وتُسهّل عملية التدريب المستقبلي.",
    image:
      "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "تدريب الكادر",
    tags: ["مهارات خدمة", "احتراف الموظفين", "رفع الأداء"],
    description:
      "نقدّم برامج تدريبية شاملة للكادر البشري في مطعمك، تشمل مهارات التواصل مع الزبائن، فنون الخدمة، تقنيات التحضير، وأساليب العمل الجماعي. هدفنا رفع مستوى الاحترافية وتحويل موظفيك إلى قوة تدعم نجاح علامتك التجارية.",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&auto=format&fit=crop&q=80",
  },
];


export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const progressIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !sectionRef.current ||
        !cardsContainerRef.current ||
        !progressIndicatorRef.current
      )
        return;

      const section = sectionRef.current;
      const container = cardsContainerRef.current;
      const progressIndicator = progressIndicatorRef.current;
      const cards = Array.from(
        container.querySelectorAll<HTMLElement>(".service-card")
      );
      const dots = Array.from(
        progressIndicator.querySelectorAll<HTMLElement>("div")
      );

      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionHeight = sectionRect.height;
      const windowHeight = window.innerHeight;

      const scrollProgress = Math.max(
        0,
        Math.min(1, -sectionTop / (sectionHeight - windowHeight))
      );
      const totalCards = cards.length;
      const activeCardIndex = Math.min(
        totalCards - 1,
        Math.floor(scrollProgress * totalCards)
      );

      dots.forEach((dot, index) => {
        dot.style.transform =
          index === activeCardIndex ? "scale(1.2)" : "scale(1)";
      });

      cards.forEach((card, index) => {
        const baseZIndex = 100 + index * 10;

        if (index === activeCardIndex) {
          card.style.transform = "translateY(0px) scale(1)";
          card.style.zIndex = `${baseZIndex + 5}`;
          card.style.pointerEvents = "auto";
        } else if (index < activeCardIndex) {
          const yOffset = (activeCardIndex - index) * 25;
          const scale = Math.max(0.9, 1 - (activeCardIndex - index) * 0.05);
          card.style.transform = `translateY(-${yOffset}px) scale(${scale})`;
          card.style.zIndex = `${baseZIndex - 5}`;
          card.style.pointerEvents = "none";
        } else {
          const yOffset = (index - activeCardIndex) * 20;
          card.style.transform = `translateY(${yOffset}px) scale(0.98)`;
          card.style.zIndex = `${baseZIndex}`;
          card.style.pointerEvents = "none";
        }

        card.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
      });
    };

    let animationFrameId: number;
    const scrollHandler = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white px-8 py-24 min-h-[200vh]"
    >
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row md:gap-12">
        <div ref={cardsContainerRef} className="relative flex-1">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card bg-black md:border md:border-gray-800/30 rounded-2xl pt-9 md:p-8 mb-8 opacity-100"
              style={{
                minHeight: "400px",
                position: "sticky",
                top: "120px",
                zIndex: 100 + index * 10,
              }}
              initial={{ y: 40 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
              }}
            >
              <div className="flex bg-black flex-col md:flex-row items-start justify-between gap-8 h-full">
                <div className="w-full md:w-1/2">
                  <motion.div
                    className="relative group mb-6"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="w-full h-48 md:h-56 rounded-xl overflow-hidden bg-gray-900 shadow-2xl">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-xl blur-sm duration-700 -z-10"></div>
                  </motion.div>

                  <motion.p
                    className="text-gray-400 text-base leading-relaxed font-light"
                    initial={{}}
                    whileInView={{}}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {service.description}
                  </motion.p>
                </div>

                <div className="flex-1">
                  <div className="flex justify-end text-right gap-5 mb-6">
                    <h3 className="text-3xl md:text-4xl font-light tracking-wide">
                      {service.name}
                    </h3>
                    <div className="relative">
                      <div className="w-8 h-8 flex items-center justify-center bg-[#fda839] rounded-full text-white text-sm font-medium">
                        {service.id}
                      </div>
                      <div className="absolute inset-0 w-2.5 h-2.5 bg-[#fda839] rounded-full animate-ping"></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8 justify-end">
                    {service.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        className="px-4 py-2 text-xs font-medium bg-gray-900/50 text-gray-300 rounded-full border border-gray-800 backdrop-blur-sm"
                        initial={{ y: 10 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2 + tagIndex * 0.05,
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="flex mt-16 pt-8 sticky bottom-8 z-[999]"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="/contact"
              className="text-right flex gap-2 items-center w-fit font-medium text-[0.9rem] text-black bg-white px-6 py-3 rounded-full transition-all duration-500 hover:bg-gray-100 group hover:shadow-lg"
            >
              <div className="w-6 h-6 bg-[#fda839] text-white rounded-full flex items-center justify-center group-hover:-translate-x-2 duration-500">
                <ChevronLeft size={20} />
              </div>
              <span className="font-medium">اعرف المزيد</span>
            </a>
          </motion.div>
        </div>

        <div className="mb-20 md:sticky md:top-24 md:h-[400px]">
          <div>
            <h2 className="text-6xl md:text-7xl font-extralight tracking-tight">
              خدمات أوبيريست
            </h2>
          </div>
          <div className="flex justify-end">
            <p className="text-right mt-6 text-gray-400 max-w-md text-lg font-light">
              حلول تشغيلية متكاملة تُسهّل عمل المطاعم وتطوّر الأداء اليومي.
            </p>
          </div>

          <div
            ref={progressIndicatorRef}
            className="hidden md:flex gap-2 mt-12 justify-end"
          >
            {services.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: "#fda839",
                  opacity: index === 0 ? 1 : 0.3,
                  transform: index === 0 ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
