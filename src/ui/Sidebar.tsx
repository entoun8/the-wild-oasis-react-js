import React from "react";
import Logo from "./Logo";
import MainNav from "./MainNav";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <aside className="h-full bg-white/98 backdrop-blur-md border-r border-slate-200 px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8 shadow-xl lg:shadow-lg">
      {/* Mobile Header with Close Button */}
      <div className="flex justify-between items-center lg:block">
        <Logo />
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 -mr-2"
          aria-label="Close sidebar"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <MainNav onItemClick={onClose} />
    </aside>
  );
};

export default Sidebar;
