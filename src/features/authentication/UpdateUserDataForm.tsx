import React, { useState } from "react";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm(): React.JSX.Element {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  
  if (!user) return <div className="text-center py-4">Loading...</div>;
  
  const email = user.email;
  const currentFullName = user.user_metadata?.fullName || "";

  const [fullName, setFullName] = useState<string>(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!fullName) return;
    
    updateUser({ fullName, avatar });
  }
  
  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address
          </label>
          <input 
            id="email" 
            value={email} 
            disabled 
            className="block w-full border-slate-300 rounded-xl shadow-sm bg-slate-50 text-slate-500 px-4 py-3 cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFullName(e.target.value)
            }
            id="fullName"
            className="block w-full border-slate-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-3"
            placeholder="Enter your full name"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="avatar" className="block text-sm font-semibold text-slate-700 mb-2">
          Avatar Image
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAvatar(e.target.files?.[0] || null)
          }
          className="block w-full border-slate-300 rounded-xl shadow-sm px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
        />
      </div>
      
      <div className="flex justify-end gap-3 pt-6 border-t border-slate-200/50">
        <button 
          type="button" 
          onClick={handleCancel} 
          disabled={isUpdating} 
          className="px-6 py-3 border border-slate-300 rounded-xl text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-medium shadow-sm transition-all duration-200"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isUpdating} 
          className="px-8 py-3 border border-transparent rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 font-medium shadow-lg transition-all duration-200"
        >
          {isUpdating ? 'Updating...' : 'Update Account'}
        </button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
