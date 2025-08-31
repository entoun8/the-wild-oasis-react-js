import React from "react";
import { useUser } from "./useUser";

function UserAvatar(): React.JSX.Element {
  const { user } = useUser();
  const { fullName, avatar } = user?.user_metadata || {};

  return (
    <div className="flex items-center gap-3" data-user-avatar="true">
      <div className="relative">
        <img 
          src={avatar || "/default-user.jpg"} 
          alt={`Avatar of ${fullName}`}
          className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-slate-200"
          data-avatar-img="true"
        />
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full shadow-sm"></div>
      </div>
      {fullName && (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-800">{fullName}</span>
          <span className="text-xs text-slate-500">Online</span>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;