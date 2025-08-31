import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

function Textarea(props: TextareaProps): React.JSX.Element {
  return <textarea {...props} />;
}

export default Textarea;