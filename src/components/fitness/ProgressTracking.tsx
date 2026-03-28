import { TrendingUp, Flame, Calendar, Trophy } from "lucide-react";

interface StatCard {
  icon: typeof TrendingUp;
  value: string;
  label: string;
  change: string;
  color: string;
  bgColor: string;
}

const statCards: StatCard[] = [
  {
    icon: Calendar,
    value: "24",
    label: "本月訓練次數",
    change: "較上月 +8 次",
    color: "text-neon-blue",
    bgColor: "bg-neon-blue/10",
  },
  {
    icon: Flame,
    value: "12,450",
    label: "累計消耗熱量",
    change: "較上月 +2,300 大卡",
    color: "text-neon-orange",
    bgColor: "bg-neon-orange/10",
  },
  {
    icon: TrendingUp,
    value: "85%",
    label: "體能指數",
    change: "提升 12%",
    color: "text-neon-green",
    bgColor: "bg-neon-green/10",
  },
  {
    icon: Trophy,
    value: "7",
    label: "已達成目標",
    change: "再 3 個解鎖菁英等級",
    color: "text-neon-purple",
    bgColor: "bg-neon-purple/10",
  },
];

const weeklyData = [
  { day: "一", value: 75, active: true },
  { day: "二", value: 90, active: true },
  { day: "三", value: 45, active: true },
  { day: "四", value: 100, active: true },
  { day: "五", value: 60, active: true },
  { day: "六", value: 85, active: true },
  { day: "日", value: 30, active: false },
];

function DonutChart({
  percentage,
  color,
  label,
  size = 120,
}: {
  percentage: number;
  color: string;
  label: string;
  size?: number;
}) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 100 100"
          className="-rotate-90"
          width={size}
          height={size}
          role="img"
          aria-label={`${label}: ${percentage}%`}
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-white/5"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-xl font-bold text-white">
            {percentage}%
          </span>
        </div>
      </div>
      <span className="mt-2 font-body text-xs text-slate-400">{label}</span>
    </div>
  );
}

export default function ProgressTracking() {
  return (
    <section id="progress" className="relative overflow-hidden bg-dark-900 py-24">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-neon-green/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="font-body text-sm font-semibold tracking-widest text-neon-green uppercase">
            個人儀表板
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold text-white lg:text-5xl">
            追蹤每一次{" "}
            <span className="bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
              突破
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-slate-400">
            即時數據分析驅動你的動力，每一下都在見證自己的進步。
          </p>
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/5 bg-dark-800 p-6 transition-all duration-200 hover:border-white/10"
            >
              <div className={`mb-4 inline-flex rounded-xl p-3 ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="font-heading text-3xl font-bold text-white">
                {stat.value}
              </p>
              <p className="mt-1 font-body text-sm text-slate-400">
                {stat.label}
              </p>
              <p className={`mt-2 font-body text-xs font-medium ${stat.color}`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-white/5 bg-dark-800 p-6 lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  每週訓練紀錄
                </h3>
                <p className="font-body text-sm text-slate-500">
                  本週訓練強度分佈
                </p>
              </div>
              <div className="rounded-lg bg-neon-blue/10 px-3 py-1.5">
                <span className="font-body text-xs font-semibold text-neon-blue">
                  本週
                </span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-3" style={{ height: 180 }}>
              {weeklyData.map((item, i) => (
                <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                  <span className="font-body text-xs font-medium text-slate-400">
                    {item.value}%
                  </span>
                  <div className="relative w-full overflow-hidden rounded-t-lg bg-white/5" style={{ height: 140 }}>
                    <div
                      className={`animate-bar-grow absolute bottom-0 w-full rounded-t-lg ${
                        item.active
                          ? "bg-gradient-to-t from-neon-blue to-neon-purple"
                          : "bg-white/10"
                      }`}
                      style={{
                        height: `${item.value}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  </div>
                  <span className="font-body text-xs text-slate-500">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-dark-800 p-6 lg:col-span-2">
            <h3 className="mb-2 font-heading text-lg font-bold text-white">
              目標達成率
            </h3>
            <p className="mb-8 font-body text-sm text-slate-500">
              本月各項里程碑完成度
            </p>
            <div className="grid grid-cols-2 gap-6">
              <DonutChart percentage={85} color="#00d4ff" label="有氧" />
              <DonutChart percentage={72} color="#ff6b35" label="肌力" />
              <DonutChart percentage={93} color="#39ff14" label="柔軟度" />
              <DonutChart percentage={68} color="#a855f7" label="耐力" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
