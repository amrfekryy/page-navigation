import { IconProps } from "@/lib/types";

export const EditIcon: React.FC<IconProps> = ({
  size = 16,
  color = "#9DA4B2",
  className = "",
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.01334 14.1667H14.6667M2.33334 11.6213V14.1667H4.87873C5.05473 14.1667 5.22351 14.0968 5.34796 13.9723L14.4723 4.84795C14.7315 4.5888 14.7315 4.16864 14.4723 3.90949L12.5905 2.02769C12.3314 1.76855 11.9112 1.76855 11.6521 2.02769L2.5277 11.1521C2.40326 11.2765 2.33334 11.4453 2.33334 11.6213Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
