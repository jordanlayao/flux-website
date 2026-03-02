"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Eye,
  Radio,
  TrendingUpDown,
  UserRound,
  FileText,
  Database,
  House,
  ArrowRight,
  ImageIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  { id: "visibility", label: "Visibility", icon: Eye },
  { id: "intelligence", label: "Intelligence", icon: Radio },
  { id: "control", label: "Control", icon: TrendingUpDown },
];

const tabContent = [
  {
    title: "See your entire cash position in real-time",
    description:
      "Stop logging into multiple banking portals. Flux aggregates balances across every account, entity, and currency into one unified dashboard that updates automatically.",
    chips: ["Dashboards", "Accounts"],
    features: [
      {
        title: "Multi-entity consolidation",
        detail:
          "Manage cash across subsidiaries, divisions, and legal entities from a single view. Automatically convert currencies and track intercompany movements.",
      },
      {
        title: "Instant reconciliation",
        detail:
          "Every transaction flows into Flux within minutes. Match payments to invoices, track pending ACH transfers, and spot discrepancies before they become problems.",
      },
    ],
  },
  {
    title: "AI-powered forecasting that learns your business",
    description:
      "Flux uses machine learning to analyze your historical cash flows, identify patterns, and predict future positions with increasing accuracy over time.",
    chips: ["Forecasting", "Insights"],
    features: [
      {
        title: "Pattern recognition",
        detail:
          "Identify recurring cash flow patterns and seasonal trends automatically.",
      },
      {
        title: "Anomaly detection",
        detail:
          "Get alerted to unusual transactions or cash movements before they impact your position.",
      },
    ],
  },
  {
    title: "Take action with automated treasury operations",
    description:
      "Set rules, automate transfers, and optimize your cash deployment across accounts and entities without manual intervention.",
    chips: ["Workflows", "Rules"],
    features: [
      {
        title: "Automated sweeping",
        detail:
          "Set target balances and let Flux automatically move cash between accounts to optimize yield.",
      },
      {
        title: "Approval workflows",
        detail:
          "Configure multi-level approval chains for transfers above your defined thresholds.",
      },
    ],
  },
];

function DashedGrid({
  verticals,
  horizontals,
}: {
  verticals: number[];
  horizontals: number[];
}) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full"
      preserveAspectRatio="none"
    >
      {verticals.map((x) => (
        <line
          key={`v-${x}`}
          x1={`${(x / 808) * 100}%`}
          y1="2%"
          x2={`${(x / 808) * 100}%`}
          y2="98%"
          stroke="#2a2a2a"
          strokeWidth={0.5}
          strokeDasharray="4 4"
        />
      ))}
      {horizontals.map((y) => (
        <line
          key={`h-${y}`}
          x1="0"
          y1={`${(y / 800) * 100}%`}
          x2="100%"
          y2={`${(y / 800) * 100}%`}
          stroke="#2a2a2a"
          strokeWidth={0.5}
          strokeDasharray="4 4"
        />
      ))}
    </svg>
  );
}

const edgeFadeStyle = {
  backgroundImage:
    "linear-gradient(90deg, #171616 27%, rgba(23,22,22,0.75) 32%, rgba(23,22,22,0.5) 37%, rgba(23,22,22,0.25) 45%, rgba(23,22,22,0.125) 55%, rgba(23,22,22,0) 60%)",
};

function EdgeFades() {
  return (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[17%]" style={edgeFadeStyle} />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[13%] rotate-180" style={edgeFadeStyle} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[54%] -rotate-90 origin-top-left translate-x-[54%]" style={edgeFadeStyle} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] rotate-90 origin-bottom-left translate-x-[44%]" style={edgeFadeStyle} />
    </>
  );
}

