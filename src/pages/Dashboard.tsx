import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <main className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </main>
  );
}

export default Dashboard;
