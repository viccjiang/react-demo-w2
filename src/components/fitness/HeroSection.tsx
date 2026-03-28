import { Flame, ChevronRight, Zap, Target, TrendingUp } from "lucide-react";

const stats = [
  { icon: Zap, value: "500+", label: "訓練課程", color: "text-neon-blue" },
  { icon: Target, value: "50K+", label: "活躍會員", color: "text-neon-orange" },
  { icon: TrendingUp, value: "98%", label: "達成率", color: "text-neon-green" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-dark-950 pt-20">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-neon-blue/10 blur-[120px]" />
        <div className="absolute -right-20 top-1/3 h-[400px] w-[400px] rounded-full bg-neon-purple/10 blur-[100px]" />
        <div className="absolute -left-20 bottom-1/4 h-[300px] w-[300px] rounded-full bg-neon-orange/8 blur-[80px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="animate-pulse-glow absolute left-[10%] top-[20%] h-px w-40 rotate-[30deg] bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent" />
        <div className="animate-pulse-glow absolute right-[15%] top-[40%] h-px w-32 -rotate-[20deg] bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent" style={{ animationDelay: "1s" }} />
        <div className="animate-pulse-glow absolute bottom-[30%] left-[20%] h-px w-48 rotate-[15deg] bg-gradient-to-r from-transparent via-neon-orange/30 to-transparent" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-24 text-center lg:pt-32">
        {/* Badge */}
        <div className="animate-slide-up mb-8 inline-flex items-center gap-2 rounded-full border border-neon-blue/20 bg-neon-blue/5 px-4 py-2 backdrop-blur-sm">
          <Flame className="h-4 w-4 text-neon-orange" />
          <span className="font-body text-sm font-medium text-neon-blue">
            鍛鍊體魄，淬煉心志
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="animate-slide-up font-heading text-5xl leading-[1.1] font-bold tracking-tight text-white sm:text-6xl lg:text-8xl" style={{ animationDelay: "0.1s" }}>
          點燃你的
          <br />
          <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-orange bg-clip-text text-transparent">
            無限潛能
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-slide-up mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-slate-400 sm:text-xl" style={{ animationDelay: "0.2s" }}>
          AI 智能訓練、即時進度追蹤、頂尖教練指導 —
          一站式平台，帶你突破自我極限。
        </p>

        {/* CTA Buttons */}
        <div className="animate-slide-up mt-10 flex flex-col items-center gap-4 sm:flex-row" style={{ animationDelay: "0.3s" }}>
          <button
            type="button"
            className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-4 font-body text-base font-bold text-white shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,212,255,0.5)] hover:scale-[1.02]"
          >
            立即開始訓練
            <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-body text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10"
          >
            觀看介紹
          </button>
        </div>

        {/* Stats Row */}
        <div className="animate-slide-up mt-20 grid w-full max-w-lg grid-cols-3 gap-8" style={{ animationDelay: "0.4s" }}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className={`mx-auto mb-2 h-5 w-5 ${stat.color}`} />
              <p className="font-heading text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="font-body text-xs text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="animate-float mt-16">
          <div className="mx-auto h-14 w-8 rounded-full border-2 border-white/20 p-1">
            <div className="mx-auto h-3 w-1.5 rounded-full bg-neon-blue animate-pulse-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}
