import { Link } from "react-router";
import { Clock, Flame, Signal, ChevronRight } from "lucide-react";

interface WorkoutCard {
  title: string;
  category: string;
  duration: string;
  calories: string;
  difficulty: "入門" | "中階" | "進階" | "不限程度";
  image: string;
  accentColor: string;
  glowClass: string;
}

const workouts: WorkoutCard[] = [
  {
    title: "HIIT 燃脂風暴",
    category: "高強度間歇",
    duration: "30 分鐘",
    calories: "450 大卡",
    difficulty: "進階",
    image: "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&h=400&fit=crop",
    accentColor: "from-neon-orange to-red-500",
    glowClass: "box-glow-orange",
  },
  {
    title: "力量瑜伽流",
    category: "瑜伽伸展",
    duration: "45 分鐘",
    calories: "280 大卡",
    difficulty: "不限程度",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    accentColor: "from-neon-purple to-pink-500",
    glowClass: "box-glow-purple",
  },
  {
    title: "肌力養成計畫",
    category: "重量訓練",
    duration: "50 分鐘",
    calories: "520 大卡",
    difficulty: "中階",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
    accentColor: "from-neon-blue to-cyan-400",
    glowClass: "box-glow-blue",
  },
  {
    title: "核心粉碎者",
    category: "核心訓練",
    duration: "25 分鐘",
    calories: "320 大卡",
    difficulty: "入門",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    accentColor: "from-neon-green to-emerald-400",
    glowClass: "box-glow-green",
  },
];

const difficultyColor: Record<string, string> = {
  "入門": "text-neon-green",
  "中階": "text-neon-blue",
  "進階": "text-neon-orange",
  "不限程度": "text-neon-purple",
};

export default function WorkoutCards() {
  return (
    <section id="workouts" className="relative overflow-hidden bg-dark-950 py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-neon-purple/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="font-body text-sm font-semibold tracking-widest text-neon-blue uppercase">
            訓練課程
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold text-white lg:text-5xl">
            選擇你的{" "}
            <span className="bg-gradient-to-r from-neon-orange to-neon-pink bg-clip-text text-transparent">
              挑戰
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-slate-400">
            從爆發性 HIIT 到靜心瑜伽 — 找到最適合你目標的訓練，突破自我。
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workouts.map((workout) => (
            <div
              key={workout.title}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-dark-800 transition-all duration-300 hover:-translate-y-2 hover:border-white/10"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={workout.image}
                  alt={workout.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/40 to-transparent" />
                <div className="absolute right-3 top-3 rounded-lg bg-dark-900/80 px-3 py-1 backdrop-blur-sm">
                  <span className={`font-body text-xs font-semibold ${difficultyColor[workout.difficulty]}`}>
                    {workout.difficulty}
                  </span>
                </div>
                <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${workout.glowClass}`} />
              </div>

              <div className="p-5">
                <span className="font-body text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {workout.category}
                </span>
                <h3 className="mt-1 font-heading text-lg font-bold text-white">
                  {workout.title}
                </h3>

                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="font-body text-xs">{workout.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Flame className="h-3.5 w-3.5" />
                    <span className="font-body text-xs">{workout.calories}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Signal className="h-3.5 w-3.5" />
                    <span className="font-body text-xs">{workout.difficulty}</span>
                  </div>
                </div>

                <Link
                  to="/products"
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${workout.accentColor} py-3 font-body text-sm font-semibold text-white opacity-90 transition-all duration-200 hover:opacity-100 hover:shadow-lg`}
                >
                  開始訓練
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
