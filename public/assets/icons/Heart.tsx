interface HeartProps {
  isActive?: boolean;
  className?: string;
}

export const Heart = ({ isActive = false, className }: HeartProps) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.62 24.8101C16.28 24.9301 15.72 24.9301 15.38 24.8101C12.48 23.8201 6 19.6901 6 12.6901C6 9.6001 8.49 7.1001 11.56 7.1001C13.38 7.1001 14.99 7.9801 16 9.3401C17.01 7.9801 18.63 7.1001 20.44 7.1001C23.51 7.1001 26 9.6001 26 12.6901C26 19.6901 19.52 23.8201 16.62 24.8101Z"
        fill={isActive ? "var(--ico-color-red)" : "none"}
        stroke={isActive ? "var(--ico-color-red)" : "currentColor"}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
