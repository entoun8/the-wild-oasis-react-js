import React from "react";

interface ButtonTextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function ButtonText({ children, ...props }: ButtonTextProps): React.JSX.Element {
  return (
    <button data-button-text="true" {...props}>
      {children}
    </button>
  );
}

export default ButtonText;