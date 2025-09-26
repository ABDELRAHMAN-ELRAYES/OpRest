import React, { useState } from "react";
import {
  BookOpen,
  UtensilsCrossed,
  Store,
  ArrowRight,
  Link as LinkIcon,
  Megaphone,
  ChevronLeft,
} from "lucide-react";

interface TabItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  mainTitle: string;
  mainDescription: string;
  mainImage: string;
  sideImage: string;
  articleUrl: string;
}

const ArticlesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const tabs: TabItem[] = [
    {
      id: 1,
      title: "أنواع المطاعم",
      description: "تعرف على الفروق بين أنواع المطاعم المختلفة",
      icon: <BookOpen className="w-6 h-6" />,
      mainTitle: "تعرف على أنواع المطاعم المختلفة وأثرها على تجربة الطعام",
      mainDescription:
        "في هذا المقال نُقدم لك استكشافًا لأهم أنواع المطاعم وكيف تؤثر على الذوق، التجربة والهوية التي تقدمها لمستخدميك.",
      mainImage:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
      sideImage:
        "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=400",
      articleUrl:
        "https://al-menu.com/blog/%D8%AA%D8%B9%D8%B1%D9%81-%D8%B9%D9%84%D9%89-%D8%A3%D9%86%D9%88%D8%A7%D8%B9-%D8%A7%D9%84%D9%85%D8%B7%D8%A7%D8%B9%D9%85",
    },
    {
      id: 2,
      title: "قائمة الطعام",
      description: "كيف تُصمم قائمة طعام جذابة وفعالة",
      icon: <UtensilsCrossed className="w-6 h-6" />,
      mainTitle: "تصميم قوائم الطعام كوسيلة تسويق قوية",
      mainDescription:
        "القائمة ليست مجرد ورقة، بل وسيلة للتسويق. في هذا المقال نشرح كيف يمكن أن تؤثر القائمة على قرارات العملاء وتجربتهم.",
      mainImage:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
      sideImage:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400",
      articleUrl:
        "https://al-menu.com/blog/%D9%82%D8%A7%D8%A6%D9%85%D8%A9-%D8%A7%D9%84%D8%B7%D8%B9%D8%A7%D9%85",
    },
    {
      id: 3,
      title: "إدارة المطاعم",
      description: "أفضل استراتيجيات الإدارة الناجحة",
      icon: <Store className="w-6 h-6" />,
      mainTitle: "إدارة المطاعم باحترافية لتحقيق النجاح",
      mainDescription:
        "تعتمد نجاحات المطاعم بشكل كبير على الإدارة الذكية. المقال يوضح أهم التحديات وكيفية التغلب عليها بخطوات عملية.",
      mainImage:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800",
      sideImage:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      articleUrl:
        "https://al-menu.com/blog/%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D8%B7%D8%A7%D8%B9%D9%85",
    },
    {
      id: 4,
      title: "التسويق للمطاعم",
      description: "طرق مبتكرة لجذب المزيد من العملاء",
      icon: <Megaphone className="w-6 h-6" />,
      mainTitle: "التسويق الفعّال للمطاعم في العصر الرقمي",
      mainDescription:
        "يُعد التسويق عنصرًا أساسيًا في نجاح أي مطعم. في هذا المقال نناقش أهم استراتيجيات التسويق الحديثة التي تساعدك في الوصول لعملائك بشكل أفضل.",
      mainImage:
        "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800",
      sideImage:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      articleUrl:
        "https://al-menu.com/blog/%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D9%84%D9%84%D9%85%D8%B7%D8%A7%D8%B9%D9%85",
    },
  ];
  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <div className="px-6 py-20">
      <div className="max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="bg-black rounded-2xl p-8 shadow-lg">
              <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-[#fda839] rounded-xl flex items-center justify-center text-white text-xl">
                  {activeTabData.icon}
                </div>
                <h2 className="text-3xl font-bold text-white">
                  {activeTabData.mainTitle}
                </h2>
              </div>

              <p className="text-[#d1d5dc] text-lg leading-relaxed mb-8">
                {activeTabData.mainDescription}
              </p>
              <a href={activeTabData.articleUrl} className="flex justify-end">
                <button className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full group  transition-colors">
                  <div className="w-6 h-6 bg-[#fda839] text-white rounded-full flex items-center justify-center group-hover:-translate-x-2 duration-500">
                    <LinkIcon size={16} />
                  </div>
                  <span className="font-medium"> اقرأ المقال</span>
                </button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 h-72">
              <div className="col-span-2 relative group overflow-hidden rounded-2xl shadow-lg min-h-[25rem]">
                <img
                  src={activeTabData.mainImage}
                  alt="Main Travel"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="relative group overflow-hidden rounded-2xl shadow-lg max-h-[12rem]">
                <img
                  src={activeTabData.sideImage}
                  alt="Side Travel"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Tabs */}
          <div>
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                مقالات المطاعم
              </h2>
              <p className="text-gray-600 text-lg">
                اكتشف أحدث المقالات لمساعدتك على تطوير مطعمك
              </p>
            </div>

            <div className="p-6 space-y-3">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-black text-white shadow-lg"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <div className="flex items-start p-6">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mr-5 text-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-[#fda839] text-white"
                          : "bg-white text-[#fda839] shadow-sm"
                      }`}
                    >
                      {tab.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold text-lg mb-2 ${
                          activeTab === tab.id ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {tab.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          activeTab === tab.id
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        {tab.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <a
                href="https://al-menu.com/blog"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-end"
              >
                <button className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full group hover:bg-gray-800 transition-colors">
                  <div className="w-6 h-6 bg-white text-black rounded-full flex items-center justify-center group-hover:-translate-x-2 duration-500">
                    <ChevronLeft size={20} />
                  </div>
                  <span className="font-medium"> عرض جميع المقالات</span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesSection;
