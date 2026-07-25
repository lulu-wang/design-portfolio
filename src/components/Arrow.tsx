export default function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`arrow inline-block ${className}`}
      width="26"
      height="14"
      viewBox="0 0 26 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 7h24M19 1l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
