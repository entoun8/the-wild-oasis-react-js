import React from "react";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  type?: string;
}

function Tag({ children, type, ...props }: TagProps): React.JSX.Element {
  return (
    <span data-tag="true" data-type={type} {...props}>
      {children}
    </span>
  );
}

export default Tag;