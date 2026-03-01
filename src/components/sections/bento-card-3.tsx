import { ChevronRight } from "lucide-react";

export function BentoCard3() {
  return (
    <div
      className="relative flex h-[557px] flex-col justify-end overflow-hidden rounded border border-border-card p-6"
      style={{
        backgroundImage:
          "linear-gradient(141.6deg, #131212 43.8%, #201f1f 98.7%)",
      }}
    >
      {/* Grid lines */}
      <svg
        className="pointer-events-none absolute inset-0 size-full"
        preserveAspectRatio="none"
      >
        {[48, 190, 393, 441].map((x) => (
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
        {[200, 425].map((y) => (
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

      {/* Background faded paragraph text — visible at bottom, fading upward */}
      <p
        className="absolute left-[calc(50%-181px)] top-[calc(50%-132px)] w-[359px] text-[17.5px] font-semibold leading-[1.6] tracking-[-0.175px]"
        style={{
          background:
            "linear-gradient(to top, #f6f5f5 5%, #131212 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Every payment decision matters—from choosing the right payment rail to
        catching fraud before it happens. Flux automates the complexity so your
        team can focus on strategy.
      </p>

      {/* Text cursor with "1" badge */}
      <div className="absolute left-[128px] top-[266px]">
        <div className="flex size-[14px] items-center justify-center rounded-[1px] bg-white">
          <span className="text-[11px] font-semibold leading-[1.9] tracking-[-0.11px] text-[#131212]">
            1
          </span>
        </div>
        <img
          src="/bento/Pointer.svg"
          alt=""
          className="absolute -bottom-[14px] left-[2px] size-5 drop-shadow-md"
        />
      </div>

      {/* Earnings call card */}
      <div className="absolute left-[190px] top-[130px] flex w-[203px] flex-col">
        {/* Top section — speaker info + quote */}
        <div className="flex flex-col gap-[2px] overflow-hidden rounded-t-xl border-[0.5px] border-[#5f5f5f] bg-[#313131] p-1">
          <div className="flex gap-1 px-1 py-1">
            <div className="flex items-start gap-1">
              <div className="size-[34px] shrink-0 overflow-hidden rounded-full bg-[#4a4a4a]">
                <div className="flex size-full items-center justify-center text-[12px] font-medium text-[#a0a0a0]">
                  JH
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[14px] leading-none tracking-[-0.14px] text-white">
                  Jensen Huang
                </span>
                <span className="text-[11px] leading-none tracking-[-0.11px] text-[#ccc6c6]">
                  CEO
                </span>
              </div>
            </div>
          </div>
          {/* Quote text with gradient fade */}
          <div className="px-1 py-1">
            <p
              className="text-[14px] font-normal leading-[1.8] tracking-[-0.14px]"
              style={{
                background:
                  "linear-gradient(to bottom, #ccc6c6 37.4%, #313131 93.6%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Thanks, Stewart. Q4 was another record quarter. Revenue of $39.3
              billion was up 12% sequentially and up 78% year-to-year
            </p>
          </div>
        </div>
        {/* Bottom section — source tags */}
        <div className="flex items-center justify-between rounded-b-xl border-x-[0.5px] border-b-[0.5px] border-[#5f5f5f] bg-[#313131] p-1">
          <div className="flex items-center gap-1 px-1 py-1">
            <div className="flex items-center gap-1 rounded bg-[#4d4d4d] pr-1">
              <div className="flex size-[20px] items-center justify-center rounded bg-[#76b900] p-[3px]">
                <img
                  src="/bento/NVIDIA.svg"
                  alt=""
                  className="size-[14px] brightness-0 invert"
                />
              </div>
              <span className="text-[11px] leading-[1.9] text-white">
                NVIDIA
              </span>
            </div>
            <div className="flex h-[20px] items-center rounded bg-[#4d4d4d] px-1">
              <span className="text-[11px] leading-[1.9] text-white">
                Q1 2026
              </span>
            </div>
          </div>
          <ChevronRight size={24} className="text-[#a0a0a0]" strokeWidth={1.5} />
        </div>
      </div>

      {/* Bottom text */}
      <div className="relative z-10 flex flex-col gap-4">
        <h3 className="text-[27.34px] font-medium leading-[1.3] tracking-[-0.82px] text-[#f6f5f5]">
          Trust every finding
        </h3>
        <p className="text-[14px] font-normal leading-[1.8] tracking-[-0.14px] text-[#a0a0a0]">
          40M+ first-party documents, fully searchable and AI-integrated.
        </p>
      </div>
    </div>
  );
}
