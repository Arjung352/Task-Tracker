import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store/auth";

import axios from "axios";
const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
  },
});
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }
  const classes = useStyles();

  const goto = () => {
    navigate("/login");
  };

  const [data, setData] = useState({ username: "", email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    if (data.username === "" || data.email === "" || data.password === "") {
      toast.error("All fields are required!");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:1000/api/signup",
          data
        );
        console.log(response);
        if (response.status === 200) {
          toast.success("Signup successful!");
          dispatch(authAction.login({ username: data.username }));
          navigate("/login");
        } else {
          toast.error("Signup failed!");
        }
      } catch (error) {
        setData({ username: "", email: "", password: "" });
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-full">
      <div className="gap-3 font-bold text-2xl text-olive flex flex-col p-6 rounded-md border border-white shadow-lg shadow-white">
        <h2>Sign-Up to Task Tracker</h2>
        <h3 className="text-sm">Sign-Up to save and manage your work.</h3>
        <form className="flex flex-col gap-3 text-white" autoComplete="off">
          <TextField
            variant="outlined"
            label="Username"
            name="username"
            value={data.username}
            onChange={change}
            className={`${classes.root}`}
          />
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            onChange={change}
            value={data.email}
            className={classes.root}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            value={data.password}
            name="password"
            onChange={change}
            className={classes.root}
          />
          <div>
            <Button variant="contained" className="w-full" onClick={submit}>
              Sign-Up
            </Button>
          </div>
        </form>
        <button className="text-sm text-blue-700 underline" onClick={goto}>
          Already have an Account? Log-In!
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
