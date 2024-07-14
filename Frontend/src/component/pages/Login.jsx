import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { authAction } from "../store/auth";

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

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const home = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    navigate("/");
  }

  const [data, setData] = useState({ username: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    if (data.username === "" || data.password === "") {
      toast.error("All fields are required!");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:1000/api/login",
          data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authAction.login({ username: data.username }));

        home("/");
        if (response.status === 200) {
          toast.success("login successful!");
        } else {
          toast.error("login failed!");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const goto = () => {
    navigate("/signup");
  };

  return (
    <div className="w-full flex justify-center items-center h-full">
      <div className="gap-3 font-bold text-2xl text-olive flex flex-col  p-6 rounded-md border border-white shadow-lg shadow-white">
        <h2>Log-in to Task Tracker</h2>
        <h3 className="text-sm">Log in to get to work and manage your work.</h3>
        <form className="flex flex-col gap-3 text-white" autoComplete="off">
          <TextField
            className={classes.root}
            variant="outlined"
            label="UserName"
            name="username"
            onChange={change}
            value={data.username}
          />
          <TextField
            className={classes.root}
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            onChange={change}
            value={data.password}
          />
          <div>
            <Button variant="contained" className="w-full" onClick={submit}>
              Log In
            </Button>
          </div>
        </form>
        <button className="text-sm text-blue-700 underline" onClick={goto}>
          Need an Account? Sign Up!
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
