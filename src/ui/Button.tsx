import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variation?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

function Button({ 
  children, 
  variation = "primary", 
  size = "medium", 
  disabled = false, 
  onClick, 
  type = "button",
  ...props 
}: ButtonProps): React.JSX.Element {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      data-variation={variation}
      data-size={size}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;