import React from "react";

function Logo(): React.JSX.Element {
  return (
    <div className="text-center mb-2">
      <img src="/logo-light.png" alt="Logo" className="h-16 w-auto mx-auto drop-shadow-sm" />
    </div>
  );
}

export default Logo;