function IllustrationVisibility() {
  return (
    <div className="relative size-full overflow-hidden bg-[#171616]">
      <DashedGrid verticals={[318, 490]} horizontals={[18, 312, 488, 782]} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
        <p className="text-[9px] leading-[1.9] text-[#a0a0a0]">Shared</p>
        <div className="flex flex-col pl-2">
          <div className="flex items-center gap-1">
            <UserRound size={12} className="text-[#8b7cf6]" />
            <span className="text-[11px] leading-[1.9] tracking-[-0.11px] text-[#f6f5f5]">
              Customer Service
            </span>
          </div>
          <div className="flex flex-col pl-4">
            <div className="flex items-center gap-1">
              <FileText size={12} className="text-[#6b8aed]" />
              <span className="text-[11px] leading-[1.9] tracking-[-0.11px] text-[#f6f5f5]">
                AI representative
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FileText size={12} className="text-[#6b8aed]" />
              <span className="text-[11px] leading-[1.9] tracking-[-0.11px] text-[#f6f5f5]">
                Test Cases
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Database size={12} className="text-[#5ba0d0]" />
              <span className="text-[11px] leading-[1.9] tracking-[-0.11px] text-[#f6f5f5]">
                May Production Logs
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Database size={12} className="text-[#5ba0d0]" />
              <span className="text-[11px] leading-[1.9] tracking-[-0.11px] text-[#f6f5f5]">
                June Production Logs
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <House size={12} className="text-[#6b8aed]" />
            <span className="text-[11px] leading-[1.9] tracking-[-0.11px] text-[#f6f5f5]">
              Home
            </span>
          </div>
        </div>
      </div>
      <EdgeFades />
    </div>
  );
}

function StrikeTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded bg-[#343434] px-1">
      <span className="text-[13px] leading-[1.9] tracking-[-0.13px] text-[#928e8e] line-through decoration-solid">
        {children}
      </span>
    </span>
  );
}

function GreenTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded bg-[#123d18] px-1.5 shadow-[4px_4px_16px_rgba(0,0,0,0.25)]">
      <span className="text-[13px] leading-[1.9] tracking-[-0.13px] text-[#42b251]">
        {children}
      </span>
    </span>
  );
}

