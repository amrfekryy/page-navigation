import { IconProps } from "@/lib/types";

export const CheckIcon: React.FC<IconProps> = ({
  size = 20,
  color = "#8C93A1",
  className = "",
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 7.91667L8.75001 12.5L7.08334 10.8333M17.7083 10C17.7083 14.2572 14.2572 17.7083 10 17.7083C5.74281 17.7083 2.29167 14.2572 2.29167 10C2.29167 5.74281 5.74281 2.29167 10 2.29167C14.2572 2.29167 17.7083 5.74281 17.7083 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
