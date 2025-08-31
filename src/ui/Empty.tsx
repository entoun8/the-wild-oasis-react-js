import React from "react";

interface EmptyProps {
  resource: string;
}

function Empty({ resource }: EmptyProps): React.JSX.Element {
  return <p>No {resource} could be found.</p>;
}

export default Empty;