function IllustrationIntelligence() {
  return (
    <div className="relative size-full overflow-hidden bg-[#171616]">
      <DashedGrid verticals={[318, 490]} horizontals={[18, 312, 488, 782]} />

      <div
        className="absolute left-1/2 top-1/2 flex w-[460px] flex-col gap-4"
        style={{ transform: "translate(-50%, -55%) rotate(-6deg) skewX(-11deg)" }}
      >
        <div className="flex flex-col gap-0.5 text-[13px] leading-[1.9] tracking-[-0.13px] text-[#f6f5f5]">
          <p>
            You are a customer service <StrikeTag>representative</StrikeTag>{" "}
            <GreenTag>agent</GreenTag> For a
          </p>
          <p>
            large Airline company <StrikeTag>tasked with responding to</StrikeTag>
          </p>
          <p>
            <StrikeTag>complaints or inquiries related to customer experience.</StrikeTag>
          </p>
          <p>
            <GreenTag>responsible for addressing customer complains and inquires concerning their travel experiences.</GreenTag>
          </p>
        </div>

        <div className="flex flex-col gap-0.5 text-[13px] leading-[1.9] tracking-[-0.13px] text-[#f6f5f5]">
          <p>Rules:</p>
          <ul className="list-disc pl-4">
            <li>Never offer compensation such as credits or vouchers</li>
            <li>Never assign blame directly to the customer</li>
            <li>Always mention the inquiry category by name</li>
          </ul>
        </div>

        <div className="flex flex-col gap-0.5">
          <GreenTag>Keep Responses to 3 sentences or less</GreenTag>
          <div className="w-fit">
            <StrikeTag>Keep it short</StrikeTag>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-[#433378] bg-[#362868] px-1.5 py-0.5 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            <span className="font-mono text-[10px] uppercase leading-[1.9] tracking-[0.6px] text-[#e6d6ff]">
              In Editor
            </span>
            <ArrowRight size={14} className="text-[#e6d6ff]" />
            <span className="font-mono text-[10px] uppercase leading-[1.9] tracking-[0.6px] text-[#e6d6ff]">
              Production
            </span>
          </span>
        </div>

        <div className="mt-1 h-px w-full bg-gradient-to-r from-transparent via-[#4338ca] to-transparent" />
      </div>

      <EdgeFades />
    </div>
  );
}

const mosaicImages = [
  { src: "/switchback/image-01.jpg", w: 222, h: 148, x: "8%", y: "14%", label: true },
  { src: "/switchback/image-02.jpg", w: 127, h: 71, x: "61%", y: "32%", label: true },
  { src: "/switchback/image-03.jpg", w: 109, h: 109, x: "19%", y: "63%", label: true },
  { src: "/switchback/image-04.jpg", w: 240, h: 300, x: "76%", y: "70%", label: true },
];

function IllustrationControl() {
  return (
    <div className="relative size-full overflow-hidden bg-[#171616]">
      <DashedGrid verticals={[323, 484]} horizontals={[18, 389, 410, 782]} />

      {mosaicImages.map((img, i) => (
        <div
          key={i}
          className="absolute flex flex-col gap-1"
          style={{ left: img.x, top: img.y, width: img.w }}
        >
          <div
            className="overflow-hidden"
            style={{ width: img.w, height: img.h }}
          >
            <img
              src={img.src}
              alt=""
              className="size-full object-cover"
              loading="lazy"
            />
          </div>
          {img.label && (
            <span className="font-mono text-[8px] uppercase leading-[1.9] tracking-[0.5px] text-[#f6f5f5]">
              img-var-4.c90890722a.jpg {img.w}x{img.h}
            </span>
          )}
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="inline-flex items-center gap-1 rounded-sm border border-[#433378] bg-[#291a5a] px-1 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <ImageIcon size={12} className="text-[#e6d6ff]" />
          <span className="font-mono text-[11px] leading-[1.9] tracking-[-0.11px] text-[#e6d6ff]">
            {`{{submitted_image_2}}`}
          </span>
        </span>
      </div>

      <EdgeFades />
    </div>
  );
}

const illustrations = [IllustrationVisibility, IllustrationIntelligence, IllustrationControl];

export function SwitchbackScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const illusRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const prevTabRef = useRef(0);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const queuedTabRef = useRef<number | null>(null);
  const isFirstRender = useRef(true);

  const getEls = useCallback(() => {
    if (!contentRef.current) return [];
    const chips = contentRef.current.querySelector(".step-chips");
    const titleWords = contentRef.current.querySelectorAll(".step-title .word-inner");
    const descWords = contentRef.current.querySelectorAll(".step-desc .word-inner");
    const rows = contentRef.current.querySelectorAll(".feature-row");
    return [
      chips,
      ...Array.from(titleWords),
      ...Array.from(descWords),
      ...Array.from(rows),
    ].filter(Boolean);
  }, []);

  const animateTransition = useCallback((newTab: number) => {
    if (!contentRef.current || newTab === prevTabRef.current) return;

    if (tlRef.current) {
      tlRef.current.kill();
      const els = getEls();
      gsap.killTweensOf(els);
    }

    queuedTabRef.current = null;
    const goingUp = newTab < prevTabRef.current;
    const outY = goingUp ? "100%" : "-100%";
    const inY = goingUp ? "-100%" : "100%";

    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(getEls(), {
      yPercent: goingUp ? 100 : -100,
      stagger: 0.015,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        prevTabRef.current = newTab;
        setActiveTab(newTab);

        requestAnimationFrame(() => {
          const freshEls = getEls();
          gsap.set(freshEls, { yPercent: goingUp ? -100 : 100 });
          gsap.to(freshEls, {
            yPercent: 0,
            stagger: 0.018,
            duration: 0.35,
            ease: "power2.out",
            onComplete: () => {
              tlRef.current = null;
              if (queuedTabRef.current !== null && queuedTabRef.current !== prevTabRef.current) {
                const next = queuedTabRef.current;
                queuedTabRef.current = null;
                animateTransition(next);
              }
            },
          });
        });
      },
    });
  }, [getEls]);

  useGSAP(
    () => {
      if (!sectionRef.current || !wrapperRef.current) return;

      const totalTabs = tabs.length;

      gsap.fromTo(
        sectionRef.current,
        { clipPath: "inset(12% 8% 12% 8% round 24px)", opacity: 0.3 },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "top 10%",
            scrub: 0.4,
          },
        }
      );

      const extraHold = 1;
      const totalScroll = totalTabs + extraHold;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalScroll * 100}%`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const tabProgress = self.progress * totalScroll;
          const idx = Math.min(Math.floor(tabProgress), totalTabs - 1);
          if (idx !== prevTabRef.current) {
            if (tlRef.current) {
              queuedTabRef.current = idx;
            } else {
              animateTransition(idx);
            }
          }
        },
      });
    },
    { scope: wrapperRef, dependencies: [animateTransition] }
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const el = illusRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 16, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
    );
  }, [activeTab]);

  const content = tabContent[activeTab];

  return (
    <div ref={wrapperRef}>
    <section ref={sectionRef} className="h-screen bg-surface-elevated will-change-[clip-path,opacity]">
      <div className="mx-auto flex h-full max-w-[1216px] items-start gap-8 px-6 py-12">
        {/* Left column */}
        <div className="flex w-[488px] shrink-0 flex-col justify-between self-stretch">
          <div className="flex flex-col gap-16 pt-6">
            {/* Tab bar */}
            <div className="flex items-start">
              <div
                className="flex gap-4 rounded-lg border border-[#727272]/50 p-1.5"
                style={{
                  backgroundImage:
                    "linear-gradient(111deg, transparent 29.5%, rgba(0,0,0,0.2) 64.7%), linear-gradient(90deg, #1c1c1c, #1c1c1c)",
                }}
              >
                {tabs.map((tab, i) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        if (i !== activeTab) animateTransition(i);
                      }}
                      className={`flex items-center gap-1.5 rounded px-1.5 py-0.5 font-mono text-[12px] uppercase tracking-[0.72px] transition-colors ${
                        activeTab === i
                          ? "bg-[#2e2d2d] text-white"
                          : "text-[#939393]"
                      }`}
                    >
                      <Icon size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Learn more + chips + Title + description */}
            <div ref={contentRef} className="flex flex-col gap-8">
              <div className="overflow-hidden">
                <div className="step-chips flex items-center gap-2">
                  <span className="text-[13px] leading-[1.8] tracking-[-0.13px] text-[#939393]">
                    Learn more
                  </span>
                  {content.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[#373737] bg-[#1c1c1c] px-3 py-0.5 font-mono text-[11px] uppercase tracking-[0.66px] text-[#a0a0a0]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex max-w-[384px] flex-col gap-4">
                <h3 className="step-title flex max-w-[313px] flex-wrap text-[27.34px] font-medium leading-[1.3] tracking-[-0.82px]">
                  {content.title.split(" ").map((word, i) => (
                    <span key={`${activeTab}-t-${i}`} className="inline-block overflow-hidden mr-[0.3em]">
                      <span className="word-inner inline-block">{word}</span>
                    </span>
                  ))}
                </h3>
                <p className="step-desc flex flex-wrap text-[14px] font-normal leading-[1.8] tracking-[-0.14px] text-[#a0a0a0]">
                  {content.description.split(" ").map((word, i) => (
                    <span key={`${activeTab}-d-${i}`} className="inline-block overflow-hidden mr-[0.27em]">
                      <span className="word-inner inline-block">{word}</span>
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* Feature rows */}
          <div className="flex flex-col gap-4 pb-6">
            {content.features.map((feature, i) => (
              <div
                key={`${activeTab}-${i}`}
                className="overflow-hidden border-t border-[#373737] pt-4"
              >
                <div className="feature-row flex flex-col gap-2 text-left">
                  <span className="text-[14px] leading-[1.8] tracking-[-0.14px] text-[#f6f5f5]">
                    {feature.title}
                  </span>
                  <p className="text-[14px] leading-[1.8] tracking-[-0.14px] text-[#a0a0a0]">
                    {feature.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right illustration */}
        <div ref={illusRef} className="flex-1 self-stretch overflow-hidden rounded">
          {(() => {
            const Illus = illustrations[activeTab];
            return <Illus />;
          })()}
        </div>
      </div>
    </section>
    </div>
  );
}
