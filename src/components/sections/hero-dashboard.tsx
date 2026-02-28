"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { House, CalendarDays, ChartLine, Bolt, X } from "lucide-react";

const TABS = [
  { id: "home", icon: House, label: "Home" },
  { id: "calendar", icon: CalendarDays, label: "Calendar" },
  { id: "charts", icon: ChartLine, label: "Charts" },
  { id: "actions", icon: Bolt, label: "Actions" },
] as const;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

// ---------------------------------------------------------------------------
// Screen 1 — Markets
// ---------------------------------------------------------------------------

const sectors = [
  { name: "Healthcare", icon: "/dashboard/sector-healthcare.svg", value: "+0.88%", positive: true, filledBars: 14, totalBars: 33 },
  { name: "Financial", icon: "/dashboard/sector-financial.svg", value: "+0.65%", positive: true, filledBars: 11, totalBars: 33 },
  { name: "Real Estate", icon: "/dashboard/sector-realestate.svg", value: "+0.52%", positive: true, filledBars: 9, totalBars: 33 },
  { name: "Consumer Defensive", icon: "/dashboard/sector-consumer.svg", value: "+0.39%", positive: true, filledBars: 6, totalBars: 33 },
  { name: "Energy", icon: "/dashboard/sector-energy.svg", value: "+0.23%", positive: true, filledBars: 4, totalBars: 33 },
  { name: "Communication Services", icon: "/dashboard/sector-comms.svg", value: "+0.19%", positive: false, filledBars: 5, totalBars: 33 },
  { name: "Basic Materials", icon: "/dashboard/sector-materials.svg", value: "+0.02%", positive: false, filledBars: 2, totalBars: 33 },
  { name: "Industrials", icon: "/dashboard/sector-industrials.svg", value: "-0.32%", positive: false, filledBars: 7, totalBars: 33 },
];

