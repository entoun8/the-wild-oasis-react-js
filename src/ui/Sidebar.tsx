import Logo from "./Logo";
import MainNav from "./MainNav";

const Sidebar = () => {
  return (
    <aside className="h-full bg-slate-900/95 backdrop-blur-md border-r border-slate-800 px-6 py-8 flex flex-col gap-8 shadow-xl">
      <Logo />
      <MainNav />
    </aside>
  );
};

export default Sidebar;
