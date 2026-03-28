import { Star, Camera } from "lucide-react";

interface Trainer {
  name: string;
  specialty: string;
  bio: string;
  image: string;
  rating: number;
  students: string;
  accentColor: string;
}

const trainers: Trainer[] = [
  {
    name: "Alex Chen",
    specialty: "HIIT & 功能性訓練",
    bio: "前國家級運動員，擁有超過 10 年教練經驗，專精爆發力與代謝體能訓練。",
    image: "https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?w=400&h=400&fit=crop&crop=face",
    rating: 4.9,
    students: "2,400+",
    accentColor: "from-neon-blue to-neon-purple",
  },
  {
    name: "Sarah Kim",
    specialty: "瑜伽 & 正念冥想",
    bio: "RYT-500 認證瑜伽教練，融合傳統練習與現代運動科學，打造身心合一的訓練體驗。",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face",
    rating: 5.0,
    students: "3,100+",
    accentColor: "from-neon-purple to-neon-pink",
  },
  {
    name: "Marcus Rivera",
    specialty: "肌力 & 力量舉",
    bio: "IPF 認證教練暨競技力量舉選手，透過週期化課表幫助學員打造實戰肌力。",
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?w=400&h=400&fit=crop&crop=face",
    rating: 4.8,
    students: "1,800+",
    accentColor: "from-neon-orange to-red-500",
  },
  {
    name: "Yuki Tanaka",
    specialty: "核心 & 活動度",
    bio: "物理治療師轉型健身教練，設計傷害預防課程，幫助運動員解鎖巔峰表現。",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop&crop=face",
    rating: 4.9,
    students: "1,500+",
    accentColor: "from-neon-green to-emerald-400",
  },
];

export default function TrainerProfiles() {
  return (
    <section id="trainers" className="relative overflow-hidden bg-dark-950 py-24">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-neon-orange/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="font-body text-sm font-semibold tracking-widest text-neon-purple uppercase">
            菁英教練團
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold text-white lg:text-5xl">
            與最強教練{" "}
            <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              一起練
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-slate-400">
            世界級教練全心投入你的蛻變，每一次訓練都是邁向最強自我的一步。
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trainers.map((trainer) => (
            <div
              key={trainer.name}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-dark-800 transition-all duration-300 hover:-translate-y-2 hover:border-white/10"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />
                <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-dark-900/80 p-2 backdrop-blur-sm">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-heading text-lg font-bold text-white">
                  {trainer.name}
                </h3>
                <p className={`mt-0.5 bg-gradient-to-r ${trainer.accentColor} bg-clip-text font-body text-sm font-semibold text-transparent`}>
                  {trainer.specialty}
                </p>
                <p className="mt-3 line-clamp-2 font-body text-sm leading-relaxed text-slate-400">
                  {trainer.bio}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-body text-sm font-semibold text-white">
                      {trainer.rating}
                    </span>
                  </div>
                  <span className="font-body text-xs text-slate-500">
                    {trainer.students} 位學員
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
