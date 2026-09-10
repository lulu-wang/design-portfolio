export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      fill="none"
    >
      <defs>
        <linearGradient id="sparkle-g" x1="12" y1="4" x2="52" y2="60">
          <stop stopColor="#3a3a3a" />
          <stop offset="0.45" stopColor="#111" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
      </defs>
      <path
        d="M32 2.5 38.6 25.4 61.5 32 38.6 38.6 32 61.5 25.4 38.6 2.5 32 25.4 25.4Z"
        fill="url(#sparkle-g)"
        stroke="#0a0a0a"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M32 10 35.4 24.6 50 28 35.4 31.4 32 46"
        stroke="white"
        strokeOpacity="0.22"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Bolt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 72"
      className={className}
      aria-hidden
      fill="none"
    >
      <defs>
        <linearGradient id="bolt-g" x1="8" y1="4" x2="40" y2="68">
          <stop stopColor="#3a3a3a" />
          <stop offset="0.5" stopColor="#111" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
      </defs>
      <path
        d="M28.5 3.5 6.5 40.2h16.2L17.8 68.5 41.8 31.2H25.2L28.5 3.5Z"
        fill="url(#bolt-g)"
        stroke="#0a0a0a"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M26 10 12 37h12"
        stroke="white"
        strokeOpacity="0.22"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowOut({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-[6px] bg-foreground text-background ${className}`}
      aria-hidden
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path
          d="M2 9 9 2M4 2h5v5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
