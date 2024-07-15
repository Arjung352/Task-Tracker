import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InputData({ add, adding, refetch }) {
  const [data, setData] = useState({ title: "", desc: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `bearer ${localStorage.getItem("token")}`,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (data.title === "" || data.desc === "") {
      toast.warn("All fields are required!");
    } else {
      await axios.post("http://localhost:1000/api/create-task", data, {
        headers,
      });
      toast.success("Task added successfully");
      setData({ title: "", desc: "" });
      adding("hidden");
      refetch();
    }
  };
  return (
    <div
      className={`${add} left-0 top-0 h-full w-full flex justify-center items-center`}
    >
      <div className="fixed bg-lightBlack left-0 top-0 h-full w-full opacity-90"></div>
      <form
        onSubmit={submitHandler}
        className="bg-dark h-4/6 w-4/12 flex flex-col items-start rounded-2xl p-4 z-10 shadow-sm shadow-slate-200"
      >
        <div className="mb-3 flex justify-end w-full" title="Close">
          <button onClick={() => adding("hidden")}>
            <CloseIcon />
          </button>
        </div>
        <input
          placeholder="Title"
          name="title"
          type="text"
          value={data.title}
          onChange={change}
          className="bg-gray-700 w-full p-4 rounded text-2xl font-semibold placeholder-NewColor shadow-sm shadow-white"
        />
        <textarea
          name="desc"
          cols="30"
          rows="10"
          placeholder="Description"
          value={data.desc}
          onChange={change}
          className="w-full bg-gray-700 h-full rounded py-2 px-3 mt-4 shadow-sm text-xl shadow-white"
        />
        <button className="p-2 px-6 bg-blue-900 mt-3 shadow-sm shadow-white hover:bg-gray-900 transition-all ease-in-out rounded-md text-xl font-semibold">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default InputData;
