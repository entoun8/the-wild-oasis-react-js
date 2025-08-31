import React from "react";

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function ButtonGroup({ children, ...props }: ButtonGroupProps): React.JSX.Element {
  return (
    <div data-button-group="true" {...props}>
      {children}
    </div>
  );
}

export default ButtonGroup;