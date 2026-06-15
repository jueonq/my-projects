import { areaConfig } from '../data/tokyoPlaces';

interface Props { onClose: () => void }

const GRAY = '#DEDAD4';
const STROKE = '#F5F4F0';
const STROKE_W = 1.2;

function getColor(tag: string | null) {
  if (!tag) return GRAY;
  return areaConfig[tag as keyof typeof areaConfig]?.color ?? GRAY;
}

// 무게중심 계산
function centroid(d: string) {
  const pts = (d.match(/[\d.]+,[\d.]+/g) ?? []).map(p => p.split(',').map(Number));
  return {
    x: pts.reduce((s, p) => s + p[0], 0) / pts.length,
    y: pts.reduce((s, p) => s + p[1], 0) / pts.length,
  };
}

const WARDS: { id: string; tag: string | null; label: string; d: string; cx?: number; cy?: number }[] = [
  // ── 무사시노市 (기치조지) — 23구 외, 서쪽 ───────
  { id: 'musashino', tag: '기치조지·시모키타자와',
    label: '기치조지', cx: 9, cy: 154,
    d: 'M2,118 L20,118 L22,192 L2,172 Z' },

  // ── 네리마 ───────────────────────────────────────
  { id: 'nerima', tag: null, label: '네리마',
    d: 'M8,32 L108,18 L120,62 L120,100 L105,120 L80,118 L54,122 L8,88 Z' },

  // ── 이타바시 ──────────────────────────────────────
  { id: 'itabashi', tag: null, label: '이타바시',
    d: 'M100,18 L162,14 L170,56 L172,90 L152,100 L120,98 L108,62 Z' },

  // ── 기타 ──────────────────────────────────────────
  { id: 'kita', tag: null, label: '기타구',
    d: 'M154,14 L218,22 L220,80 L192,92 L185,92 L155,90 L152,56 Z' },

  // ── 아다치 ────────────────────────────────────────
  { id: 'adachi', tag: null, label: '아다치',
    d: 'M210,18 L298,16 L303,74 L268,88 L228,84 L218,74 L212,30 Z' },

  // ── 가쓰시카 ──────────────────────────────────────
  { id: 'katsushika', tag: null, label: '가쓰시카',
    d: 'M265,28 L311,38 L313,120 L290,124 L268,90 L264,50 Z' },

  // ── 아라카와 ──────────────────────────────────────
  { id: 'arakawa', tag: null, label: '아라카와', cx: 238, cy: 108,
    d: 'M215,78 L268,88 L270,128 L244,136 L218,128 L218,94 Z' },

  // ── 도시마 (이케부쿠로) ────────────────────────────
  { id: 'toshima', tag: '이케부쿠로', label: '이케부쿠로', cx: 153, cy: 113,
    d: 'M120,98 L152,95 L185,92 L188,122 L164,130 L120,124 Z' },

  // ── 분쿄 ──────────────────────────────────────────
  { id: 'bunkyo', tag: null, label: '분쿄', cx: 205, cy: 112,
    d: 'M185,92 L220,82 L225,122 L202,132 L188,122 Z' },

  // ── 다이토 (아사쿠사·우에노) ──────────────────────
  { id: 'taito', tag: '아사쿠사·우에노', label: '아사쿠사\n우에노', cx: 244, cy: 110,
    d: 'M220,82 L268,90 L272,136 L248,142 L240,136 L225,122 Z' },

  // ── 스미다 ────────────────────────────────────────
  { id: 'sumida', tag: null, label: '스미다', cx: 289, cy: 142,
    d: 'M265,90 L291,95 L313,120 L316,178 L278,182 L268,148 L268,108 Z' },

  // ── 에도가와 ──────────────────────────────────────
  { id: 'edogawa', tag: null, label: '에도가와',
    d: 'M291,95 L313,108 L316,220 L298,224 L278,182 Z' },

  // ── 나카노 ────────────────────────────────────────
  { id: 'nakano', tag: null, label: '나카노', cx: 101, cy: 140,
    d: 'M80,118 L120,118 L124,150 L105,162 L78,154 Z' },

  // ── 스기나미 ──────────────────────────────────────
  { id: 'suginami', tag: null, label: '스기나미',
    d: 'M18,118 L80,118 L78,154 L65,192 L20,192 L4,164 Z' },

  // ── 신주쿠 ────────────────────────────────────────
  { id: 'shinjuku', tag: '신주쿠', label: '신주쿠',
    d: 'M120,118 L185,115 L192,160 L168,170 L120,163 Z' },

  // ── 지요다 ────────────────────────────────────────
  { id: 'chiyoda', tag: null, label: '지요다', cx: 209, cy: 148,
    d: 'M188,122 L225,122 L230,162 L205,172 L192,162 Z' },

  // ── 주오 (긴자·츠키지) ─────────────────────────────
  { id: 'chuo', tag: '긴자·츠키지·하치초보리', label: '긴자\n츠키지', cx: 248, cy: 182,
    d: 'M225,122 L268,132 L282,244 L256,252 L228,242 L226,200 L228,162 Z' },

  // ── 고토 ──────────────────────────────────────────
  { id: 'koto', tag: null, label: '고토',
    d: 'M266,132 L316,152 L320,278 L292,282 L268,262 L264,222 L274,182 Z' },

  // ── 시부야 (하라주쿠 포함) ────────────────────────
  { id: 'shibuya', tag: '시부야', label: '시부야\n하라주쿠',
    d: 'M120,162 L168,168 L175,210 L150,222 L112,216 L112,182 Z' },

  // ── 미나토 (롯폰기·신바시 포함) ───────────────────
  { id: 'minato', tag: '미나토·롯폰기·미드타운', label: '미나토\n롯폰기',
    d: 'M192,162 L230,164 L248,228 L224,248 L190,236 L182,208 Z' },

  // ── 세타가야 ──────────────────────────────────────
  { id: 'setagaya', tag: null, label: '세타가야',
    d: 'M4,190 L118,180 L124,218 L122,274 L78,286 L18,272 L2,230 Z' },

  // ── 메구로 ────────────────────────────────────────
  { id: 'meguro', tag: null, label: '메구로', cx: 133, cy: 248,
    d: 'M115,218 L162,215 L168,268 L138,280 L100,272 L100,242 Z' },

  // ── 시나가와 ──────────────────────────────────────
  { id: 'shinagawa', tag: null, label: '시나가와',
    d: 'M162,218 L226,250 L256,254 L272,296 L212,314 L164,300 L150,270 Z' },

  // ── 오타 ──────────────────────────────────────────
  { id: 'ota', tag: null, label: '오타',
    d: 'M76,284 L172,284 L218,316 L214,382 L162,388 L90,382 L60,338 L60,300 Z' },
];

