import React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  type?: string;
}

function Form({ children, type, ...props }: FormProps): React.JSX.Element {
  return (
    <form data-type={type} {...props}>
      {children}
    </form>
  );
}

export default Form;