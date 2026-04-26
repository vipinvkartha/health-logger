"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), duration - 300);
    const closeTimer = setTimeout(onClose, duration);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100]">
      <div
        className={`${exiting ? "toast-exit" : isSuccess ? "toast-enter" : "toast-error-enter"}
          flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border
          ${isSuccess
            ? "bg-white border-sage/30"
            : "bg-white border-terracotta/30"
          }`}
      >
        {/* Icon */}
        {isSuccess ? (
          <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#7D8B6A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path className="toast-check" d="M4 9l3.5 3.5L14 6"/>
            </svg>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-terracotta/20 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#A86F3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5v4M9 12h.01"/>
            </svg>
          </div>
        )}

        {/* Message */}
        <div>
          <p className={`text-sm font-semibold ${isSuccess ? "text-sage-dark" : "text-terracotta-dark"}`}>
            {isSuccess ? "Saved!" : "Error"}
          </p>
          <p className="text-xs text-brown-muted">{message}</p>
        </div>

        {/* Close */}
        <button
          onClick={() => { setExiting(true); setTimeout(onClose, 300); }}
          className="ml-2 p-1 text-brown-muted/50 hover:text-brown-muted transition-colors cursor-pointer"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M2 2l8 8M10 2l-8 8"/>
          </svg>
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full toast-progress ${isSuccess ? "bg-sage/40" : "bg-terracotta/40"}`}
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
