import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-0 h-full w-[250px]">
        <Sidebar />
      </div>
      <div className="flex flex-col ml-[250px] flex-1">
        <Header />
        <main className="bg-gray-100 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
