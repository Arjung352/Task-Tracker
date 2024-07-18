import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

function Home() {
  return (
    <div className="h-[96vh] flex gap-4 font-Rubik">
      <div
        className={`bg-dark border-black p-4 rounded-xl text-center flex flex-col max-sm:p-2 justify-between w-1/5 max-sm:w-1/3 `}
      >
        <Sidebar />
      </div>
      <div
        className={`bg-dark border-black p-4 rounded-xl w-4/5 overflow-auto `}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