const newsItems = [
  {
    source: "Daily recap",
    sourceIcon: "/dashboard/news-daily.svg",
    time: "Summarized at 6:00 AM",
    featured: true,
    text: "Hedge funds retreat from tech and media as a potential market correction looms, while Apple plans a major investment in AI servers. Meanwhile, geopolitical factors influence economic confidence, and New Zealand report a retail sales rebound as the German business climate shows mild improvements.",
    fullText: "Hedge funds retreat from tech and media as a potential market correction looms, while Apple plans a major investment in AI servers. Meanwhile, geopolitical factors influence economic confidence, and New Zealand report a retail sales rebound as the German business climate shows mild improvements.\n\nSeveral major hedge funds have begun unwinding long positions in mega-cap technology and media stocks, citing stretched valuations and deteriorating earnings momentum. The repositioning comes amid growing concerns that the S&P 500's concentration in a handful of tech names has left portfolios vulnerable to a sharp drawdown.\n\nSeparately, Apple confirmed plans to invest over $500 billion in domestic AI server infrastructure over the next five years, signaling a deeper push into enterprise AI services and on-device intelligence. Analysts expect the move to intensify competition with Microsoft Azure and Google Cloud.",
  },
  {
    source: "Daily recap",
    sourceIcon: "/dashboard/news-daily.svg",
    time: "10m ago",
    featured: false,
    text: "Oil prices climb for the 2nd day as US sanctions on Iran heighten fears of supply constrains",
    fullText: "Oil prices climb for the 2nd day as US sanctions on Iran heighten fears of supply constraints.\n\nBrent crude futures rose 1.8% to $82.45 per barrel, extending gains after the White House announced a fresh round of sanctions targeting Iran's petroleum exports. The measures are expected to remove roughly 500,000 barrels per day from global supply, tightening an already strained market.\n\nOPEC+ members have signaled no plans to increase output quotas in the near term, further supporting the bullish outlook. Energy analysts at Goldman Sachs raised their Q3 price target to $90, citing robust demand from Asian refineries and limited spare capacity among Gulf producers.",
  },
  {
    source: "NVDA",
    sourceIcon: "/dashboard/news-nvda.svg",
    time: "30m ago",
    featured: false,
    text: "Chinese firms boost Nvidia's H20 chip orders, driven by the rising demands for DeepSeek's AI models, according to sources.",
    fullText: "Chinese firms boost Nvidia's H20 chip orders, driven by the rising demands for DeepSeek's AI models, according to sources.\n\nMultiple Chinese cloud providers and AI startups have placed large orders for Nvidia's H20 accelerator — the highest-performance GPU currently cleared for export to China under US trade restrictions. The surge in demand is closely tied to the rapid adoption of DeepSeek's open-weight language models, which require substantial compute for both training and inference.\n\nNvidia's H20 shipments to China are expected to generate approximately $12 billion in revenue this fiscal year, making it one of the company's fastest-growing product lines. The trend underscores how export controls have reshaped, but not eliminated, China's appetite for advanced AI hardware.",
  },
  {
    source: "TSLA",
    sourceIcon: "/dashboard/news-tsla.svg",
    time: "1hr ago",
    featured: false,
    text: "Tesla software update adds city navigation, enhancing driving assistance for urban streets, per company notification and sources.",
    fullText: "Tesla software update adds city navigation, enhancing driving assistance for urban streets, per company notification and sources.\n\nTesla has begun rolling out version 2026.4.1 of its Full Self-Driving software, which introduces expanded city-street navigation across 14 new metropolitan areas in the United States and Europe. The update leverages an end-to-end neural network that processes real-time camera feeds to handle complex intersections, unprotected left turns, and pedestrian-heavy zones.\n\nEarly testers report significantly smoother lane changes and better handling of construction zones compared to the previous release. Tesla CEO Elon Musk noted on X that the company is on track to achieve unsupervised autonomous driving approval in select markets by late 2026, though regulatory hurdles remain.",
  },
  {
    source: "JNJ",
    sourceIcon: "/dashboard/news-jnj.svg",
    time: "2hr ago",
    featured: false,
    text: "Johnson & Johnson to release Q4 earnings report.",
    fullText: "Johnson & Johnson to release Q4 earnings report.\n\nJohnson & Johnson is scheduled to report fourth-quarter results before market open on Tuesday. Wall Street consensus expects revenue of $22.4 billion and adjusted EPS of $2.28, reflecting steady growth in the company's MedTech and Innovative Medicine segments.\n\nInvestors will be closely watching updates on the company's oncology pipeline, particularly the Phase III data readout for its next-generation bispecific antibody targeting non-small cell lung cancer. Management is also expected to provide guidance on the planned separation of its consumer health division, which is set to complete by mid-2026.",
  },
  {
    source: "ADBE",
    sourceIcon: "/dashboard/news-adbe.svg",
    time: "3hr ago",
    featured: false,
    text: "Adobe unveils new AI-powered features across Creative Cloud, boosting productivity for designers and content creators.",
    fullText: "Adobe unveils new AI-powered features across Creative Cloud, boosting productivity for designers and content creators.\n\nAdobe announced a major update to its Creative Cloud suite, introducing generative AI capabilities powered by the latest Firefly models directly into Photoshop, Illustrator, and Premiere Pro. The new tools allow users to generate complex compositions, extend video scenes, and create vector graphics from natural-language prompts.\n\nThe company reported that enterprise adoption of its AI features has grown 340% year-over-year, with major media companies and advertising agencies integrating Adobe's generative tools into their production workflows. Adobe also revealed a new pricing tier for teams that includes unlimited Firefly credits, aiming to capture the growing demand for AI-assisted creative work.",
  },
];

function SectorBars({ positive, filledBars, totalBars }: { positive: boolean; filledBars: number; totalBars: number }) {
  const activeColor = positive ? "bg-[#42b251]" : "bg-[#ee575a]";
  const dimColor = positive ? "bg-[#0d4114]" : "bg-[#6c2d2e]";

  return (
    <div className="flex items-center gap-[2px]">
      {Array.from({ length: totalBars }).map((_, i) => {
        let color = "bg-[#444]";
        if (positive) {
          const emptyStart = totalBars - filledBars - (totalBars - filledBars > 3 ? 3 : 0);
          if (i >= emptyStart && i < emptyStart + filledBars) color = activeColor;
          else if (i >= emptyStart + filledBars) color = dimColor;
        } else {
          if (i < totalBars - filledBars - 16) color = dimColor;
          else if (i < totalBars - 16) color = activeColor;
        }
        return <div key={i} className={`h-[10px] w-[2px] rounded-[0.5px] ${color}`} />;
      })}
    </div>
  );
}

