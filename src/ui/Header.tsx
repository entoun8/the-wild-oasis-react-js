import React from "react";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const Header: React.FC = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
      <div className="flex items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
          The Wild Oasis
        </h1>
      </div>
      <div className="flex items-center gap-4 bg-slate-50/80 backdrop-blur-sm px-5 py-2.5 rounded-xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow duration-200">
        <UserAvatar />
        <div className="w-px h-5 bg-slate-300"></div>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
