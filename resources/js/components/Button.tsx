import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string,
  borderColor?: string,
  padding?: string,
  rounded?: string,
  className?: string,
  onClick?: () => void
}

export default function Button({
  children,
  bgColor = "bg-blue-500",
  textColor = "text-black",
  borderColor = "border-gray-800",
  padding = "px-4 py-2",
  rounded = "rounded-lg",
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} border ${borderColor} ${padding} ${rounded} font-semibold transition duration-300 hover:opacity-80 ${className}`}
    >
      {children}
    </button>
  )
}