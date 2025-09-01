import React from "react";
import Logo from "./Logo";
import MainNav from "./MainNav";

const Sidebar: React.FC = () => {
  return (
    <aside className="h-full bg-white/95 backdrop-blur-md border-r border-slate-200 px-6 py-8 flex flex-col gap-8 shadow-lg">
      <Logo />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
