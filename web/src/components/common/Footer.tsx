import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-300"
      dir="rtl"
    >
      {/* Top Support Section */}
      <div className="border-b border-gray-800/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold text-white mb-2">
              دعم العملاء 24/7
            </h3>
            <p className="text-gray-400">جاهزون لمساعدتك في أي وقت</p>
          </div>

          <div className="flex gap-8">
            <div className="flex items-center gap-3">
              <div className="border border-[#fda839] text-[#fda839] p-3 rounded-xl">
                <Phone />
              </div>
              <span className="font-medium text-white">570451606</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="border border-[#fda839] text-[#fda839] p-3 rounded-xl">
                <Mail />
              </div>
              <span className="font-medium text-white">info@operest.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#fda839] p-3 rounded-2xl">
              <img
                src="/images/logo/white.png"
                alt="Operest"
                className="w-[7rem] h-[5rem]"
              />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-[#fda839]">
                اوبيريست
              </h3>
              <p className="text-gray-400 mt-1">حلول المطاعم والمقاهي الذكية</p>
            </div>
          </div>
          <p className="text-gray-400 leading-relaxed mb-6">
            نحن شركة متخصصة في تشغيل وتطوير المطاعم والمقاهي، نوفر حلول مبتكرة
            قائمة على البيانات والتقنية.
          </p>

          {/* Social Media */}
          <div className="flex gap-4">
            {[<Twitter />, <Instagram />, <Facebook />, <Youtube />].map(
              (platform, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-gray-800/50 p-3 rounded-xl hover:bg-[#fda839] transition-all duration-300 hover:scale-110"
                >
                  {platform}
                </a>
              )
            )}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-semibold mb-6 text-white">خدماتنا</h4>
          <ul className="space-y-4">
            {[
              "إدارة وتشغيل المطاعم",
              "الاستشارات التشغيلية",
              "تحليل البيانات",
              "التدريب والتطوير",
              "الحلول التقنية",
            ].map((service, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-[#fda839] rounded-full"></span>
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-6 text-white">تواصل معنا</h4>
          <div className="space-y-4 text-gray-400">
            <div className="flex items-center gap-3">
              <div className="border border-[#fda839] text-[#fda839] p-3 rounded-xl">
                <MapPin size={16} />
              </div>
              <span>الرياض، طريق الملك عبد العزيز</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="border border-[#fda839] text-[#fda839] p-3 rounded-xl">
                <Phone size={16} />
              </div>
              <span>570451606</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="border border-[#fda839] text-[#fda839] p-3 rounded-xl">
                <Mail size={16} />
              </div>
              <span>info@operest.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/70 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-gray-500">© 2025 اوبيريست. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              الشروط والأحكام
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              سياسة الخصوصية
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              اتصل بنا
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
