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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email address</label>
        <input id="email" value={email} disabled className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-1">Full name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFullName(e.target.value)
          }
          id="fullName"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="avatar" className="text-sm font-medium text-gray-700 mb-1">Avatar image</label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAvatar(e.target.files?.[0] || null)
          }
          className="px-3 py-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button type="button" onClick={handleCancel} disabled={isUpdating} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Cancel</button>
        <button type="submit" disabled={isUpdating} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Update account</button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