export function MapModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      <div
        className="relative bg-white w-full max-w-lg border-t border-stone-100"
        style={{ borderRadius: '4px 4px 0 0' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-8 h-0.5 bg-stone-200 rounded-full mx-auto mt-4 mb-1" />

        <div className="flex items-center justify-between px-5 py-3">
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase">Area Map</p>
            <p className="text-sm font-bold text-stone-800">도쿄 지역 위치</p>
          </div>
          <button onClick={onClose} className="text-stone-300 text-xl leading-none">×</button>
        </div>

        <div className="px-4 pb-8" style={{ maxHeight: '76svh', overflowY: 'auto' }}>
          <svg viewBox="-4 8 328 392" width="100%" className="block">
            {/* 도쿄만 */}
            <path
              d="M268,132 L320,150 L320,395 L255,395 L255,255 L280,244 Z"
              fill="#C8DFF0" opacity="0.45"
            />
            <text x="302" y="230" fontSize="7.5" fill="#88AECB" textAnchor="middle" transform="rotate(-90,302,230)">도쿄만</text>

            {/* 구 폴리곤 */}
            {WARDS.map((w) => {
              const color = getColor(w.tag);
              const c = w.cx !== undefined ? { x: w.cx, y: w.cy! } : centroid(w.d);
              const lines = w.label.split('\n');
              const isTagged = !!w.tag;
              const fs = lines.length > 1 ? 6 : 7;
              return (
                <g key={w.id}>
                  <path
                    d={w.d}
                    fill={color}
                    stroke={STROKE}
                    strokeWidth={STROKE_W}
                    strokeLinejoin="round"
                  />
                  {lines.map((line, i) => (
                    <text
                      key={i}
                      x={c.x}
                      y={c.y + (lines.length === 1 ? 2.5 : i === 0 ? -2.5 : 5.5)}
                      fontSize={fs}
                      fontWeight={isTagged ? '700' : '400'}
                      fill={isTagged ? '#fff' : '#aaa9a5'}
                      textAnchor="middle"
                      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', pointerEvents: 'none' }}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}

            {/* 나침반 */}
            <text x="14" y="20" fontSize="8" fill="#B5AFA8" textAnchor="middle" fontWeight="600">N</text>
            <line x1="14" y1="23" x2="14" y2="32" stroke="#B5AFA8" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
