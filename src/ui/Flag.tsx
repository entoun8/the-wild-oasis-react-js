import React from "react";

interface FlagProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function Flag(props: FlagProps): React.JSX.Element {
  return <img data-flag="true" {...props} />;
}