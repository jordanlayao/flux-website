"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    hasReadMore: true,
  },
  {
    source: "Daily recap",
    sourceIcon: "/dashboard/news-daily.svg",
    time: "10m ago",
    featured: false,
    text: "Oil prices climb for the 2nd day as US sanctions on Iran heighten fears of supply constrains",
  },
  {
    source: "NVDA",
    sourceIcon: "/dashboard/news-nvda.svg",
    time: "30m ago",
    featured: false,
    text: "Chinese firms boost Nividia's H20 chips orders, drive by the rising demands for DeepSeek's AI models, according to sources.",
  },
  {
    source: "TSLA",
    sourceIcon: "/dashboard/news-tsla.svg",
    time: "1hr ago",
    featured: false,
    text: "Chinese software updates plans add city navigation, enhancing car's driving-assistances for urban street navigation, per company notification and sources.",
  },
  {
    source: "JNJ",
    sourceIcon: "/dashboard/news-jnj.svg",
    time: "2hr ago",
    featured: false,
    text: "Johnson & Johnson to release Q4 earnings report.",
  },
  {
    source: "ADBE",
    sourceIcon: "/dashboard/news-adbe.svg",
    time: "3hr ago",
    featured: false,
    text: "Adobe Stock unveils new features to improve city navigation, boosting driving assistance capabilities for urban streets, according to company announcements and insider reports.",
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
            <>
              <span className="text-[#939393]">{item.time}</span>
              <img src="/dashboard/icon-maximize.svg" alt="" className="size-3" />
            </>
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
          item.text
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
      <>
        {/* Invisible placeholder to preserve layout */}
        <div className="invisible flex w-full shrink-0 flex-col gap-4 rounded border-[0.5px] p-4">
          <NewsItemContent item={item} />
        </div>

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Expanded card — same layoutId so it animates from the card position */}
        <motion.div
          layoutId={`news-card-${index}`}
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-x-4 top-[50%] z-30 -translate-y-1/2 flex flex-col gap-4 rounded-lg border border-[#393939] bg-[#131212] p-6"
          style={{ borderRadius: 8 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-black">
                <img src={item.sourceIcon} alt="" className="size-[14px] object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#f6f5f5]">{item.source}</span>
                <span className="text-[11px] text-[#515151]">{item.featured ? item.time : `Today · ${item.time}`}</span>
              </div>
            </div>
            <button onClick={onClose} className="cursor-pointer rounded-full p-1 transition-colors hover:bg-white/10">
              <X size={16} className="text-[#939393]" />
            </button>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.2 }}
            className="text-[14px] leading-[1.8] tracking-[-0.14px] text-[#cbcbcb]"
          >
            {item.text}
          </motion.p>
        </motion.div>
      </>
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
            className="absolute bottom-0 right-0 text-[11px] leading-[1.9] tracking-[-0.11px] text-[#966dd5]"
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

      <div className="relative flex flex-1 flex-col gap-2 overflow-hidden">
        <div className="flex flex-col gap-2">
          {newsItems.map((item, i) => (
            <NewsItem
              key={i}
              item={item}
              index={i}
              isOpen={openNews === i}
              onOpen={() => setOpenNews(i)}
              onClose={() => setOpenNews(null)}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 h-[120px] w-full bg-gradient-to-t from-[#171616] to-transparent" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Placeholder screens
// ---------------------------------------------------------------------------

function DashboardScreen2() {
  return (
    <div className="flex h-full items-center justify-center p-1">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded border-[0.5px] border-[#393939] bg-[#131212] h-full">
        <CalendarDays size={48} className="text-[#393939]" />
        <span className="text-[14px] tracking-[-0.14px] text-[#515151]">Calendar — Coming soon</span>
      </div>
    </div>
  );
}

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
