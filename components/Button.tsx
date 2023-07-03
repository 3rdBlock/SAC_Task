import React from "react";
import Loading from "./Loading";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean | null;
  loading?: boolean;
  children: React.ReactNode;
};

const Button = ({
  onClick,
  disabled = false,
  loading = false,
  children,
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`text-white px-2 w-fit border inline-block whitespace-nowrap border-white/10 flex items-center h-8 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium cursor-pointer transition-all duration-3000 
                       
                  ${
                    disabled || loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
      disabled={disabled || loading}
    >
      <p>{loading ? <Loading /> : children}</p>
    </button>
  );
};

export default Button;
