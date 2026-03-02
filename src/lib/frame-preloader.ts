const TOTAL_FRAMES = 386;
const CONCURRENCY = 4;

type FrameAsset = ImageBitmap | HTMLImageElement;

export const frameCache = new Map<string, FrameAsset>();

let started = false;
let activeLoads = 0;
let queue: string[] = [];

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

  const step = Math.max(1, Math.floor(TOTAL_FRAMES / 60));
  for (let i = 0; i < TOTAL_FRAMES; i += step) {
    queue.push(framePath(i + 1, prefix));
  }
  if (!queue.includes(framePath(TOTAL_FRAMES, prefix))) {
    queue.push(framePath(TOTAL_FRAMES, prefix));
  }

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const url = framePath(i + 1, prefix);
    if (!queue.includes(url)) queue.push(url);
  }

  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(() => pump());
  } else {
    setTimeout(pump, 2000);
  }
}
