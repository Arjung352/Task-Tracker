import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  let time = new Date().getHours();

  const data = [
    {
      id: 1,
      title: "All Task",
      icon: <FormatListBulletedIcon />,
      link: "/",
    },
    {
      id: 2,
      title: "Important Task",
      icon: <PriorityHighIcon />,
      link: "ImportantTask",
    },
    {
      id: 3,
      title: "Complete Task",
      icon: <DoneAllIcon />,
      link: "CompleteTask",
    },
    {
      id: 4,
      title: "Incomplete Task",
      icon: <ClearIcon />,
      link: "IncompleteTask",
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(authAction.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/signup");
  };

  return (
    <>
      <div>
        <h1 className="mb-2 text-2xl font-semibold max-sm:text-2xl">
          Task Tracker
        </h1>
        <h2 className="mb-2 text-gray-400 max-sm:text-xs">
          {time < 12 ? "Good Morning" : "Good Evening"}{" "}
          {localStorage.getItem("username")}!
        </h2>
        <hr />
      </div>
      <div className="max-sm:w-full">
        {data.map((data) => (
          <NavLink
            key={data.id}
            to={data.link}
            className="mt-3 flex gap-2 max-sm:gap-1 text-lg max-md:text-base max-sm:text-xs font-semibold justify-center items-center cursor-pointer hover:bg-gray-600 p-2 rounded transition-all ease-in-out"
          >
            {data.icon}
            {data.title}
          </NavLink>
        ))}
      </div>
      <div>
        <button
          className="bg-gray-600 max-sm:rounded-lg w-full p-2 rounded mb-3 font-semibold hover:bg-black transition-all duration-300 ease-in-out max-sm:text-base "
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </>
  );
}
export default Sidebar;
