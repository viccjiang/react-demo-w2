import { Repeat2, Globe, MessageCircle, Camera, Play } from "lucide-react";

const footerLinks = {
  "產品": ["訓練課程", "訓練計畫", "營養指南", "進度追蹤"],
  "關於我們": ["品牌故事", "加入團隊", "部落格", "媒體資源"],
  "支援": ["幫助中心", "聯絡我們", "隱私權政策", "服務條款"],
};

const socialLinks = [
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: MessageCircle, label: "Twitter", href: "#" },
  { icon: Play, label: "YouTube", href: "#" },
  { icon: Globe, label: "官方網站", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple">
                <Repeat2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold text-white">
                Rep<span className="text-neon-blue">X</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-slate-500">
              鍛鍊體魄，淬煉心志。加入我們，透過 AI 智能健身解鎖你的無限潛能。
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-slate-400 transition-all duration-200 hover:border-neon-blue/30 hover:text-neon-blue"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading text-sm font-semibold text-white">
                {title}
              </h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-slate-500 transition-colors duration-200 hover:text-slate-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="font-body text-xs text-slate-600">
            &copy; {new Date().getFullYear()} RepX. 版權所有。
          </p>
          <p className="font-body text-xs text-slate-600">
            為全球健身愛好者傾心打造。
          </p>
        </div>
      </div>
    </footer>
  );
}
