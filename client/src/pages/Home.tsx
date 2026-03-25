/*
 * Home Page
 * Design: Contemporary Taiwanese Academic
 * Sections: Hero, Stats, About, Courses Preview, Admissions CTA, Announcements, Culture
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Users, Award, Globe, ChevronRight, Calendar, Bell, Star } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/hero-bg-h47HEc8aDFJGFWBNA8kUhG.webp";
const CHINESE_LEARNING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/chinese-learning-A2hShc2MTUsfoHTPb3LvLB.webp";
const CALLIGRAPHY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/calligraphy-art-ABQ5LVyYzkqfDhBUUPcKdY.webp";
const TAIWAN_CULTURE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/taiwan-culture-6UpJbyFSahi5K6Bqpt5hGr.webp";
const CAMPUS_LIFE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663395072106/gFiXLmJAPZ8PqC6x79Srmf/hdut_campus_students_44f7085e.webp";

const stats = [
  { number: "500+", label: "在籍學生", sublabel: "來自20+國家" },
  { number: "15+", label: "專業師資", sublabel: "碩博士學歷" },
  { number: "6", label: "課程等級", sublabel: "A1 至 C2" },
  { number: "54", label: "年辦學歷史", sublabel: "1971年創校" },
];

const courses = [
  {
    level: "初級",
    code: "A1–A2",
    title: "基礎華語課程",
    desc: "從零開始學習中文，掌握基本日常會話、拼音系統與基礎漢字書寫。",
    color: "#4CAF82",
    icon: "🌱",
  },
  {
    level: "中級",
    code: "B1–B2",
    title: "進階華語課程",
    desc: "深化語言能力，學習複雜句型、閱讀理解與書面表達，為職場或學術做準備。",
    color: "#1B4F72",
    icon: "📚",
  },
  {
    level: "高級",
    code: "C1–C2",
    title: "精通華語課程",
    desc: "達到母語接近水平，精通正式書面語、文學閱讀與學術寫作。",
    color: "#E8734A",
    icon: "🎓",
  },
  {
    level: "特色",
    code: "文化",
    title: "文化體驗課程",
    desc: "結合語言學習與台灣文化體驗，包含書法、茶道、傳統節慶等文化活動。",
    color: "#9B59B6",
    icon: "🎋",
  },
];

const announcements = [
  {
    id: 1,
    type: "招生",
    date: "2025-03-01",
    title: "114學年度第二學期華語文課程招生公告",
    excerpt: "本中心開放114學年度第二學期（2025年3月至6月）課程報名，歡迎外籍學生踴躍申請。",
  },
  {
    id: 2,
    type: "活動",
    date: "2025-02-20",
    title: "2025年台灣文化體驗活動報名開始",
    excerpt: "春節文化體驗活動，包含包粽子、書法體驗、夜市導覽等精彩活動，名額有限。",
  },
  {
    id: 3,
    type: "公告",
    date: "2025-02-10",
    title: "TOCFL華語文能力測驗報名資訊",
    excerpt: "本中心提供TOCFL備考課程及代辦報名服務，有意參加測驗的學生請盡早與本中心聯繫。",
  },
  {
    id: 4,
    type: "學術",
    date: "2025-01-28",
    title: "新南向國家獎學金申請說明會",
    excerpt: "針對越南、印尼、馬來西亞、泰國等新南向國家學生提供專屬獎學金，歡迎符合資格者申請。",
  },
];

const typeColors: Record<string, string> = {
  招生: "bg-[#E8734A]/15 text-[#E8734A]",
  活動: "bg-[#4CAF82]/15 text-[#4CAF82]",
  公告: "bg-[#1B4F72]/15 text-[#1B4F72]",
  學術: "bg-[#9B59B6]/15 text-[#9B59B6]",
};

function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHeroLoaded(true);
    img.src = HERO_BG;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${heroLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B4F72]/90 via-[#1B4F72]/70 to-[#1B4F72]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B4F72]/60 via-transparent to-transparent" />

        {/* Decorative element */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden xl:block">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1B4F72]/30" />
        </div>

        <div className="container relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
              <Star size={14} className="text-[#E8C84A]" />
              <span className="text-white text-sm font-medium" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                教育部認可 · 境外招生資格
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="text-white font-black leading-tight mb-4 animate-fade-in-up animation-delay-100"
              style={{
                fontFamily: "'Noto Serif TC', serif",
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              探索中文之美
              <br />
              <span className="text-[#E8C84A]">從台灣出發</span>
            </h1>

            <p
              className="text-white/85 text-lg leading-relaxed mb-8 max-w-xl animate-fade-in-up animation-delay-200"
              style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
            >
              宏國德霖科技大學華語中心，提供專業華語文教學課程，歡迎來自世界各地的學生在台灣學習中文、體驗文化。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-300">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 bg-[#E8734A] text-white px-8 py-3.5 rounded font-semibold text-sm hover:bg-[#d4623a] transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                立即報名
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/40 text-white px-8 py-3.5 rounded font-semibold text-sm hover:bg-white/25 transition-all"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                課程介紹
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-12 bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#153d5a] py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/15">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} className="text-center px-6">
                <div
                  className="text-3xl font-black text-[#E8C84A] mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {stat.number}
                </div>
                <div className="text-white font-semibold text-sm" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                  {stat.label}
                </div>
                <div className="text-white/50 text-xs mt-0.5" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                  {stat.sublabel}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <AnimatedSection className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={CHINESE_LEARNING}
                  alt="華語文教學課堂"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4F72]/30 to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-5 max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={18} className="text-[#E8734A]" />
                  <span className="font-bold text-sm text-[#1B4F72]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                    教育部認可
                  </span>
                </div>
                <p className="text-xs text-gray-500" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                  具備境外招生資格，學習成果受國際認可
                </p>
              </div>
              {/* Calligraphy accent */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-xl overflow-hidden shadow-lg border-2 border-white">
                <img src={CALLIGRAPHY} alt="書法" className="w-full h-full object-cover" />
              </div>
            </AnimatedSection>

            {/* Content */}
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 text-[#E8734A] text-sm font-semibold mb-3 tracking-wider uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                <div className="w-8 h-px bg-[#E8734A]" />
                About Us
              </div>
              <h2
                className="text-[#1B4F72] font-bold mb-5 leading-tight"
                style={{ fontFamily: "'Noto Serif TC', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
              >
                關於宏國德霖
                <br />
                <span className="text-[#E8734A]">華語中心</span>
              </h2>
              <div className="section-divider mb-6" />
              <p className="text-gray-600 leading-relaxed mb-5" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                宏國德霖科技大學華語中心隸屬於國際事務處，成立宗旨在於因應國際文化交流需求，推廣華語文教育，提供來自世界各地的學生優質的中文學習環境。
              </p>
              <p className="text-gray-600 leading-relaxed mb-8" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                中心擁有具備碩博士學歷的專業師資團隊，提供從初級到高級的完整課程體系，並結合台灣在地文化體驗，讓學生在學習語言的同時，深入了解中華文化的豐富內涵。
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: BookOpen, label: "完整課程體系", desc: "A1至C2六個等級" },
                  { icon: Users, label: "專業師資團隊", desc: "碩博士學歷師資" },
                  { icon: Globe, label: "國際化環境", desc: "20+國家學生" },
                  { icon: Award, label: "官方認可資格", desc: "教育部境外招生" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
                    <div className="w-8 h-8 bg-[#1B4F72]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon size={16} className="text-[#1B4F72]" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-[#1B4F72]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                        {item.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#1B4F72] font-semibold text-sm hover:text-[#E8734A] transition-colors group"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                了解更多
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#E8734A] text-sm font-semibold mb-3 tracking-wider uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              <div className="w-8 h-px bg-[#E8734A]" />
              Our Courses
              <div className="w-8 h-px bg-[#E8734A]" />
            </div>
            <h2
              className="text-[#1B4F72] font-bold mb-4"
              style={{ fontFamily: "'Noto Serif TC', serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
            >
              多元課程體系
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
              從初學者到高級程度，提供完整的華語文學習路徑，滿足不同學習需求
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <AnimatedSection key={i} className={`animation-delay-${(i + 1) * 100}`}>
                <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full flex flex-col">
                  <div className="h-2" style={{ backgroundColor: course.color }} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-3xl mb-3">{course.icon}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: course.color, fontFamily: "'Noto Sans TC', sans-serif" }}
                      >
                        {course.level}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{course.code}</span>
                    </div>
                    <h3
                      className="font-bold text-[#1B4F72] mb-3 text-base"
                      style={{ fontFamily: "'Noto Serif TC', serif" }}
                    >
                      {course.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      {course.desc}
                    </p>
                    <Link
                      href="/courses"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold transition-colors group-hover:gap-2"
                      style={{ color: course.color, fontFamily: "'Noto Serif TC', serif" }}
                    >
                      了解詳情 <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 border-2 border-[#1B4F72] text-[#1B4F72] px-8 py-3 rounded font-semibold text-sm hover:bg-[#1B4F72] hover:text-white transition-all"
              style={{ fontFamily: "'Noto Serif TC', serif" }}
            >
              查看所有課程
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Announcements + Culture Side by Side */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Announcements - 2/3 width */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 text-[#E8734A] text-sm font-semibold mb-2 tracking-wider uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      <Bell size={14} />
                      Announcements
                    </div>
                    <h2
                      className="text-[#1B4F72] font-bold"
                      style={{ fontFamily: "'Noto Serif TC', serif", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)" }}
                    >
                      教學公告
                    </h2>
                  </div>
                  <Link
                    href="/announcements"
                    className="text-sm text-[#1B4F72] hover:text-[#E8734A] transition-colors font-medium flex items-center gap-1"
                    style={{ fontFamily: "'Noto Serif TC', serif" }}
                  >
                    全部公告 <ChevronRight size={14} />
                  </Link>
                </div>

                <div className="space-y-4">
                  {announcements.map((item, i) => (
                    <div
                      key={item.id}
                      className={`bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-[#1B4F72]/20 cursor-pointer animation-delay-${i * 100}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-[#1B4F72]/8 rounded-lg flex flex-col items-center justify-center">
                          <Calendar size={14} className="text-[#1B4F72] mb-0.5" />
                          <span className="text-[9px] text-[#1B4F72]/70 font-mono">
                            {item.date.slice(5).replace("-", "/")}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`announcement-badge ${typeColors[item.type]}`}>
                              {item.type}
                            </span>
                            <span className="text-xs text-gray-400" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                              {item.date}
                            </span>
                          </div>
                          <h4
                            className="font-semibold text-[#1B4F72] text-sm mb-1 line-clamp-1"
                            style={{ fontFamily: "'Noto Serif TC', serif" }}
                          >
                            {item.title}
                          </h4>
                          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                            {item.excerpt}
                          </p>
                        </div>
                        <ChevronRight size={16} className="text-gray-300 flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Culture Card - 1/3 width */}
            <div className="lg:col-span-1">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 text-[#E8734A] text-sm font-semibold mb-2 tracking-wider uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  <Globe size={14} />
                  Culture
                </div>
                <h2
                  className="text-[#1B4F72] font-bold mb-6"
                  style={{ fontFamily: "'Noto Serif TC', serif", fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)" }}
                >
                  文化體驗
                </h2>

                <div className="relative rounded-xl overflow-hidden shadow-lg mb-5">
                  <img
                    src={TAIWAN_CULTURE}
                    alt="台灣文化體驗"
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B4F72]/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                      深入體驗台灣文化
                    </p>
                    <p className="text-white/75 text-xs mt-1" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                      語言學習 × 文化探索
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { emoji: "🖌️", title: "書法體驗", desc: "學習傳統毛筆書法" },
                    { emoji: "🍵", title: "茶道文化", desc: "品味台灣茶文化" },
                    { emoji: "🥟", title: "料理體驗", desc: "學做台灣傳統料理" },
                    { emoji: "🏮", title: "節慶活動", desc: "參與傳統節日慶典" },
                  ].map((act, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                      <span className="text-xl">{act.emoji}</span>
                      <div>
                        <div className="font-semibold text-xs text-[#1B4F72]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                          {act.title}
                        </div>
                        <div className="text-xs text-gray-500" style={{ fontFamily: "'Noto Sans TC', sans-serif" }}>
                          {act.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${CAMPUS_LIFE})` }}
        />
        <div className="absolute inset-0 bg-[#1B4F72]/85" />

        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2
              className="text-white font-bold mb-4"
              style={{ fontFamily: "'Noto Serif TC', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              開始您的華語文學習之旅
            </h2>
            <p
              className="text-white/75 text-lg mb-10 max-w-xl mx-auto"
              style={{ fontFamily: "'Noto Sans TC', sans-serif" }}
            >
              加入宏國德霖科技大學華語中心，與來自世界各地的同學一起學習中文、探索台灣文化
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 bg-[#E8734A] text-white px-10 py-4 rounded font-semibold hover:bg-[#d4623a] transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                立即申請入學
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/40 text-white px-10 py-4 rounded font-semibold hover:bg-white/25 transition-all"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                聯絡我們
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
