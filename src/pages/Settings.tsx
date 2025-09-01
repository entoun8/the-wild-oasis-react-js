import React from "react";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

const Settings: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-200/60">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Hotel Settings
          </h1>
          <p className="text-slate-600 text-lg">
            Manage your hotel's operational settings and preferences
          </p>
        </header>
        <UpdateSettingsForm />
      </div>
    </main>
  );
};

export default Settings;
