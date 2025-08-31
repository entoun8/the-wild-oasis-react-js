import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

const Settings = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Update hotel settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your hotel's operational settings and preferences
        </p>
      </header>
      <UpdateSettingsForm />
    </div>
  );
};

export default Settings;
