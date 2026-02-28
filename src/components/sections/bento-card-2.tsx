import { ChevronRight, Pointer } from "lucide-react";

const waveformSegments = [
  { w: 41, color: "#dadada" },
  { w: 2, color: "#131313" },
  { w: 82, color: "#dadada" },
  { w: 2, color: "#131313" },
  { w: 27, color: "#dadada" },
  { w: 27, color: "#828282" },
  { w: 2, color: "#ccc" },
  { w: 56, color: "#828282" },
  { w: 2, color: "#ccc" },
  { w: 18, color: "#828282" },
  { w: 68, color: "#4f4f4f" },
  { w: 2, color: "#858484" },
];

export function BentoCard2() {
  return (
    <div
      className="relative flex h-[557px] flex-col justify-end overflow-hidden rounded border border-border-card p-6"
      style={{
        backgroundImage:
          "linear-gradient(141.6deg, #201f1f 2.6%, #131212 57.5%)",
      }}
    >
      {/* Grid lines */}
      <svg className="pointer-events-none absolute inset-0 size-full" preserveAspectRatio="none">
        {[23, 183, 413].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1={0}
            x2={x}
            y2="100%"
            stroke="#2a2a2a"
            strokeWidth={0.5}
          />
        ))}
        {[150, 215, 240, 310].map((y) => (
          <line
            key={`h-${y}`}
            x1={0}
            y1={y}
            x2="100%"
            y2={y}
            stroke="#2a2a2a"
            strokeWidth={0.5}
          />
        ))}
      </svg>

      {/* Floating Q&A pill */}
      <div className="absolute bottom-[359px] left-[calc(50%+55px)] z-20 -translate-x-1/2">
        <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.08] bg-[rgba(138,138,138,0.2)] px-4 py-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_4px_12px_rgba(0,0,0,0.3)] backdrop-blur-[16px]">
          <span className="text-[14px] leading-none tracking-[-0.14px] text-[#a0a0a0]">
            14:12
          </span>
          <span className="size-1 rounded-full bg-[#a0a0a0]" />
          <span className="text-[14px] leading-none tracking-[-0.14px] text-[#f6f5f5]">
            Q&A: Supply & Demand
          </span>
        </div>
      </div>

      {/* Audio player bar */}
      <div className="absolute bottom-[248px] left-[calc(50%+92px)] z-10 flex h-[94px] w-[624px] -translate-x-1/2 flex-col justify-center gap-4 rounded-lg border border-white/[0.08] bg-[rgba(138,138,138,0.2)] p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_4px_12px_rgba(0,0,0,0.3)] backdrop-blur-[16px]">
        <div className="relative">
          <div className="flex h-[4px] items-center overflow-hidden rounded-[1px]">
            {waveformSegments.map((seg, i) => (
              <div
                key={i}
                className="h-full shrink-0"
                style={{ width: seg.w, background: seg.color }}
              />
            ))}
            <div className="h-full min-w-0 flex-1 bg-[#4f4f4f]" />
          </div>
          <div className="absolute left-[162px] top-1/2 size-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md" />
          <Pointer size={20} className="absolute left-[262px] top-[-2px] fill-white text-white drop-shadow-md" strokeWidth={1} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[14px] leading-none tracking-[-0.14px] text-[#a0a0a0]">
            7:24
          </span>
          <span className="size-1 rounded-full bg-[#a0a0a0]" />
          <span className="text-[14px] leading-none tracking-[-0.14px] text-[#f6f5f5]">
            Financial performance overview
          </span>
          <ChevronRight size={12} className="text-[#f6f5f5]" strokeWidth={2} />
        </div>
      </div>

      {/* Bottom text */}
      <div className="relative z-10 flex flex-col gap-4">
        <h3 className="text-[27.34px] font-medium leading-[1.3] tracking-[-0.82px] text-[#f6f5f5]">
          Be first
        </h3>
        <p className="text-[14px] font-normal leading-[1.8] tracking-[-0.14px] text-[#a0a0a0]">
          Global live coverage of earnings calls, CMDs, and conferences.
        </p>
      </div>
    </div>
  );
}
