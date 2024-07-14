import Home from "./component/Home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import AllTasks from "./component/pages/AllTasks";
import CompleteTask from "./component/pages/CompleteTask";
import ImportantTask from "./component/pages/ImportantTask";
import IncompleteTask from "./component/pages/IncompleteTask";
import Login from "./component/pages/Login";
import Signup from "./component/pages/Signup";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "./component/store/auth";
const App = () => {
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
  return (
    <div className="h-screen w-screen p-4 relative">
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
    </div>
  );
};
export default App;
