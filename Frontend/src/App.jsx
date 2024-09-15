import Home from "./component/Home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllTasks from "./component/pages/AllTasks";
import CompleteTask from "./component/pages/CompleteTask";
import ImportantTask from "./component/pages/ImportantTask";
import IncompleteTask from "./component/pages/IncompleteTask";
import Login from "./component/pages/Login";
import Signup from "./component/pages/Signup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "./component/store/auth";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
const App = () => {
  const [load, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authAction.login());
    } else if (isLoggedIn === false) {
      navigate("/signup");
    }
  }, []);
  useEffect(() => {
    const fetchFalse = (async () => {
      await axios.get("https://task-tracker-ipz8.onrender.com/api/get");
      setLoading(false);
    })();
  });
  return load ? (
    <div className="w-full bg-black h-screen flex gap-4 flex-col justify-center items-center">
      <TailSpin
        height="80"
        width="80"
        color="#fff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p className="font-salsa">Starting the Server Please have paitance!</p>
    </div>
  ) : (
    <Routes>
      <Route path="/" element=<Home />>
        <Route index element=<AllTasks /> />
        <Route path="CompleteTask" element=<CompleteTask /> />
        <Route path="ImportantTask" element=<ImportantTask /> />
        <Route path="IncompleteTask" element=<IncompleteTask /> />
      </Route>
      <Route path="/signup" element=<Signup /> />
      <Route path="/login" element=<Login /> />
    </Routes>
  );
};
export default App;
