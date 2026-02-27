"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gamepad2, Radio, TrendingUpDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  { id: "visibility", label: "Visibility", icon: Gamepad2 },
  { id: "intelligence", label: "Intelligence", icon: Radio },
  { id: "control", label: "Control", icon: TrendingUpDown },
];

const tabContent = [
  {
    title: "See your entire cash position in real-time",
    description:
      "Stop logging into multiple banking portals. Flux aggregates balances across every account, entity, and currency into one unified dashboard that updates automatically.",
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

export function SwitchbackScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [expandedFeature, setExpandedFeature] = useState(2);

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
          setActiveTab(idx);
          setExpandedFeature(2);
        },
      });
    },
    { scope: sectionRef }
  );

  const content = tabContent[activeTab];

  return (
    <section ref={sectionRef} className="bg-surface-elevated">
      <div className="ml-auto flex max-w-[1328px] flex-col items-start py-36 pr-0 pl-6">
        <div className="flex h-[800px] w-full gap-8">
          <div className="flex w-[488px] shrink-0 flex-col justify-between">
            <div className="flex flex-col gap-20 pt-6">
              <div className="flex items-start">
                <div className="flex gap-4 rounded-lg border border-border-input/50 bg-[linear-gradient(111deg,transparent_29%,rgba(0,0,0,0.2)_65%),linear-gradient(90deg,#1c1c1c,#1c1c1c)] p-1.5">
                  {tabs.map((tab, i) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(i)}
                        className={`flex items-center gap-1.5 rounded px-1 py-0.5 pl-1 pr-1.5 font-mono text-xs uppercase tracking-[0.72px] transition-colors ${
                          activeTab === i
                            ? "bg-[#2e2d2d] text-white"
                            : "text-text-dim"
                        }`}
                      >
                        <Icon size={14} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex max-w-[384px] flex-col gap-4">
                <h3 className="max-w-[313px] text-[27.34px] font-medium leading-[1.3] tracking-[-0.82px]">
                  {content.title}
                </h3>
                <p className="text-sm leading-[1.8] tracking-[-0.14px] text-text-muted">
                  {content.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {content.features.map((feature, i) => (
                <button
                  key={feature.num}
                  onClick={() =>
                    setExpandedFeature(expandedFeature === i ? -1 : i)
                  }
                  className="flex gap-3.5 border-t border-border-feature pt-4 text-left"
                >
                  <span className="text-sm leading-[1.8] tracking-[-0.14px] text-white">
                    {feature.num}
                  </span>
                  <div className="flex flex-col gap-2 pr-6">
                    <span className="text-sm leading-[1.8] tracking-[-0.14px] text-text-primary">
                      {feature.title}
                    </span>
                    {expandedFeature === i && (
                      <p className="text-sm leading-[1.8] tracking-[-0.14px] text-text-muted">
                        {feature.detail}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="h-[800px] flex-1 bg-surface-card" />
        </div>
      </div>
    </section>
  );
}
