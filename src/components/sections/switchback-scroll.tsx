"use client";

import { useRef, useState, useCallback } from "react";
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
        num: "1",
        title: "Multi-entity consolidation",
        detail:
          "Manage cash across subsidiaries, divisions, and legal entities from a single view. Automatically convert currencies and track intercompany movements.",
      },
      {
        num: "2",
        title: "Instant reconciliation",
        detail:
          "Every transaction flows into Flux within minutes. Match payments to invoices, track pending ACH transfers, and spot discrepancies before they become problems.",
      },
      {
        num: "3",
        title: "Live balance tracking",
        detail:
          "Manage cash across subsidiaries, divisions, and legal entities from a single view. Automatically convert currencies and track intercompany movements.",
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
        num: "1",
        title: "Pattern recognition",
        detail:
          "Identify recurring cash flow patterns and seasonal trends automatically.",
      },
      {
        num: "2",
        title: "Anomaly detection",
        detail:
          "Get alerted to unusual transactions or cash movements before they impact your position.",
      },
      {
        num: "3",
        title: "Scenario modeling",
        detail:
          "Run what-if scenarios to understand how different decisions affect your cash runway.",
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
        num: "1",
        title: "Automated sweeping",
        detail:
          "Set target balances and let Flux automatically move cash between accounts to optimize yield.",
      },
      {
        num: "2",
        title: "Approval workflows",
        detail:
          "Configure multi-level approval chains for transfers above your defined thresholds.",
      },
      {
        num: "3",
        title: "Smart allocation",
        detail:
          "Automatically allocate incoming funds based on your predefined rules and priorities.",
      },
    ],
  },
];

function Illustration() {
  return (
    <div className="relative size-full overflow-hidden bg-[#171616]">
      <svg
        className="pointer-events-none absolute inset-0 size-full"
        preserveAspectRatio="none"
      >
        {[318, 490].map((x) => (
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
        {[18, 312, 488, 782].map((y) => (
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
    </div>
  );
}

export function SwitchbackScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [expandedFeature, setExpandedFeature] = useState(2);
  const prevTabRef = useRef(0);

  const animateTransition = useCallback((newTab: number) => {
    if (!contentRef.current || newTab === prevTabRef.current) return;

    const chips = contentRef.current.querySelector(".step-chips");
    const title = contentRef.current.querySelector(".step-title");
    const desc = contentRef.current.querySelector(".step-desc");
    const rows = contentRef.current.querySelectorAll(".feature-row");
    const els = [chips, title, desc, ...Array.from(rows)].filter(Boolean);

    const tl = gsap.timeline();

    tl.to(els, {
      y: -30,
      opacity: 0,
      stagger: 0.03,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(newTab);
        setExpandedFeature(2);
        prevTabRef.current = newTab;
      },
    });

    tl.fromTo(
      els,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.35, ease: "power2.out" }
    );
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const totalTabs = tabs.length;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalTabs * 100}%`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * totalTabs),
            totalTabs - 1
          );
          if (idx !== prevTabRef.current) {
            animateTransition(idx);
          }
        },
      });
    },
    { scope: sectionRef, dependencies: [animateTransition] }
  );

  const content = tabContent[activeTab];

  return (
    <section ref={sectionRef} className="h-screen bg-surface-elevated">
      <div className="ml-auto flex h-full max-w-[1328px] items-start gap-8 py-12 pr-0 pl-6">
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
              <div className="flex max-w-[384px] flex-col gap-4">
                <h3 className="step-title max-w-[313px] text-[27.34px] font-medium leading-[1.3] tracking-[-0.82px]">
                  {content.title}
                </h3>
                <p className="step-desc text-[14px] font-normal leading-[1.8] tracking-[-0.14px] text-[#a0a0a0]">
                  {content.description}
                </p>
              </div>
            </div>
          </div>

          {/* Feature rows */}
          <div className="flex flex-col gap-4 pb-6">
            {content.features.map((feature, i) => (
              <button
                key={`${activeTab}-${feature.num}`}
                onClick={() => setExpandedFeature(i)}
                className="feature-row flex gap-3.5 border-t border-[#373737] pt-4 text-left"
              >
                <span className="text-[14px] leading-[1.8] tracking-[-0.14px] text-white">
                  {feature.num}
                </span>
                <div className="flex flex-1 flex-col gap-2 pr-6">
                  <span className="text-[14px] leading-[1.8] tracking-[-0.14px] text-[#f6f5f5]">
                    {feature.title}
                  </span>
                  {expandedFeature === i && (
                    <p className="text-[14px] leading-[1.8] tracking-[-0.14px] text-[#a0a0a0]">
                      {feature.detail}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right illustration */}
        <div className="flex-1 self-stretch overflow-hidden rounded">
          <Illustration />
        </div>
      </div>
    </section>
  );
}
