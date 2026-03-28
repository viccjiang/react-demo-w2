import { Check, Zap, Crown, Sparkles } from "lucide-react";

interface PricingPlan {
  name: string;
  icon: typeof Zap;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  accentColor: string;
  buttonGradient: string;
  badge?: string;
}

const plans: PricingPlan[] = [
  {
    name: "入門方案",
    icon: Zap,
    price: "$299",
    period: "/月",
    description: "適合剛開始健身旅程的你。",
    features: [
      "100+ 訓練課程",
      "基礎進度追蹤",
      "社群論壇參與",
      "每週訓練計畫",
      "行動裝置 APP",
    ],
    highlighted: false,
    accentColor: "text-neon-blue",
    buttonGradient: "from-neon-blue/20 to-neon-blue/5",
  },
  {
    name: "專業方案",
    icon: Crown,
    price: "$599",
    period: "/月",
    description: "進階功能解鎖你的完整潛力。",
    features: [
      "500+ 訓練課程",
      "進階數據儀表板",
      "1 對 1 教練諮詢",
      "客製化飲食計畫",
      "優先客服支援",
      "離線下載課程",
      "直播團體課程",
    ],
    highlighted: true,
    accentColor: "text-neon-orange",
    buttonGradient: "from-neon-orange to-neon-pink",
    badge: "最多人選擇",
  },
  {
    name: "菁英方案",
    icon: Sparkles,
    price: "$1,199",
    period: "/月",
    description: "為認真的運動員打造的終極方案。",
    features: [
      "包含專業方案所有功能",
      "私人教練課程",
      "AI 智能訓練計畫",
      "身體組成分析",
      "恢復 & 睡眠追蹤",
      "VIP 社群專屬通道",
      "年度健康評估",
    ],
    highlighted: false,
    accentColor: "text-neon-purple",
    buttonGradient: "from-neon-purple/20 to-neon-purple/5",
  },
];

export default function SubscriptionCTA() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-dark-900 py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-neon-orange/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="font-body text-sm font-semibold tracking-widest text-neon-orange uppercase">
            方案價格
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold text-white lg:text-5xl">
            投資{" "}
            <span className="bg-gradient-to-r from-neon-orange to-neon-pink bg-clip-text text-transparent">
              最好的自己
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-slate-400">
            7 天免費試用，無需信用卡，隨時取消。
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                plan.highlighted
                  ? "border-neon-orange/30 bg-gradient-to-b from-dark-700 to-dark-800 shadow-[0_0_40px_rgba(255,107,53,0.1)]"
                  : "border-white/5 bg-dark-800 hover:border-white/10"
              }`}
            >
              {plan.badge && (
                <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-neon-orange to-neon-pink px-3 py-1">
                  <span className="font-body text-xs font-bold text-white">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className={`mb-4 inline-flex rounded-xl p-3 ${plan.highlighted ? "bg-neon-orange/10" : "bg-white/5"}`}>
                  <plan.icon className={`h-6 w-6 ${plan.accentColor}`} />
                </div>
                <h3 className="font-heading text-xl font-bold text-white">
                  {plan.name}
                </h3>
                <p className="mt-1 font-body text-sm text-slate-400">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-heading text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="font-body text-base text-slate-500">
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.accentColor}`} />
                      <span className="font-body text-sm text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`mt-8 w-full rounded-xl py-4 font-body text-sm font-bold transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-neon-orange to-neon-pink text-white shadow-[0_0_20px_rgba(255,107,53,0.3)] hover:shadow-[0_0_30px_rgba(255,107,53,0.5)]"
                      : `border border-white/10 bg-gradient-to-r ${plan.buttonGradient} text-white hover:border-white/20`
                  }`}
                >
                  {plan.highlighted ? "免費試用 7 天" : "立即開始"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center font-body text-sm text-slate-500">
          全球超過 <span className="font-semibold text-white">50,000+</span>{" "}
          位運動員信賴使用，隨時可切換或取消方案。
        </p>
      </div>
    </section>
  );
}
