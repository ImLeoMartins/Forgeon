import * as React from "react";

export type SpinningBorderButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
    variant?: "primary" | "default";
  };

export const SpinningBorderButton = React.forwardRef<
  HTMLButtonElement,
  SpinningBorderButtonProps
>(function SpinningBorderButton(
  { children = "Falar com a Forgeon", className, variant = "default", ...props },
  ref,
) {
  const isPrimary = variant === "primary";

  return (
    <button
      ref={ref}
      className={
        "group inline-flex overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(133,169,250,0.2)] rounded-full pt-[1px] pr-[1px] pb-[1px] pl-[1px] relative items-center justify-center cursor-pointer" +
        (className ? " " + className : "")
      }
      {...props}
    >
      {/* Spinning Border Beam (Visible on Hover) */}
      <span
        className="absolute inset-[-100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          animation: "spin 3s linear infinite",
          background: isPrimary
            ? "conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 75%, #85A9FA 100%)"
            : "conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 75%, #9070F7 100%)",
        }}
      />

      {/* Default Static Border */}
      <span
        className="absolute inset-0 rounded-full transition-opacity duration-300 group-hover:opacity-0"
        style={{ background: isPrimary ? "rgba(69,77,252,0.4)" : "rgba(108,111,130,0.3)" }}
      />

      {/* Glass Surface & Content */}
      <span
        className="flex items-center justify-center gap-2 uppercase transition-colors duration-300 group-hover:text-white text-xs font-semibold tracking-widest w-full h-full rounded-full pt-2.5 pr-6 pb-2.5 pl-6 relative"
        style={{
          background: isPrimary
            ? "linear-gradient(135deg, rgba(65,40,251,0.9), rgba(69,77,252,0.9))"
            : "rgba(16,17,24,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: isPrimary ? "#fff" : "#A3A6B5",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <span className="relative z-10">{children}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </span>
    </button>
  );
});

export default SpinningBorderButton;