function SectorRow({ sector }: { sector: typeof sectors[number] }) {
  const valueColor = sector.positive ? "text-[#42b251]" : "text-[#ee575a]";

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={sector.icon} alt="" className="size-[14px]" />
          <span className="text-[14px] font-medium leading-[1.8] tracking-[-0.14px] text-[#cbcbcb]">
            {sector.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-[14px] font-medium leading-[1.8] tracking-[-0.14px] ${valueColor}`}>
            {sector.value}
          </span>
          <SectorBars positive={sector.positive} filledBars={sector.filledBars} totalBars={sector.totalBars} />
        </div>
      </div>
      <div className="h-[2px] w-full rounded-full">
        <img src="/dashboard/divider.png" alt="" className="h-full w-full rounded-full object-cover" />
      </div>
    </div>
  );
}

function NewsItemContent({ item }: { item: typeof newsItems[number] }) {
  return (
    <>
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-1.5 rounded-full border-[0.5px] border-[#575757] bg-black/20 py-1 pl-1 pr-[6px] backdrop-blur-sm">
          <div className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-black">
            <img src={item.sourceIcon} alt="" className="size-[12px] object-contain" />
          </div>
          <span
            className={`text-[11px] leading-[1.9] tracking-[-0.11px] ${
              item.featured ? "font-semibold text-[#f6f5f5]" : "font-normal text-[#939393]"
            }`}
          >
            {item.source}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] leading-[1.9] tracking-[-0.11px]">
          {item.featured ? (
            <span className="text-[#939393]">{item.time}</span>
          ) : (
            <>
              <span className="text-[#939393]">Today</span>
              <img src="/dashboard/dot.svg" alt="" className="size-[2px]" />
              <span className="text-[#514e4e]">{item.time}</span>
            </>
          )}
        </div>
      </div>
      <p className="text-[14px] leading-[1.8] tracking-[-0.14px] text-[#939393]">
        {item.featured ? (
          <span className="font-semibold text-[#f6f5f5]">
            {item.text}{" "}
            <span className="font-normal text-[#939393] underline">Read more</span>
          </span>
        ) : (
          <>
            {item.text}{" "}
            <span className="text-[#939393] underline">Read more</span>
          </>
        )}
      </p>
    </>
  );
}

function NewsItem({
  item,
  index,
  isOpen,
  onOpen,
  onClose,
}: {
  item: typeof newsItems[number];
  index: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  if (isOpen) {
    return (
      <div className="invisible flex w-full shrink-0 flex-col gap-4 rounded border-[0.5px] p-4">
        <NewsItemContent item={item} />
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      layoutId={`news-card-${index}`}
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex w-full shrink-0 cursor-pointer flex-col gap-4 overflow-hidden rounded border-[0.5px] border-[#393939] p-4 transition-[border-color] duration-200 hover:border-[#4a4a4a] ${
        item.featured ? "" : "bg-[#131212]"
      }`}
      style={
        item.featured
          ? {
              borderRadius: 4,
              backgroundImage:
                "radial-gradient(ellipse at 12% 15%, rgba(85,123,91,0.2) 0%, rgba(43,62,45,0.1) 33%, transparent 66%), linear-gradient(to bottom, #131212, #131212)",
            }
          : { borderRadius: 4 }
      }
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.04) 0%, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">
        <NewsItemContent item={item} />
      </div>
    </motion.div>
  );
}

