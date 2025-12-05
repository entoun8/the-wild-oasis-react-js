import React from "react";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import type { HeaderProps } from "../types";

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 -ml-2"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
          <span className="hidden sm:inline">The Wild Oasis</span>
          <span className="sm:hidden">Wild Oasis</span>
        </h1>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <UserAvatar />
        <div className="hidden sm:block w-px h-5 bg-slate-300"></div>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
