interface CheckMarkProps {
  className?: string;
}

export const CheckMark = ({ className }: CheckMarkProps) => {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.625 6.28409L5.32087 8.9354C5.71 9.3181 6.33412 9.3181 6.72325 8.9354L12.25 3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
