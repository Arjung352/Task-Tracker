import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Sidebar() {
  let time = new Date().getHours();
  const username = useSelector((state) => state.auth.username);

  const data = [
    {
      id: 1,
      title: "All Tasks",
      icon: <FormatListBulletedIcon />,
      link: "/",
    },
    {
      id: 2,
      title: "Important Tasks",
      icon: <PriorityHighIcon />,
      link: "ImportantTask",
    },
    {
      id: 3,
      title: "Completed Tasks",
      icon: <DoneAllIcon />,
      link: "CompleteTask",
    },
    {
      id: 4,
      title: "Incomplete Tasks",
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
        <h1 className="mb-2 text-2xl font-semibold">Task Tracker</h1>
        <h2 className="mb-2 text-gray-400">
          {time < 12 ? "Good Morning" : "Good Evening"} {username}!
        </h2>
        <hr />
      </div>
      <div>
        {data.map((data) => (
          <NavLink
            key={data.id}
            to={data.link}
            className="mt-3 flex gap-2 text-lg font-semibold justify-center cursor-pointer hover:bg-gray-600 p-2 rounded transition-all ease-in-out"
          >
            {data.icon}
            {data.title}
          </NavLink>
        ))}
      </div>
      <div>
        <button
          className="bg-gray-600 w-full p-2 rounded mb-3 font-semibold hover:bg-black transition-all duration-300 ease-in-out "
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </>
  );
}
export default Sidebar;
