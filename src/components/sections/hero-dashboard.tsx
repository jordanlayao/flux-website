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

function NewsItem({ item }: { item: typeof newsItems[number] }) {
  return (
    <div
      className={`flex w-full flex-col gap-4 overflow-hidden rounded border-[0.5px] border-[#393939] p-4 ${
        item.featured ? "" : "bg-[#131212]"
      }`}
      style={
        item.featured
          ? {
              backgroundImage:
                "radial-gradient(ellipse at 12% 15%, rgba(85,123,91,0.2) 0%, rgba(43,62,45,0.1) 33%, transparent 66%), linear-gradient(to bottom, #131212, #131212)",
            }
          : undefined
      }
    >
      <div className="flex w-full items-start justify-between">
        <div className="flex items-center gap-1 rounded-full border-[0.5px] border-[#575757] bg-black/20 py-0 pl-[2px] pr-[6px] backdrop-blur-sm">
          <img src={item.sourceIcon} alt="" className="size-[17px]" />
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
    </div>
  );
}

export function HeroDashboard() {
  return (
    <div className="flex h-[80vh] gap-1 overflow-hidden rounded-lg border-[0.5px] border-[#262626] bg-[#1a1a1a] p-1">
      {/* Left: Market + Sectors */}
      <div className="flex w-[57%] shrink-0 flex-col gap-4 overflow-hidden rounded bg-[#131212] border-[0.5px] border-[#393939] p-6">
        <div className="flex flex-col">
          <span className="text-[14px] leading-[1.8] tracking-[-0.14px] text-[#a0a0a0]">
            Tuesday, February 25
          </span>
          <div className="flex items-center gap-1 text-[17.5px] font-semibold leading-[1.6] tracking-[-0.175px]">
            <span className="text-[#f6f5f5]">The markets are </span>
            <span className="text-[#a0a0a0]">neutral</span>
          </div>
        </div>

        {/* Chart area */}
        <div className="relative h-[200px] w-full">
          <img src="/dashboard/grid-line.svg" alt="" className="absolute left-0 top-[15%] w-full" />
          <img src="/dashboard/grid-line-dashed.svg" alt="" className="absolute left-0 top-[70%] w-full" />
          <img
            src="/dashboard/chart-line-main.svg"
            alt=""
            className="absolute left-0 top-0 h-[82%] w-[96%]"
          />
          <img
            src="/dashboard/chart-line-secondary.svg"
            alt=""
            className="absolute left-0 top-[84%] h-[17%] w-[96%]"
          />
          <span className="absolute right-0 top-[12%] text-[11px] leading-[1.9] tracking-[-0.11px] text-[#cbcbcb]">
            18%
          </span>
          <span className="absolute bottom-0 right-0 text-[11px] leading-[1.9] tracking-[-0.11px] text-[#966dd5]">
            $18.98
          </span>
        </div>

        {/* Tabs */}
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

        {/* Sectors */}
        <div className="flex flex-col gap-4 overflow-y-auto rounded-lg border-[0.5px] border-[#232222] bg-[#1a1a1a] p-4">
          {sectors.map((sector) => (
            <SectorRow key={sector.name} sector={sector} />
          ))}
        </div>
      </div>

      {/* Right: News Feed */}
      <div className="relative flex flex-1 flex-col gap-2 overflow-hidden">
        {newsItems.map((item, i) => (
          <NewsItem key={i} item={item} />
        ))}
        <div className="pointer-events-none absolute bottom-0 left-0 h-[70px] w-full bg-gradient-to-t from-[#171616] to-transparent" />
      </div>
    </div>
  );
}
