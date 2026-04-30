import type { CSSProperties, ReactNode } from 'react'

export type IconName =
  | 'lang-py'
  | 'lang-ts'
  | 'lang-go'
  | 'lang-rust'
  | 'lang-java'
  | 'lang-k8s'
  | 'lang-cli'
  | 'pr'
  | 'refactor'
  | 'security'
  | 'package'
  | 'beaker'
  | 'graph'
  | 'check'
  | 'circle'
  | 'circle-o'
  | 'x'
  | 'warn'
  | 'play'
  | 'stop'
  | 'spinner'
  | 'search'
  | 'branch'
  | 'chevron-d'
  | 'chevron-r'
  | 'arrow-r'
  | 'close'
  | 'sun'
  | 'moon'
  | 'folder'
  | 'copy'
  | 'lightbulb'
  | 'sparkle'
  | 'org'
  | 'agent'
  | 'pulse'
  | 'refresh'
  | 'edit'
  | 'external'
  | 'cmd'

const paths: Record<IconName, (color: string) => ReactNode> = {
  'lang-py': () => (
    <g>
      <circle cx="8" cy="8" r="7" fill="#3776ab" />
      <text
        x="8"
        y="11"
        textAnchor="middle"
        fontSize="8"
        fontFamily="Fira Code,monospace"
        fontWeight="700"
        fill="#ffd43b"
      >
        py
      </text>
    </g>
  ),
  'lang-ts': () => (
    <g>
      <rect x="1" y="1" width="14" height="14" rx="2" fill="#3178c6" />
      <text
        x="8"
        y="11"
        textAnchor="middle"
        fontSize="8"
        fontFamily="Fira Code,monospace"
        fontWeight="700"
        fill="#fff"
      >
        TS
      </text>
    </g>
  ),
  'lang-go': () => (
    <g>
      <circle cx="8" cy="8" r="7" fill="#00add8" />
      <text
        x="8"
        y="11"
        textAnchor="middle"
        fontSize="7"
        fontFamily="Fira Code,monospace"
        fontWeight="700"
        fill="#fff"
      >
        GO
      </text>
    </g>
  ),
  'lang-rust': () => (
    <g>
      <circle cx="8" cy="8" r="7" fill="#dea584" />
      <text
        x="8"
        y="11"
        textAnchor="middle"
        fontSize="7"
        fontFamily="Fira Code,monospace"
        fontWeight="700"
        fill="#000"
      >
        RS
      </text>
    </g>
  ),
  'lang-java': () => (
    <g>
      <circle cx="8" cy="8" r="7" fill="#e76f00" />
      <text
        x="8"
        y="11"
        textAnchor="middle"
        fontSize="6"
        fontFamily="Fira Code,monospace"
        fontWeight="700"
        fill="#fff"
      >
        JV
      </text>
    </g>
  ),
  'lang-k8s': () => (
    <g>
      <circle cx="8" cy="8" r="7" fill="#326ce5" />
      <polygon points="8,3 12,5.5 12,10.5 8,13 4,10.5 4,5.5" fill="none" stroke="#fff" strokeWidth="0.8" />
    </g>
  ),
  'lang-cli': () => (
    <g>
      <rect x="1" y="2" width="14" height="12" rx="1.5" fill="#2d2d2d" stroke="#555" strokeWidth="0.5" />
      <path
        d="M3.5 6 L5.5 8 L3.5 10"
        fill="none"
        stroke="#4ec9b0"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="6.5" y1="10.3" x2="10" y2="10.3" stroke="#4ec9b0" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  ),
  pr: (c) => (
    <path
      d="M5 3v8.5M5 4.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM5 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM11 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM11 5v6.5M11 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
      fill="none"
      stroke={c}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  ),
  refactor: (c) => (
    <path
      d="M3 8a5 5 0 018-3.5M13 8a5 5 0 01-8 3.5M11 4l1 1.5h-2zM5 12l-1-1.5h2z"
      fill={c}
      stroke={c}
      strokeWidth="0.4"
    />
  ),
  security: (c) => (
    <path
      d="M8 1.5L3 3v4c0 3 2 5.5 5 6.5 3-1 5-3.5 5-6.5V3L8 1.5z"
      fill="none"
      stroke={c}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  ),
  package: (c) => (
    <path
      d="M2 5l6-3 6 3v6l-6 3-6-3V5zM2 5l6 3 6-3M8 8v6"
      fill="none"
      stroke={c}
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  ),
  beaker: (c) => (
    <path
      d="M6 2v3.5L3 11.5a1 1 0 00.9 1.5h8.2a1 1 0 00.9-1.5L10 5.5V2M5 2h6M6 8h4"
      fill="none"
      stroke={c}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  graph: (c) => (
    <g fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round">
      <circle cx="4" cy="4" r="1.5" />
      <circle cx="12" cy="4" r="1.5" />
      <circle cx="8" cy="12" r="1.5" />
      <line x1="5" y1="5" x2="7.2" y2="11" />
      <line x1="11" y1="5" x2="8.8" y2="11" />
      <line x1="5.5" y1="4" x2="10.5" y2="4" />
    </g>
  ),
  check: (c) => (
    <path
      d="M3 8.5l3 3 7-7"
      fill="none"
      stroke={c}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  circle: (c) => <circle cx="8" cy="8" r="3" fill={c} />,
  'circle-o': (c) => <circle cx="8" cy="8" r="3" fill="none" stroke={c} strokeWidth="1.3" />,
  x: (c) => <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" />,
  warn: (c) => (
    <path
      d="M8 1.5L1 14h14L8 1.5zM8 6v4M8 11.5v.5"
      fill="none"
      stroke={c}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  play: (c) => <path d="M4 3l9 5-9 5V3z" fill={c} />,
  stop: (c) => <rect x="4" y="4" width="8" height="8" rx="1" fill={c} />,
  spinner: (c) => (
    <g fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round">
      <path d="M8 2a6 6 0 016 6" opacity="1" />
      <path d="M14 8a6 6 0 01-6 6" opacity="0.4" />
      <path d="M2 8a6 6 0 016-6" opacity="0.7" />
    </g>
  ),
  search: (c) => (
    <g fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round">
      <circle cx="7" cy="7" r="4.5" />
      <line x1="10.5" y1="10.5" x2="13.5" y2="13.5" />
    </g>
  ),
  branch: (c) => (
    <g fill="none" stroke={c} strokeWidth="1.3">
      <circle cx="4" cy="3" r="1.4" />
      <circle cx="4" cy="13" r="1.4" />
      <circle cx="12" cy="6" r="1.4" />
      <line x1="4" y1="4.5" x2="4" y2="11.5" />
      <path d="M5.3 3 Q9 3 9 6 V7" strokeLinecap="round" />
    </g>
  ),
  'chevron-d': (c) => (
    <path
      d="M3 6l5 5 5-5"
      fill="none"
      stroke={c}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'chevron-r': (c) => (
    <path
      d="M6 3l5 5-5 5"
      fill="none"
      stroke={c}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'arrow-r': (c) => (
    <path
      d="M3 8h10M9 4l4 4-4 4"
      fill="none"
      stroke={c}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  close: (c) => (
    <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
  ),
  sun: (c) => (
    <g fill="none" stroke={c} strokeWidth="1.3" strokeLinecap="round">
      <circle cx="8" cy="8" r="3" />
      <line x1="8" y1="1" x2="8" y2="3" />
      <line x1="8" y1="13" x2="8" y2="15" />
      <line x1="1" y1="8" x2="3" y2="8" />
      <line x1="13" y1="8" x2="15" y2="8" />
      <line x1="3" y1="3" x2="4.5" y2="4.5" />
      <line x1="11.5" y1="11.5" x2="13" y2="13" />
      <line x1="13" y1="3" x2="11.5" y2="4.5" />
      <line x1="4.5" y1="11.5" x2="3" y2="13" />
    </g>
  ),
  moon: (c) => (
    <path
      d="M13 9.5A6 6 0 016.5 3a5.5 5.5 0 105 8.7 6 6 0 001.5-2.2z"
      fill="none"
      stroke={c}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  ),
  folder: (c) => (
    <path
      d="M2 4a1 1 0 011-1h3l1.5 1.5h6.5a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V4z"
      fill="none"
      stroke={c}
      strokeWidth="1.3"
    />
  ),
  copy: (c) => (
    <g fill="none" stroke={c} strokeWidth="1.3">
      <rect x="5" y="5" width="9" height="9" rx="1" />
      <path d="M3 11V3a1 1 0 011-1h7" />
    </g>
  ),
  lightbulb: (c) => (
    <path
      d="M8 2a4 4 0 00-2.5 7.2v1.3h5V9.2A4 4 0 008 2zM6 12.5h4M6.5 14h3"
      fill="none"
      stroke={c}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  sparkle: (c) => (
    <path
      d="M8 2v3M8 11v3M2 8h3M11 8h3M4 4l2 2M10 10l2 2M4 12l2-2M10 6l2-2"
      fill="none"
      stroke={c}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  ),
  org: (c) => (
    <g fill="none" stroke={c} strokeWidth="1.3">
      <rect x="3" y="3" width="10" height="11" rx="0.5" />
      <line x1="6" y1="6" x2="6" y2="6.5" />
      <line x1="10" y1="6" x2="10" y2="6.5" />
      <line x1="6" y1="9" x2="6" y2="9.5" />
      <line x1="10" y1="9" x2="10" y2="9.5" />
      <line x1="6.5" y1="14" x2="6.5" y2="11" />
      <line x1="9.5" y1="14" x2="9.5" y2="11" />
    </g>
  ),
  agent: (c) => (
    <g fill="none" stroke={c} strokeWidth="1.3" strokeLinejoin="round">
      <rect x="3" y="5" width="10" height="8" rx="1.5" />
      <circle cx="6" cy="9" r="0.8" fill={c} />
      <circle cx="10" cy="9" r="0.8" fill={c} />
      <line x1="8" y1="3" x2="8" y2="5" />
      <circle cx="8" cy="2.5" r="0.8" fill={c} />
    </g>
  ),
  pulse: (c) => (
    <path
      d="M1 8h3l2-5 3 10 2-5h4"
      fill="none"
      stroke={c}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  refresh: (c) => (
    <path
      d="M13 4a6 6 0 10.5 7M13 2v3h-3"
      fill="none"
      stroke={c}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  edit: (c) => (
    <path
      d="M2 14l3-1 8-8-2-2-8 8-1 3zM10 4l2 2"
      fill="none"
      stroke={c}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  external: (c) => (
    <path
      d="M9 3h4v4M13 3l-6 6M11 9v3a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1h3"
      fill="none"
      stroke={c}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  cmd: (c) => (
    <path
      d="M5 5a2 2 0 100 4h6a2 2 0 100-4H5zM5 7v2a2 2 0 11-2-2h10a2 2 0 11-2 2V7"
      fill="none"
      stroke={c}
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  ),
}

type IconProps = {
  name: IconName
  size?: number
  color?: string
  className?: string
  style?: CSSProperties
}

export function Icon({ name, size = 14, color = 'currentColor', className, style }: IconProps) {
  const renderer = paths[name]
  if (!renderer) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    >
      {renderer(color)}
    </svg>
  )
}
