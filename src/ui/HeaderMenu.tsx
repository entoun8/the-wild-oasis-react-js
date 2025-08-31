import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/Logout";

const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <ul className="flex items-center gap-2">
      <li>
        <button 
          onClick={() => navigate("/account")}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 text-slate-600 hover:text-slate-800"
          title="Account Settings"
        >
          <HiOutlineUser className="w-5 h-5" />
        </button>
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
};

export default HeaderMenu;
