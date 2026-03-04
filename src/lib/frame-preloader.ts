const TOTAL_FRAMES = 386;
const CONCURRENCY = 8;

type FrameAsset = ImageBitmap | HTMLImageElement;

export const frameCache = new Map<string, FrameAsset>();

let started = false;
let activeLoads = 0;
let queue: string[] = [];

function bspOrder(total: number): number[] {
  const order: number[] = [];
  const visited = new Set<number>();

  function subdivide(start: number, end: number) {
    if (start > end || visited.has(start) && visited.has(end)) return;
    const mid = Math.floor((start + end) / 2);
    if (!visited.has(mid)) {
      visited.add(mid);
      order.push(mid);
    }
    subdivide(start, mid - 1);
    subdivide(mid + 1, end);
  }

  visited.add(0);
  order.push(0);
  visited.add(total - 1);
  order.push(total - 1);

  const mid = Math.floor((total - 1) / 2);
  visited.add(mid);
  order.push(mid);

  subdivide(0, mid - 1);
  subdivide(mid + 1, total - 1);

  return order;
}

async function loadOne(url: string): Promise<void> {
  if (frameCache.has(url)) return;
  try {
    const resp = await fetch(url);
    const blob = await resp.blob();
    const bitmap = await createImageBitmap(blob);
    frameCache.set(url, bitmap);
  } catch {
    // Silently skip failed frames
  }
}

function pump() {
  while (activeLoads < CONCURRENCY && queue.length > 0) {
    const url = queue.shift()!;
    if (frameCache.has(url)) {
      pump();
      return;
    }
    activeLoads++;
    loadOne(url).finally(() => {
      activeLoads--;
      pump();
    });
  }
}

function framePath(n: number, prefix: string) {
  return `/frames/${prefix}-lo/frame_${String(n).padStart(4, "0")}.jpg`;
}

export function startFramePreload() {
  if (started || typeof window === "undefined") return;
  started = true;

  const isMobile = window.innerWidth <= 768;
  const prefix = isMobile ? "mobile" : "desktop";

  const loadOrder = bspOrder(TOTAL_FRAMES);
  queue = loadOrder.map((i) => framePath(i + 1, prefix));

  // Start promptly — don't defer indefinitely with requestIdleCallback
  setTimeout(pump, 100);
}
