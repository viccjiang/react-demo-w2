import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import { Lock, Mail } from "lucide-react";
import type { LoginFormData } from "../../dto/auth";
import { login } from "../../services/auth";
import useMessage from "../../hooks/useMessage";
import usePageTitle from "../../hooks/usePageTitle";

function setAuthToken(token: string, expired: string) {
  document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
}

export default function Login() {
  usePageTitle("登入");
  const navigate = useNavigate();
  const { showError } = useMessage();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      const { token, expired } = response.data;
      setAuthToken(token, expired);

      navigate("/admin/products");
    } catch (error) {
      if (error instanceof Error) {
        showError(`登入失敗: ${(error as { response?: { data?: { message?: string } } }).response?.data?.message || "Unknown error"}`);
      } else {
        showError("登入失敗: Unknown error");
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark-950 px-4">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full bg-neon-blue/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[300px] w-[300px] rounded-full bg-neon-purple/8 blur-[100px]" />

      <div className="relative w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple shadow-[0_0_30px_rgba(0,212,255,0.3)]">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </Link>
          <h1 className="font-heading text-3xl font-bold text-white">
            歡迎回來
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            登入以管理您的後台系統
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/5 bg-dark-800 p-8">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label
                className="mb-2 block text-sm font-medium text-slate-300"
                htmlFor="username"
              >
                電子郵件
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="username"
                  type="email"
                  className={`w-full rounded-xl border bg-dark-950 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-colors ${
                    errors.username
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-white/10 focus:border-neon-blue/50"
                  }`}
                  placeholder="name@example.com"
                  autoFocus
                  {...register("username", {
                    required: "請輸入 Email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email 格式不正確",
                    },
                  })}
                />
              </div>
              {errors.username && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="mb-2 block text-sm font-medium text-slate-300"
                htmlFor="password"
              >
                密碼
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type="password"
                  className={`w-full rounded-xl border bg-dark-950 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-colors ${
                    errors.password
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-white/10 focus:border-neon-blue/50"
                  }`}
                  placeholder="請輸入密碼"
                  {...register("password", {
                    required: "請輸入密碼",
                    minLength: {
                      value: 6,
                      message: "密碼長度至少需 6 碼",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-neon-blue to-neon-purple py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] disabled:opacity-70"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Oval
                    height={18}
                    width={18}
                    color="#fff"
                    secondaryColor="#a855f7"
                    strokeWidth={4}
                    strokeWidthSecondary={4}
                  />
                  登入中...
                </>
              ) : (
                "登入"
              )}
            </button>
          </form>
        </div>

        {/* Back to home */}
        <p className="mt-6 text-center text-sm text-slate-500">
          <Link
            to="/"
            className="text-slate-400 transition-colors hover:text-neon-blue"
          >
            ← 返回首頁
          </Link>
        </p>
      </div>
    </div>
  );
}
