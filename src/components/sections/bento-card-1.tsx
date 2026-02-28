"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, AtSign, ArrowUp, Sparkles, Star, Zap, CircleDot, ChevronDown } from "lucide-react";

const models = [
  { name: "GPT-5.3 Codex", icon: Sparkles, color: "#a8b4b6" },
  { name: "Gemini 3.1 Pro", icon: Star, color: "#a89de0" },
  { name: "Claude Opus 4.6", icon: Zap, color: "#e8a87c" },
  { name: "Grok 4.20", icon: CircleDot, color: "#8cb4c9" },
];

export function BentoCard1() {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    let openTimer: ReturnType<typeof setTimeout>;
    let closeTimer: ReturnType<typeof setTimeout>;

    const cycle = (delay: number) => {
      openTimer = setTimeout(() => {
        setShowDropdown(true);
        closeTimer = setTimeout(() => {
          setShowDropdown(false);
          cycle(2000);
        }, 3000);
      }, delay);
    };

    cycle(1500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  return (
    <div className="relative flex h-[557px] flex-col justify-end overflow-hidden rounded border border-border-card p-6">
      {/* Base: exact linear gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #131212 43.76%, #698186 100%)",
        }}
      />
      {/* Grain overlay — SVG noise on top of gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      {/* Light ray image */}
      <Image
        src="/bento/Light Ray.png"
        alt=""
        fill
        className="pointer-events-none object-cover object-center"
        sizes="696px"
        quality={75}
      />

      {/* Chat input bar — centered, matching Figma bottom-[245px] */}
      <div className="absolute bottom-[245px] left-1/2 z-10 flex w-[624px] -translate-x-1/2 flex-col gap-4 overflow-visible rounded-lg border border-white/[0.08] bg-[rgba(138,138,138,0.15)] p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.15)] backdrop-blur-[16px] backdrop-saturate-[180%]">
        <p className="text-[14px] font-normal leading-[1.8] tracking-[-0.14px] text-[#f6f5f5]">
          Ask anything
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus size={18} className="text-[#f6f5f5]" strokeWidth={1.5} />
            <AtSign size={18} className="text-[#f6f5f5]" strokeWidth={1.5} />
          </div>
          <div className="flex items-center gap-4">
            {/* Model chip + dropdown (anchored together) */}
            <div className="relative">
              <div className="flex items-center gap-1 [&_*]:outline-none [&_*]:ring-0">
                <Sparkles size={18} className="text-[#a8b4b6]" strokeWidth={1.5} />
                <span
                  className={`inline-block transition-transform duration-200 ease-in-out ${showDropdown ? "rotate-180" : ""}`}
                >
                  <ChevronDown size={12} className="text-[#a8b4b6]" strokeWidth={2} />
                </span>
              </div>
              {/* Model selector dropdown — directly below chip, right-aligned so it doesn't get cut off */}
              <div className="absolute right-0 top-full z-20 mt-2">
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0.6, y: -8 }}
                      animate={{ opacity: 1, scaleY: 1, y: 0 }}
                      exit={{ opacity: 0, scaleY: 0.6, y: -8 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      style={{ transformOrigin: "top" }}
                      className="flex w-[165px] flex-col gap-[2px] overflow-hidden rounded-xl border border-white/[0.1] bg-[rgba(80,80,80,0.6)] p-1 shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.12),inset_0_-0.5px_1px_rgba(0,0,0,0.15),0_8px_20px_rgba(0,0,0,0.2)] backdrop-blur-[24px] backdrop-saturate-[150%]"
                    >
                      {models.map((model, i) => {
                        const Icon = model.icon;
                        const isSelected = i === 0;
                        return (
                          <motion.div
                            key={model.name}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 + i * 0.06, duration: 0.25 }}
                            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-1 py-1 ${
                              isSelected
                                ? "border-[0.5px] border-[#636a6b] bg-[rgba(24,24,24,0.1)]"
                                : ""
                            }`}
                          >
                            <Icon
                              size={18}
                              className={isSelected ? "text-[#f6f5f5]" : "text-[#ccc6c6]"}
                              strokeWidth={1.5}
                            />
                            <span
                              className={`min-w-0 truncate text-[14px] font-normal leading-none tracking-[-0.14px] ${
                                isSelected ? "text-[#f6f5f5]" : "text-[#ccc6c6]"
                              }`}
                            >
                              {model.name}
                            </span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            {/* Send button */}
            <div className="flex size-[21px] items-center justify-center rounded-full bg-[#f6f5f5]">
              <ArrowUp size={14} className="text-[#131212]" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div className="relative z-10 flex flex-col gap-4">
        <h3 className="text-[27.34px] font-medium leading-[1.3] tracking-[-0.82px] text-[#f6f5f5]">
          Cut research time
        </h3>
        <p className="max-w-[592px] text-[14px] font-normal leading-[1.8] tracking-[-0.14px] text-[#f6f5f5]">
          Extract any dates across all events and documents from public
          companies in seconds.
        </p>
      </div>
    </div>
  );
}
