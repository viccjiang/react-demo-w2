import { useSelector } from "react-redux";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeMessage } from "../slice/messageSlice";
import type { RootState } from "../store/store";

export default function MessageToast() {
  const messages = useSelector((state: RootState) => state.message);
  const dispatch = useDispatch();

  if (messages.length === 0) return null;

  return (
    <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex w-80 items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm animate-[slide-up_0.3s_ease-out] ${
            message.type === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 shadow-emerald-500/10"
              : "border-red-500/20 bg-red-500/10 shadow-red-500/10"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          )}
          <div className="min-w-0 flex-1">
            <p
              className={`text-sm font-semibold ${
                message.type === "success"
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {message.title}
            </p>
            <p className="mt-0.5 text-sm text-slate-300">{message.text}</p>
          </div>
          <button
            type="button"
            onClick={() => dispatch(removeMessage(message.id))}
            className="shrink-0 text-slate-500 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
