import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";

const Logout = () => {
  const { logout, isLoading } = useLogout();

  return (
    <button 
      onClick={logout}
      disabled={isLoading}
      className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 disabled:opacity-50 text-slate-600"
      title="Logout"
    >
      <HiArrowRightOnRectangle className="w-5 h-5" />
    </button>
  );
};

export default Logout;
