interface Props {
  label: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  secondary?: boolean;
}

export const Button: React.FC<Props> = ({
  label,
  type = 'button',
  onClick,
  secondary,
}) => {
  const buttonStyle = secondary
    ? 'border border-[#2E344D] text-[#2E344D]'
    : 'bg-[#2E344D] text-white';
  return (
    <button
      type={type}
      className={`rounded-[12px] ${buttonStyle} py-2 px-4 w-fit y-fit cursor-pointer`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
