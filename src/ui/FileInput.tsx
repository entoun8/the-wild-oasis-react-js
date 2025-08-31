import React from "react";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function FileInput(props: FileInputProps): React.JSX.Element {
  return <input type="file" data-file-input="true" {...props} />;
}

export default FileInput;