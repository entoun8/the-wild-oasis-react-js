import React from "react";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

const Account: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50/30 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Account Settings
          </h1>
          <p className="text-slate-600 text-lg">
            Update your account information and preferences
          </p>
        </header>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200/50">
              <h2 className="text-xl font-semibold text-slate-700">
                Update User Data
              </h2>
              <p className="text-slate-600 mt-1">
                Change your personal information
              </p>
            </div>
            <div className="p-8">
              <UpdateUserDataForm />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200/50">
              <h2 className="text-xl font-semibold text-slate-700">
                Update Password
              </h2>
              <p className="text-slate-600 mt-1">
                Change your account password
              </p>
            </div>
            <div className="p-8">
              <UpdatePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