function DashboardScreen1() {
  const [openNews, setOpenNews] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleIndex, setVisibleIndex] = useState(0);

  const scrollY = useSpring(0, { stiffness: 120, damping: 14 });
  const hasStarted = useRef(false);
  const count = newsItems.length;
  const doubledItems = [...newsItems, ...newsItems];

  useEffect(() => {
    if (openNews !== null || isHovering) return;

    const pause = hasStarted.current ? 4000 : 3000;
    const timer = setTimeout(() => {
      hasStarted.current = true;
      const nextIndex = visibleIndex + 1;

      if (nextIndex >= count) {
        scrollY.jump(0);
        setVisibleIndex(0);
        return;
      }

      const el = itemRefs.current[nextIndex];
      if (el) {
        const container = el.parentElement;
        if (container) {
          const offset = el.offsetTop - container.offsetTop;
          scrollY.set(-offset);
        }
      }
      setVisibleIndex(nextIndex);
    }, pause);

    return () => clearTimeout(timer);
  }, [visibleIndex, openNews, isHovering, scrollY, count]);

  return (
    <div className="relative flex h-full gap-1 p-1">
      <div className="flex w-[57%] shrink-0 flex-col gap-4 overflow-hidden rounded border-[0.5px] border-[#393939] bg-[#131212] p-6">
        <div className="flex flex-col">
          <span className="text-[14px] leading-[1.8] tracking-[-0.14px] text-[#a0a0a0]">
            Tuesday, February 25
          </span>
          <div className="flex items-center gap-1 text-[17.5px] font-semibold leading-[1.6] tracking-[-0.175px]">
            <span className="text-[#f6f5f5]">The markets are </span>
            <span className="text-[#a0a0a0]">neutral</span>
          </div>
        </div>

        <div className="relative h-[200px] w-full">
          <div className="absolute left-0 top-[15%] h-px w-full">
            <img src="/dashboard/grid-line.svg" alt="" className="h-px w-full" />
          </div>
          <div className="absolute left-0 top-[70%] h-px w-full">
            <img src="/dashboard/grid-line-dashed.svg" alt="" className="h-px w-full" />
          </div>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            style={{ transformOrigin: "center" }}
            className="absolute left-0 top-0 h-[82%] w-[96%]"
          >
            <img src="/dashboard/chart-line-main.svg" alt="" className="h-full w-full" />
          </motion.div>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
            style={{ transformOrigin: "center" }}
            className="absolute left-0 top-[84%] h-[17%] w-[96%]"
          >
            <img src="/dashboard/chart-line-secondary.svg" alt="" className="h-full w-full" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            className="absolute right-0 top-[12%] text-[11px] leading-[1.9] tracking-[-0.11px] text-[#cbcbcb]"
          >
            18%
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            className="absolute bottom-[8%] right-0 text-[11px] leading-[1.9] tracking-[-0.11px] text-[#966dd5]"
          >
            $18.98
          </motion.span>
        </div>

        <div className="flex w-full items-center justify-between text-[14px] font-medium leading-[1.8] tracking-[-0.14px] text-[#cbcbcb]">
          <div className="flex items-center gap-4">
            <span>S&P 500</span>
            <span>VIX</span>
            <span>Connect Portfolio</span>
          </div>
          <div className="flex items-center gap-5">
            {["1M", "3M", "YTD", "1Y", "2Y"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 overflow-hidden rounded-lg border-[0.5px] border-[#232222] bg-[#1a1a1a] p-4">
          {sectors.map((sector) => (
            <SectorRow key={sector.name} sector={sector} />
          ))}
        </div>
      </div>

      <div
        className="relative flex flex-1 flex-col gap-2 overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          className="flex flex-col gap-2"
          style={{ y: scrollY }}
        >
          {doubledItems.map((item, i) => {
            const realIndex = i % count;
            return (
              <div
                key={i}
                ref={i < count ? (el) => { itemRefs.current[i] = el; } : undefined}
              >
                <NewsItem
                  item={item}
                  index={i}
                  isOpen={openNews === realIndex}
                  onOpen={() => setOpenNews(realIndex)}
                  onClose={() => setOpenNews(null)}
                />
              </div>
            );
          })}
        </motion.div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-[120px] w-full bg-gradient-to-t from-[#171616] to-transparent" />
      </div>

      <AnimatePresence>
        {openNews !== null && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpenNews(null)}
            />
            <motion.div
              key="popup"
              layoutId={`news-card-${openNews}`}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-1/2 top-1/2 z-30 flex max-h-[80%] w-[90%] max-w-[480px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-hidden rounded-lg border border-[#393939] bg-[#131212] p-6"
              style={{ borderRadius: 8 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            >
              <div className="flex shrink-0 items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-black">
                    <img src={newsItems[openNews].sourceIcon} alt="" className="size-[14px] object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-[#f6f5f5]">{newsItems[openNews].source}</span>
                    <span className="text-[11px] text-[#515151]">{newsItems[openNews].featured ? newsItems[openNews].time : `Today · ${newsItems[openNews].time}`}</span>
                  </div>
                </div>
                <button onClick={() => setOpenNews(null)} className="cursor-pointer rounded-full p-1 transition-colors hover:bg-white/10">
                  <X size={16} className="text-[#939393]" />
                </button>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.2 }}
                className="min-h-0 flex-1 overflow-y-auto text-[14px] leading-[1.8] tracking-[-0.14px] text-[#cbcbcb] scrollbar-none"
                style={{ scrollbarWidth: "none" }}
              >
                {newsItems[openNews].fullText.split("\n\n").map((para, i) => (
                  <p key={i} className={i > 0 ? "mt-3" : ""}>{para}</p>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Calendar screen (Figma: node 248-1594)
// ---------------------------------------------------------------------------

const CALENDAR_DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

type CalendarEventType = "earnings" | "economic" | "fed" | "options";

const CALENDAR_EVENT_PILL_STYLES: Record<
  CalendarEventType,
  string
> = {
  earnings: "bg-[#42b251]/20 text-[#42b251] border border-[#42b251]/40",
  economic: "bg-[#966dd5]/20 text-[#b8a0e0] border border-[#966dd5]/40",
  fed: "bg-[#e89b4a]/20 text-[#e89b4a] border border-[#e89b4a]/40",
  options: "bg-[#666]/30 text-[#939393] border border-[#555]",
};

const calendarEventsByDay: Record<number, { label: string; type: CalendarEventType }[]> = {
  3: [{ label: "AMZN Earnings", type: "earnings" }],
  5: [{ label: "GOOGL Earnings", type: "earnings" }],
  6: [{ label: "Jobs Report", type: "fed" }],
  11: [{ label: "CPI Data", type: "economic" }],
  12: [{ label: "PPI Data", type: "economic" }],
  13: [{ label: "Retail Sales", type: "economic" }],
  17: [{ label: "NVDA Earnings", type: "earnings" }],
  19: [{ label: "FOMC Minutes", type: "fed" }],
  20: [{ label: "Options Exp.", type: "options" }],
  25: [{ label: "GDP Q4 Final", type: "economic" }],
  27: [{ label: "PCE Inflation", type: "economic" }],
};

const marketEventsList = [
  {
    type: "economic" as CalendarEventType,
    dateLabel: "Today · 8:30 AM",
    description:
      "PCE Price Index for January — the Fed preferred inflation gauge. Core PCE expected at 2.6% YoY, unchanged from prior month.",
  },
  {
    type: "earnings" as CalendarEventType,
    dateLabel: "Mar 17 · After Close",
    description:
      "NVDA Q4 FY2026 earnings. Analysts expect EPS of $0.89 on revenue of $38.2B, driven by Blackwell GPU demand from hyperscalers.",
  },
  {
    type: "fed" as CalendarEventType,
    dateLabel: "Mar 19 · 2:00 PM ET",
    description:
      "FOMC meeting minutes release. Markets parsing language on rate cut timing after January hold at 4.25-4.50%.",
  },
  {
    type: "options" as CalendarEventType,
    dateLabel: "Mar 20 · Market Close",
    description:
      "Monthly options expiration. Elevated volatility expected in mega-cap tech and index ETFs as $2.1T in notional value expires.",
  },
  {
    type: "economic" as CalendarEventType,
    dateLabel: "Mar 25 · 8:30 AM ET",
    description:
      "GDP Q4 2025 Final Revision. Third estimate expected to confirm 2.3% annualized growth with upward core PCE revision.",
  },
];

const LEGEND_ITEMS: { type: CalendarEventType; label: string }[] = [
  { type: "earnings", label: "Earnings" },
  { type: "economic", label: "Economic Data" },
  { type: "fed", label: "Fed / FOMC" },
  { type: "options", label: "Options Exp." },
];

function DashboardScreen2() {
  const [viewDate, setViewDate] = useState(() => new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const today = new Date();
  const isToday = (d: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingEmpty = firstDay;
  const totalCells = leadingEmpty + daysInMonth;
  const gridRows = Math.ceil(totalCells / 7);

  const goPrev = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1));
  const goNext = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1));
  const goToday = () => setViewDate(new Date());

  const monthLabel = viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const fullDateLabel = viewDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const prevMonthLabel = new Date(year, month - 1).toLocaleDateString("en-US", { month: "short" });
  const nextMonthLabel = new Date(year, month + 1).toLocaleDateString("en-US", { month: "short" });

  return (
    <div className="relative flex h-full gap-1 p-1">
      {/* Left: Calendar */}
      <div className="flex w-[57%] shrink-0 flex-col gap-4 overflow-hidden rounded border-[0.5px] border-[#393939] bg-[#131212] p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-[14px] leading-[1.8] tracking-[-0.14px] text-[#a0a0a0]">
              {fullDateLabel}
            </span>
            <span className="text-[17.5px] font-semibold leading-[1.6] tracking-[-0.175px] text-[#f6f5f5]">
              {monthLabel}
            </span>
          </div>
          <div className="flex items-start gap-1.5">
            <button
              type="button"
              onClick={goPrev}
              className="rounded border border-[#393939] bg-[#1a1a1a] px-2.5 py-1 text-[11px] leading-[1.9] tracking-[-0.11px] text-[#cbcbcb] transition-colors hover:border-[#4a4a4a]"
            >
              ← {prevMonthLabel}
            </button>
            <button
              type="button"
              onClick={goToday}
              className="rounded border border-[#393939] bg-[#1a1a1a] px-2.5 py-1 text-[11px] leading-[1.9] tracking-[-0.11px] text-[#cbcbcb] transition-colors hover:border-[#4a4a4a]"
            >
              Today
            </button>
            <button
              type="button"
              onClick={goNext}
              className="rounded border border-[#393939] bg-[#1a1a1a] px-2.5 py-1 text-[11px] leading-[1.9] tracking-[-0.11px] text-[#cbcbcb] transition-colors hover:border-[#4a4a4a]"
            >
              {nextMonthLabel} →
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <div className="grid grid-cols-7 gap-1">
            {CALENDAR_DAY_LABELS.map((label) => (
              <div
                key={label}
                className="py-1 text-center text-[11px] font-medium leading-[1.8] tracking-[-0.11px] text-[#666]"
              >
                {label}
              </div>
            ))}
          </div>
          <div
            className="grid flex-1 grid-cols-7 gap-1"
            style={{ gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: leadingEmpty }, (_, i) => (
              <div key={`empty-${i}`} className="rounded-md bg-[#1a1a1a]/50" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const todayCell = isToday(day);
              const events = calendarEventsByDay[day] ?? [];
              return (
                <div
                  key={day}
                  className={`flex flex-col gap-1 rounded-md border p-1.5 ${
                    todayCell
                      ? "border-[#966dd5] bg-[#966dd5]/10"
                      : "border-transparent bg-[#1a1a1a]/50 hover:bg-[#1a1a1a]"
                  }`}
                >
                  <span
                    className={`text-[13px] leading-[1.4] tracking-[-0.13px] ${
                      todayCell ? "text-[#f6f5f5]" : "text-[#939393]"
                    }`}
                  >
                    {day}
                  </span>
                  <div className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-hidden">
                    {events.map((ev, j) => (
                      <span
                        key={j}
                        className={`truncate rounded px-1.5 py-0.5 text-[10px] font-medium leading-tight border ${CALENDAR_EVENT_PILL_STYLES[ev.type]}`}
                      >
                        {ev.label}
                      </span>
                    ))}
                  </div>
                  {todayCell && (
                    <span className="text-[10px] leading-tight text-[#966dd5]">Today</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex shrink-0 flex-wrap gap-x-4 gap-y-1">
            {LEGEND_ITEMS.map(({ type, label }) => (
              <div key={type} className="flex items-center gap-1.5">
                <span
                  className="inline-block size-2.5 rounded-sm border border-[#393939]"
                  style={{
                    backgroundColor:
                      type === "earnings"
                        ? "rgba(66,178,81,0.5)"
                        : type === "economic"
                          ? "rgba(150,109,213,0.5)"
                          : type === "fed"
                            ? "rgba(232,155,74,0.5)"
                            : "rgba(102,102,102,0.5)",
                  }}
                />
                <span className="text-[11px] leading-[1.8] tracking-[-0.11px] text-[#939393]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Events Panel (Figma 248-1720) */}
      <div className="relative flex flex-1 flex-col gap-2 overflow-hidden">
        {/* Summary card */}
        <div className="flex shrink-0 flex-col gap-4 rounded border border-[#393939] bg-[#131212] p-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#575757] bg-[#1a1a1a] px-2 text-[11px] leading-[1.9] tracking-[-0.11px] text-[#f6f5f5]">
              Market Events
            </span>
            <span className="text-[11px] leading-[1.9] tracking-[-0.11px] text-[#514e4e]">
              {monthLabel}
            </span>
          </div>
          <p className="text-[14px] font-semibold leading-[1.8] tracking-[-0.14px] text-[#f6f5f5]">
            5 market-moving events ahead — PCE inflation data today, NVDA earnings on the 17th, and
            FOMC minutes on the 19th.
          </p>
        </div>

        {/* Event cards — scrollable */}
        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none" style={{ scrollbarWidth: "none" }}>
          <div className="flex flex-col gap-2">
            {marketEventsList.map((event, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 rounded border border-[#393939] bg-[#131212] p-4"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 text-[11px] leading-[1.9] tracking-[-0.11px] ${
                      event.type === "earnings"
                        ? "bg-[#0d4114] text-[#42b251]"
                        : event.type === "economic"
                          ? "bg-[#2a1d3a] text-[#966dd5]"
                          : event.type === "fed"
                            ? "bg-[#3a2c0d] text-[#d4a855]"
                            : "bg-[#232222] text-[#939393]"
                    }`}
                  >
                    {event.type === "earnings" ? "Earnings" : event.type === "economic" ? "Economic Data" : event.type === "fed" ? "Fed / FOMC" : "Options Exp."}
                  </span>
                  <span className="text-[11px] leading-[1.9] tracking-[-0.11px] text-[#514e4e]">
                    {event.dateLabel}
                  </span>
                </div>
                <p className="text-[14px] leading-[1.8] tracking-[-0.14px] text-[#939393]">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[70px] w-full bg-gradient-to-t from-[#171616] to-transparent" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Placeholder screens
// ---------------------------------------------------------------------------

function DashboardScreen3() {
  return (
    <div className="flex h-full items-center justify-center p-1">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded border-[0.5px] border-[#393939] bg-[#131212] h-full">
        <ChartLine size={48} className="text-[#393939]" />
        <span className="text-[14px] tracking-[-0.14px] text-[#515151]">Charts — Coming soon</span>
      </div>
    </div>
  );
}

function DashboardScreen4() {
  return (
    <div className="flex h-full items-center justify-center p-1">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded border-[0.5px] border-[#393939] bg-[#131212] h-full">
        <Bolt size={48} className="text-[#393939]" />
        <span className="text-[14px] tracking-[-0.14px] text-[#515151]">Actions — Coming soon</span>
      </div>
    </div>
  );
}

const SCREENS = [DashboardScreen1, DashboardScreen2, DashboardScreen3, DashboardScreen4];

// ---------------------------------------------------------------------------
// Tab Bar — liquid glass
// ---------------------------------------------------------------------------

function DashboardTabBar({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-0 left-1/2 z-40 -translate-x-1/2 translate-y-1/2">
      <div className="flex items-center gap-4 rounded-full border border-white/10 bg-[rgba(138,138,138,0.2)] p-2 backdrop-blur-[20px] backdrop-saturate-[180%]">
        {TABS.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = i === activeIndex;
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(i)}
              className="relative flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors"
              aria-label={tab.label}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-full bg-white/10 border border-white/15"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={22}
                className={`relative z-10 transition-colors duration-200 ${
                  isActive ? "text-white" : "text-[#666]"
                }`}
                strokeWidth={1.5}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function HeroDashboard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex]
  );

  const Screen = SCREENS[activeIndex];

  return (
    <div className="relative mb-12">
      <div className="relative h-[80vh] overflow-hidden rounded-lg border-[0.5px] border-[#262626] bg-[#1a1a1a]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <Screen />
          </motion.div>
        </AnimatePresence>
      </div>

      <DashboardTabBar activeIndex={activeIndex} onSelect={goTo} />
    </div>
  );
}
