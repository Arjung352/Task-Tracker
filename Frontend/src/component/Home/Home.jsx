import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
function Home() {
  return (
    <div className="h-[96vh] flex gap-4">
      <div className="bg-dark border-black p-4 rounded-xl w-1/5 text-center flex flex-col justify-between">
        <Sidebar />
      </div>
      <div className="bg-dark border-black p-4 rounded-xl w-4/5">
        <Outlet />
      </div>
    </div>
  );
}
export default Home;
