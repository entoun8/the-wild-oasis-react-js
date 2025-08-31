import React from "react";

interface ButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function ButtonIcon({ children, ...props }: ButtonIconProps): React.JSX.Element {
  return (
    <button data-button-icon="true" {...props}>
      {children}
    </button>
  );
}

export default ButtonIcon;