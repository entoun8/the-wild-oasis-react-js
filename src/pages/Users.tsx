import React from "react";
import SignupForm from "../features/authentication/SignupForm";

const NewUsers: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50/30 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Create New User
          </h1>
          <p className="text-slate-600 text-lg">
            Add a new user account to the system
          </p>
        </header>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <SignupForm />
        </div>
      </div>
    </main>
  );
};

export default NewUsers;
