import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

const MainNav: React.FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-1">
        <li>
          <NavLink 
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group ${
                isActive ? 'text-white bg-blue-600' : ''
              }`
            }
          >
            <HiOutlineHome className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/bookings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group ${
                isActive ? 'text-white bg-blue-600' : ''
              }`
            }
          >
            <HiOutlineCalendarDays className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Bookings</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/cabins"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group ${
                isActive ? 'text-white bg-blue-600' : ''
              }`
            }
          >
            <HiOutlineHomeModern className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Cabins</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group ${
                isActive ? 'text-white bg-blue-600' : ''
              }`
            }
          >
            <HiOutlineUsers className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Users</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group ${
                isActive ? 'text-white bg-blue-600' : ''
              }`
            }
          >
            <HiOutlineCog6Tooth className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium">Settings</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
